import { useEffect, useRef } from "react";
import * as THREE from "three";

const FIELD_COLUMNS = 34;
const FIELD_ROWS = 18;
const REDUCED_FIELD_COLUMNS = 18;
const REDUCED_FIELD_ROWS = 10;
const FIELD_WIDTH = 8.8;
const FIELD_DEPTH = 5.2;
const RIPPLE_LIFETIME = 1.65;
const MAX_RIPPLES = 5;
const POINTER_PEAK_STRENGTH = 0.54;

type Dot = {
  x: number;
  z: number;
  offsetA: number;
  offsetB: number;
  liftBias: number;
};

type Ripple = {
  x: number;
  z: number;
  startedAt: number;
  strength: number;
};

type DotField = {
  dots: Dot[];
  positions: Float32Array;
  colors: Float32Array;
  stateX: Float32Array;
  stateY: Float32Array;
  stateZ: Float32Array;
  glow: Float32Array;
};

type PointerField = {
  targetX: number;
  targetZ: number;
  currentX: number;
  currentZ: number;
  targetStrength: number;
  currentStrength: number;
  active: boolean;
  lastMovedAt: number;
};

type RippleSample = {
  lift: number;
  glow: number;
};

const baseRgb = { r: 0x8a / 255, g: 0xa0 / 255, b: 0xb8 / 255 };
const blueRgb = { r: 0xdf / 255, g: 0xf7 / 255, b: 1 };
const acidRgb = { r: 0xcc / 255, g: 1, b: 0 };
const whiteRgb = { r: 1, g: 1, b: 1 };
const mutedAcidRgb = { r: 0x9f / 255, g: 0xbf / 255, b: 0x42 / 255 };

function damp(current: number, target: number, lambda: number, delta: number) {
  return current + (target - current) * (1 - Math.exp(-lambda * delta));
}

function clamp01(value: number) {
  return Math.max(0, Math.min(1, value));
}

function easeOutCubic(value: number) {
  const inverted = 1 - clamp01(value);
  return 1 - inverted * inverted * inverted;
}

function createDotField(columns: number, rows: number): DotField {
  const dotCount = columns * rows;
  const dots: Dot[] = [];
  const positions = new Float32Array(dotCount * 3);
  const colors = new Float32Array(dotCount * 3);
  const stateX = new Float32Array(dotCount);
  const stateY = new Float32Array(dotCount);
  const stateZ = new Float32Array(dotCount);
  const glow = new Float32Array(dotCount);
  let dotIndex = 0;

  for (let row = 0; row < rows; row += 1) {
    for (let column = 0; column < columns; column += 1) {
      const x = (column / Math.max(columns - 1, 1) - 0.5) * FIELD_WIDTH;
      const z = (row / Math.max(rows - 1, 1) - 0.5) * FIELD_DEPTH;
      const offsetA = Math.sin(column * 0.74) + Math.cos(row * 0.62);
      const offsetB = Math.sin(column * 0.31 + row * 0.57);
      const liftBias = ((column + row) % 7) / 7;
      const jitterX = Math.sin(row * 2.1 + column * 0.35) * 0.025;
      const jitterZ = Math.cos(column * 1.7 + row * 0.28) * 0.025;
      const dotX = x + jitterX;
      const dotZ = z + jitterZ;
      const arrayOffset = dotIndex * 3;

      dots.push({ x: dotX, z: dotZ, offsetA, offsetB, liftBias });
      positions[arrayOffset] = dotX;
      positions[arrayOffset + 1] = 0;
      positions[arrayOffset + 2] = dotZ;
      colors[arrayOffset] = baseRgb.r;
      colors[arrayOffset + 1] = baseRgb.g;
      colors[arrayOffset + 2] = baseRgb.b;
      stateX[dotIndex] = dotX;
      stateZ[dotIndex] = dotZ;
      dotIndex += 1;
    }
  }

  return { dots, positions, colors, stateX, stateY, stateZ, glow };
}

