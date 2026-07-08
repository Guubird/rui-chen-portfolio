import { useEffect, useRef } from "react";

export default function PointerField() {
  const layerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const layer = layerRef.current;
    if (!layer || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    let last = 0;
    const timeouts = new Set<number>();

    const handlePointerMove = (event: PointerEvent) => {
      const now = performance.now();
      if (now - last < 190) {
        return;
      }
      last = now;

      if (layer.children.length > 7) {
        layer.firstElementChild?.remove();
      }

      const ripple = document.createElement("span");
      ripple.className = "pointer-soft-ripple";
      ripple.style.left = `${event.clientX}px`;
      ripple.style.top = `${event.clientY}px`;
      layer.appendChild(ripple);

      const timeout = window.setTimeout(() => {
        ripple.remove();
        timeouts.delete(timeout);
      }, 1450);
      timeouts.add(timeout);
    };

    window.addEventListener("pointermove", handlePointerMove, { passive: true });

    return () => {
      window.removeEventListener("pointermove", handlePointerMove);
      timeouts.forEach((timeout) => window.clearTimeout(timeout));
      timeouts.clear();
      layer.replaceChildren();
    };
  }, []);

  return <div ref={layerRef} className="pointer-events-none fixed inset-0 z-[1] overflow-hidden" aria-hidden="true" />;
}
