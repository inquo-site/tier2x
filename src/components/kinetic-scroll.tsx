import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

/** Scroll-linked glowing beam fixed to the left edge; draws as the page scrolls. */
export function KineticBeam() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.4 });
  const dotY = useTransform(progress, [0, 1], ["0%", "100%"]);
  if (reduce) return null;
  return (
    <div aria-hidden className="pointer-events-none fixed left-3 top-24 bottom-10 z-30 hidden w-6 md:block">
      <svg viewBox="0 0 24 1000" preserveAspectRatio="none" className="h-full w-full">
        <defs>
          <linearGradient id="kbeam" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="var(--primary)" />
            <stop offset="100%" stopColor="var(--secondary)" />
          </linearGradient>
        </defs>
        <path d="M12 0 C 2 160, 22 320, 12 500 S 2 840, 12 1000" fill="none" stroke="var(--border)" strokeWidth="1.5" />
        <motion.path d="M12 0 C 2 160, 22 320, 12 500 S 2 840, 12 1000" fill="none" stroke="url(#kbeam)" strokeWidth="3" strokeLinecap="round" style={{ pathLength: progress }} />
      </svg>
      <motion.span style={{ top: dotY }} className="absolute left-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary ring-4 ring-primary/25" />
    </div>
  );
}

/** Card that tilts in 3D with the pointer and swings flat as it enters the viewport. */
export function TiltCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 200, damping: 18 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 18 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "start 60%"] });
  const enter = useTransform(scrollYProgress, [0, 1], [22, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.3, 1]);

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onPointerMove={(e) => {
          if (reduce) return;
          const r = e.currentTarget.getBoundingClientRect();
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onPointerLeave={() => { mx.set(0); my.set(0); }}
        style={reduce ? undefined : { rotateX: rx, rotateY: ry, rotateZ: 0, transformStyle: "preserve-3d", opacity }}
        className={`h-full ${className}`}
      >
        <motion.div style={reduce ? undefined : { rotateX: enter, transformOrigin: "bottom" }} className="h-full">
          {children}
        </motion.div>
      </motion.div>
    </div>
  );
}