function sampleIdleMotion(dot: Dot, time: number) {
  return (
    Math.sin(dot.x * 0.72 + time * 0.38 + dot.offsetA) * 0.026 +
    Math.cos(dot.z * 0.86 - time * 0.31 + dot.offsetB) * 0.02 +
    Math.sin((dot.x + dot.z) * 0.33 + time * 0.21 + dot.offsetA * 0.7) * 0.012 +
    dot.liftBias * 0.008
  );
}

function updatePointerField(pointer: PointerField, time: number, delta: number) {
  pointer.currentX = damp(pointer.currentX, pointer.targetX, 5.8, delta);
  pointer.currentZ = damp(pointer.currentZ, pointer.targetZ, 5.8, delta);
  pointer.currentStrength = damp(pointer.currentStrength, pointer.targetStrength, 4.2, delta);
  pointer.targetStrength *= Math.exp(-delta * 3.15);

  if (time - pointer.lastMovedAt > 1.35) {
    pointer.active = false;
    pointer.targetStrength = 0;
  }
}

function samplePointerPressure(dot: Dot, pointer: PointerField) {
  if (!pointer.active && pointer.currentStrength < 0.01) {
    return { falloff: 0, distance: 99 };
  }

  const distance = Math.hypot(dot.x - pointer.currentX, dot.z - pointer.currentZ);
  const falloff = Math.exp(-distance * distance * 0.12) * pointer.currentStrength;
  return { falloff, distance };
}

function sampleRippleSystem(dot: Dot, ripples: Ripple[], time: number, sample: RippleSample) {
  sample.lift = 0;
  sample.glow = 0;

  for (let index = 0; index < ripples.length; index += 1) {
    const ripple = ripples[index];
    const age = time - ripple.startedAt;
    if (age < 0 || age > RIPPLE_LIFETIME) {
      continue;
    }

    const distance = Math.hypot(dot.x - ripple.x, dot.z - ripple.z);
    const progress = age / RIPPLE_LIFETIME;
    const front = age * 1.95;
    const leadingEdge = Math.exp(-Math.pow(distance - front, 2) * 1.2);
    const pressureBloom = Math.exp(-distance * distance * 0.18);
    const arrival = easeOutCubic(age * 2.8);
    const decay = Math.pow(1 - progress, 1.9) * ripple.strength;

    sample.lift += (leadingEdge * 0.12 + pressureBloom * 0.03) * decay * arrival;
    sample.glow += (leadingEdge * 0.34 + pressureBloom * 0.09) * decay * arrival;
  }

  return sample;
}

function removeExpiredRipples(ripples: Ripple[], time: number) {
  for (let index = ripples.length - 1; index >= 0; index -= 1) {
    if (time - ripples[index].startedAt > RIPPLE_LIFETIME) {
      ripples.splice(index, 1);
    }
  }
}

function writeColor(colors: Float32Array, index: number, depthFade: number, brightness: number) {
  const blueMix = 0.2 + depthFade * 0.2;
  const acidMix = brightness * 0.4;
  const whiteMix = Math.max(0, brightness - 0.72) * 0.12;
  const baseToBlueR = baseRgb.r + (blueRgb.r - baseRgb.r) * blueMix;
  const baseToBlueG = baseRgb.g + (blueRgb.g - baseRgb.g) * blueMix;
  const baseToBlueB = baseRgb.b + (blueRgb.b - baseRgb.b) * blueMix;
  const acidR = baseToBlueR + (acidRgb.r - baseToBlueR) * acidMix;
  const acidG = baseToBlueG + (acidRgb.g - baseToBlueG) * acidMix;
  const acidB = baseToBlueB + (acidRgb.b - baseToBlueB) * acidMix;
  const offset = index * 3;

  colors[offset] = acidR + (whiteRgb.r - acidR) * whiteMix;
  colors[offset + 1] = acidG + (whiteRgb.g - acidG) * whiteMix;
  colors[offset + 2] = acidB + (whiteRgb.b - acidB) * whiteMix;
}

