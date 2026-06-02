"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { cn } from "@/src/lib/utils";
import { animate } from "motion/react";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

export const GlowingEffect = memo(
  ({
    blur = 0,
    inactiveZone = 0.7,
    proximity = 64,
    spread = 28,
    glow = false,
    className,
    movementDuration = 1.5,
    borderWidth = 1,
    disabled = false,
  }: GlowingEffectProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const lastPosition = useRef({ x: 0, y: 0 });
    const animationFrameRef = useRef<number>(0);

    const handleMove = useCallback(
      (e?: MouseEvent | { x: number; y: number }) => {
        if (!containerRef.current) return;

        if (animationFrameRef.current) {
          cancelAnimationFrame(animationFrameRef.current);
        }

        animationFrameRef.current = requestAnimationFrame(() => {
          const element = containerRef.current;
          if (!element) return;

          const { left, top, width, height } = element.getBoundingClientRect();
          const mouseX = e != null ? e.x : lastPosition.current.x;
          const mouseY = e != null ? e.y : lastPosition.current.y;

          if (e != null) lastPosition.current = { x: mouseX, y: mouseY };

          const centerX = left + width * 0.5;
          const centerY = top + height * 0.5;
          const distanceFromCenter = Math.hypot(mouseX - centerX, mouseY - centerY);
          const inactiveRadius = 0.5 * Math.min(width, height) * inactiveZone;

          if (distanceFromCenter < inactiveRadius) {
            element.style.setProperty("--active", "0");
            return;
          }

          const isActive =
            mouseX > left - proximity &&
            mouseX < left + width + proximity &&
            mouseY > top - proximity &&
            mouseY < top + height + proximity;

          element.style.setProperty("--active", isActive ? "1" : "0");
          if (!isActive) return;

          const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
          const targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;
          const angleDiff = ((targetAngle - currentAngle + 180) % 360) - 180;
          const newAngle = currentAngle + angleDiff;

          animate(currentAngle, newAngle, {
            duration: movementDuration,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (value) => {
              element.style.setProperty("--start", String(value));
            },
          });
        });
      },
      [inactiveZone, proximity, movementDuration],
    );

    useEffect(() => {
      if (disabled) return;
      const handleScroll = () => handleMove();
      const handlePointerMove = (e: PointerEvent) => handleMove(e);
      window.addEventListener("scroll", handleScroll, { passive: true });
      document.body.addEventListener("pointermove", handlePointerMove, { passive: true });
      return () => {
        if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);
        window.removeEventListener("scroll", handleScroll);
        document.body.removeEventListener("pointermove", handlePointerMove);
      };
    }, [handleMove, disabled]);

    return (
      <div
        ref={containerRef}
        style={
          {
            "--blur": `${blur}px`,
            "--spread": spread,
            "--start": "0",
            "--active": "0",
            "--glowingeffect-border-width": `${borderWidth}px`,
            "--repeating-conic-gradient-times": "5",
            /* Philippine flag colors: gold → navy → red */
            "--gradient": `
              radial-gradient(circle, #F5A623 10%, #F5A62300 20%),
              radial-gradient(circle at 40% 40%, #1B3268 5%, #1B326800 15%),
              radial-gradient(circle at 60% 60%, #C01919 10%, #C0191900 20%),
              radial-gradient(circle at 40% 60%, #F5A623 10%, #F5A62300 20%),
              repeating-conic-gradient(
                from 236.84deg at 50% 50%,
                #F5A623 0%,
                #1B3268 calc(25% / var(--repeating-conic-gradient-times)),
                #C01919 calc(50% / var(--repeating-conic-gradient-times)),
                #F5A623 calc(75% / var(--repeating-conic-gradient-times)),
                #F5A623 calc(100% / var(--repeating-conic-gradient-times))
              )`,
          } as React.CSSProperties
        }
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] opacity-100 transition-opacity",
          glow && "opacity-100",
          blur > 0 && "blur-(--blur)",
          className,
          disabled && "hidden!",
        )}
      >
        <div
          className={cn(
            "glow rounded-[inherit]",
            'after:content-[""] after:rounded-[inherit] after:absolute after:-inset-(--glowingeffect-border-width)',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:bg-fixed",
            "after:opacity-(--active) after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box]",
            "after:mask-intersect",
            "after:mask-[linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]",
          )}
        />
      </div>
    );
  },
);
GlowingEffect.displayName = "GlowingEffect";
