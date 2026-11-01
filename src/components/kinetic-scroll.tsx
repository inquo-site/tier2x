import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";

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