export default function CrystalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const columns = prefersReducedMotion ? REDUCED_FIELD_COLUMNS : FIELD_COLUMNS;
    const rows = prefersReducedMotion ? REDUCED_FIELD_ROWS : FIELD_ROWS;
    const fieldData = createDotField(columns, rows);
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 2.25, 7.2);
    camera.lookAt(0, -0.2, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, prefersReducedMotion ? 1 : 1.2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.rotation.x = -0.58;
    group.position.y = -0.34;
    scene.add(group);

    const fieldGeometry = new THREE.BufferGeometry();
    fieldGeometry.setAttribute("position", new THREE.BufferAttribute(fieldData.positions, 3));
    fieldGeometry.setAttribute("color", new THREE.BufferAttribute(fieldData.colors, 3));
    const fieldMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.05,
      transparent: true,
      opacity: 0.63,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const field = new THREE.Points(fieldGeometry, fieldMaterial);
    group.add(field);

    const hazeGeometry = new THREE.BufferGeometry();
    const hazePositions = new Float32Array(columns * 3);
    const hazeColors = new Float32Array(columns * 3);
    for (let index = 0; index < columns; index += 1) {
      const x = (index / Math.max(columns - 1, 1) - 0.5) * FIELD_WIDTH;
      const offset = index * 3;
      hazePositions[offset] = x;
      hazePositions[offset + 1] = -0.08;
      hazePositions[offset + 2] = FIELD_DEPTH * 0.5 + 0.28;
      hazeColors[offset] = mutedAcidRgb.r;
      hazeColors[offset + 1] = mutedAcidRgb.g;
      hazeColors[offset + 2] = mutedAcidRgb.b;
    }
    hazeGeometry.setAttribute("position", new THREE.BufferAttribute(hazePositions, 3));
    hazeGeometry.setAttribute("color", new THREE.BufferAttribute(hazeColors, 3));
    const hazeMaterial = new THREE.PointsMaterial({
      vertexColors: true,
      size: 0.034,
      transparent: true,
      opacity: 0.17,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const horizonHaze = new THREE.Points(hazeGeometry, hazeMaterial);
    group.add(horizonHaze);

    const pointer: PointerField = {
      targetX: 0,
      targetZ: 0,
      currentX: 0,
      currentZ: 0,
      targetStrength: 0,
      currentStrength: 0,
      active: false,
      lastMovedAt: -99,
    };
    const ripples: Ripple[] = [];
    const rippleSample: RippleSample = { lift: 0, glow: 0 };
    let frame: number | null = null;
    let lastRender = 0;
    let lastRipple = 0;
    let isVisible = true;

    const updateRenderer = (time: number, delta = 1 / 60) => {
      const positionAttribute = fieldGeometry.getAttribute("position") as THREE.BufferAttribute;
      const colorAttribute = fieldGeometry.getAttribute("color") as THREE.BufferAttribute;

      updatePointerField(pointer, time, delta);

      for (let index = 0; index < fieldData.dots.length; index += 1) {
        const dot = fieldData.dots[index];
        const idleWave = sampleIdleMotion(dot, time);
        const pointerPressure = samplePointerPressure(dot, pointer);
        const ripple = sampleRippleSystem(dot, ripples, time, rippleSample);
        const distanceSafe = Math.max(pointerPressure.distance, 0.001);
        const pressureLift = pointerPressure.falloff * 0.145;
        const pressurePush = pointerPressure.falloff * 0.055;
        const targetX = dot.x + ((dot.x - pointer.currentX) / distanceSafe) * pressurePush;
        const targetZ = dot.z + ((dot.z - pointer.currentZ) / distanceSafe) * pressurePush * 0.55;
        const targetY = idleWave + ripple.lift + pressureLift;
        const targetGlow = clamp01(ripple.glow + pointerPressure.falloff * 0.28 + Math.abs(idleWave) * 1.2);

        fieldData.stateX[index] = damp(fieldData.stateX[index], targetX, 7.2, delta);
        fieldData.stateY[index] = damp(fieldData.stateY[index], targetY, 8.4, delta);
        fieldData.stateZ[index] = damp(fieldData.stateZ[index], targetZ, 7.2, delta);
        fieldData.glow[index] = damp(fieldData.glow[index], targetGlow, 6.5, delta);
        positionAttribute.setXYZ(index, fieldData.stateX[index], fieldData.stateY[index], fieldData.stateZ[index]);

        const depthFade = clamp01((dot.z + FIELD_DEPTH * 0.5) / FIELD_DEPTH);
        writeColor(fieldData.colors, index, depthFade, fieldData.glow[index] + depthFade * 0.06);
      }

      positionAttribute.needsUpdate = true;
      colorAttribute.needsUpdate = true;

      let rippleEnergy = 0;
      for (let index = 0; index < ripples.length; index += 1) {
        const age = time - ripples[index].startedAt;
        if (age > 0 && age < RIPPLE_LIFETIME) {
          rippleEnergy += (1 - age / RIPPLE_LIFETIME) * ripples[index].strength;
        }
      }

      fieldMaterial.size = damp(fieldMaterial.size, 0.049 + Math.min(0.006, pointer.currentStrength * 0.0035 + rippleEnergy * 0.0012), 5.2, delta);
      fieldMaterial.opacity = damp(fieldMaterial.opacity, 0.61 + Math.min(0.045, pointer.currentStrength * 0.026 + rippleEnergy * 0.006), 4.8, delta);
      horizonHaze.rotation.y = damp(horizonHaze.rotation.y, Math.sin(time * 0.12) * 0.018, 3.2, delta);
      hazeMaterial.opacity = damp(hazeMaterial.opacity, 0.16 + Math.sin(time * 0.22) * 0.018, 3.6, delta);
      group.rotation.z = damp(group.rotation.z, Math.sin(time * 0.09) * 0.008, 3, delta);
      removeExpiredRipples(ripples, time);
    };

    const resize = () => {
      const width = mount.clientWidth;
      const height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      updateRenderer(performance.now() * 0.001);
      renderer.render(scene, camera);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion) {
        return;
      }

      const rect = mount.getBoundingClientRect();
      const normalizedX = (event.clientX - rect.left) / Math.max(rect.width, 1);
      const normalizedY = (event.clientY - rect.top) / Math.max(rect.height, 1);
      const now = performance.now() * 0.001;

      pointer.targetX = (normalizedX - 0.5) * FIELD_WIDTH;
      pointer.targetZ = (normalizedY - 0.5) * FIELD_DEPTH * 1.18;
      pointer.targetStrength = Math.max(pointer.targetStrength, POINTER_PEAK_STRENGTH);
      pointer.active = true;
      pointer.lastMovedAt = now;

      if (now - lastRipple > 0.16) {
        ripples.push({
          x: pointer.targetX,
          z: pointer.targetZ,
          startedAt: now + 0.06,
          strength: POINTER_PEAK_STRENGTH,
        });
        if (ripples.length > MAX_RIPPLES) {
          ripples.shift();
        }
        lastRipple = now;
      }
    };

    const animate = (now = 0) => {
      frame = window.requestAnimationFrame(animate);
      if (!isVisible) {
        return;
      }

      const delta = lastRender === 0 ? 1 / 60 : Math.min(0.05, (now - lastRender) / 1000);
      lastRender = now;
      const time = now * 0.001;
      updateRenderer(time, delta);
      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
      if (isVisible) {
        lastRender = performance.now();
      }
    };

    const resizeObserver = new ResizeObserver(resize);

    resize();
    resizeObserver.observe(mount);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    // Future: dots could become interactive memory/project nodes, such as linking to WorkTrace, ClipDock, VisionOS / AR, or GitHub project pages. Do not implement this now.
    if (prefersReducedMotion) {
      updateRenderer(0);
      renderer.render(scene, camera);
    } else {
      frame = window.requestAnimationFrame(animate);
    }

    return () => {
      if (frame !== null) {
        window.cancelAnimationFrame(frame);
      }
      resizeObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.removeEventListener("pointermove", handlePointerMove);
      ripples.length = 0;
      fieldGeometry.dispose();
      fieldMaterial.dispose();
      hazeGeometry.dispose();
      hazeMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="h-full min-h-[420px] w-full lg:min-h-[680px]" aria-hidden="true" />;
}
