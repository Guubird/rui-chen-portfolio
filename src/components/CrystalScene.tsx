import { useEffect, useRef } from "react";
import * as THREE from "three";

const NORMAL_PARTICLE_COUNT = 72;
const REDUCED_MOTION_PARTICLE_COUNT = 24;

export default function CrystalScene() {
  const mountRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) {
      return;
    }

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    camera.position.set(0, 0.4, 7.5);

    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: true, powerPreference: "low-power" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, prefersReducedMotion ? 1 : 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.style.display = "block";
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);

    const crystalGeometry = new THREE.IcosahedronGeometry(2.25, 1);
    const crystalMaterial = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color("#ccff00"),
      metalness: 0.05,
      roughness: 0.12,
      transmission: 0.72,
      thickness: 1.4,
      transparent: true,
      opacity: 0.72,
      clearcoat: 1,
      clearcoatRoughness: 0.08,
      ior: 1.6,
      emissive: new THREE.Color("#203300"),
      emissiveIntensity: 0.18,
    });
    const crystal = new THREE.Mesh(crystalGeometry, crystalMaterial);
    crystal.scale.set(1, 1.32, 0.82);
    crystal.rotation.set(-0.22, 0.62, 0.1);
    group.add(crystal);

    const wireGeometry = crystalGeometry.clone();
    const wireMaterial = new THREE.MeshBasicMaterial({
      color: 0x88aaff,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const wire = new THREE.Mesh(wireGeometry, wireMaterial);
    wire.scale.copy(crystal.scale).multiplyScalar(1.005);
    wire.rotation.copy(crystal.rotation);
    group.add(wire);

    const coreGeometry = new THREE.OctahedronGeometry(0.72, 1);
    const coreMaterial = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      transparent: true,
      opacity: 0.42,
      blending: THREE.AdditiveBlending,
    });
    const core = new THREE.Mesh(coreGeometry, coreMaterial);
    group.add(core);

    const particleCount = prefersReducedMotion ? REDUCED_MOTION_PARTICLE_COUNT : NORMAL_PARTICLE_COUNT;
    const particlePositions = new Float32Array(particleCount * 3);
    for (let index = 0; index < particleCount; index += 1) {
      const offset = index * 3;
      const radius = 2.8 + Math.random() * 2.4;
      const angle = Math.random() * Math.PI * 2;
      const y = (Math.random() - 0.5) * 5.8;
      particlePositions[offset] = Math.cos(angle) * radius;
      particlePositions[offset + 1] = y;
      particlePositions[offset + 2] = Math.sin(angle) * radius;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute("position", new THREE.BufferAttribute(particlePositions, 3));
    const particleMaterial = new THREE.PointsMaterial({
      color: 0x88aaff,
      size: 0.035,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const particles = new THREE.Points(particleGeometry, particleMaterial);
    group.add(particles);

    scene.add(new THREE.AmbientLight(0xffffff, 0.45));
    const keyLight = new THREE.DirectionalLight(0xccff00, 2.2);
    keyLight.position.set(3, 4, 5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x88aaff, 18, 12);
    rimLight.position.set(-3, 2, 3);
    scene.add(rimLight);

    const pointer = { x: 0, y: 0 };
    let width = 0;
    let height = 0;
    let frame: number | null = null;
    let time = 0;
    let lastRender = 0;
    let isVisible = true;

    const resize = () => {
      width = mount.clientWidth;
      height = mount.clientHeight;
      renderer.setSize(width, height, false);
      camera.aspect = width / Math.max(height, 1);
      camera.updateProjectionMatrix();
      renderer.render(scene, camera);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (prefersReducedMotion) {
        return;
      }
      const rect = mount.getBoundingClientRect();
      pointer.x = ((event.clientX - rect.left) / Math.max(rect.width, 1) - 0.5) * 2;
      pointer.y = -((event.clientY - rect.top) / Math.max(rect.height, 1) - 0.5) * 2;
    };

    const animate = (now = 0) => {
      frame = window.requestAnimationFrame(animate);
      if (!isVisible || now - lastRender < 33) {
        return;
      }
      lastRender = now;
      time += 0.01;

      group.rotation.y += (pointer.x * 0.24 - group.rotation.y) * 0.035;
      group.rotation.x += (pointer.y * 0.16 - group.rotation.x) * 0.035;

      crystal.rotation.y += 0.0032;
      wire.rotation.y -= 0.002;
      core.rotation.x += 0.006;
      core.rotation.y += 0.008;
      particles.rotation.y += 0.0014;
      particles.rotation.x = Math.sin(time * 0.7) * 0.08;
      core.scale.setScalar(1 + Math.sin(time * 1.8) * 0.055);

      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      isVisible = document.visibilityState === "visible";
    };

    const resizeObserver = new ResizeObserver(resize);

    resize();
    resizeObserver.observe(mount);
    document.addEventListener("visibilitychange", handleVisibilityChange);
    mount.addEventListener("pointermove", handlePointerMove, { passive: true });

    if (prefersReducedMotion) {
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
      mount.removeEventListener("pointermove", handlePointerMove);
      crystalGeometry.dispose();
      crystalMaterial.dispose();
      wireGeometry.dispose();
      wireMaterial.dispose();
      coreGeometry.dispose();
      coreMaterial.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      renderer.dispose();
      renderer.forceContextLoss();
      renderer.domElement.remove();
    };
  }, []);

  return <div ref={mountRef} className="h-full min-h-[420px] w-full lg:min-h-[680px]" aria-hidden="true" />;
}
