import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Github, Sparkles, Briefcase, Map } from "lucide-react";
import { motion, useReducedMotion, useScroll, useTransform, useMotionValue, useSpring } from "motion/react";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import studentBuilders from "@/assets/student-builders.jpg";

const tools = ["Learning roadmaps", "AI mentor", "GitHub evidence", "Peer network", "Internships", "Off-campus jobs", "Hackathons", "Resume builder", "LinkedIn optimizer", "Interview prep", "Roadmap maker", "Public /u profile", "Alumni intros"];

function Word({ children, i, className = "" }: { children: string; i: number; className?: string }) {
  const reduce = useReducedMotion();
  return (
    <span className="inline-block overflow-hidden pb-[0.08em] align-bottom">
      <motion.span className={`inline-block ${className}`} initial={reduce ? false : { y: "110%", rotate: 4 }} animate={{ y: 0, rotate: 0 }} transition={{ duration: 0.9, delay: 0.1 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}>{children}</motion.span>
    </span>
  );
}

export function PremiumHero() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgY = useTransform(scrollYProgress, [0, 1], [0, reduce ? 0 : 120]);
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, reduce ? 1 : 1.08]);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 }), sy = useSpring(my, { stiffness: 60, damping: 18 });
  const chipA = { x: useTransform(sx, v => v * -18), y: useTransform(sy, v => v * -14) };
  const chipB = { x: useTransform(sx, v => v * 22), y: useTransform(sy, v => v * 16) };
  const chipC = { x: useTransform(sx, v => v * -12), y: useTransform(sy, v => v * 20) };
  const onMove = (e: React.MouseEvent) => { if (reduce) return; const r = e.currentTarget.getBoundingClientRect(); mx.set((e.clientX - r.left) / r.width - 0.5); my.set((e.clientY - r.top) / r.height - 0.5); };
  const words1 = ["Your", "ambition,"];
  const fade = (d: number) => ({ initial: reduce ? false as const : { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay: d } });

  return (
    <section ref={ref} onMouseMove={onMove} className="grain relative isolate overflow-hidden px-6 pt-10 md:px-10 md:pt-16">
      <div className="aurora" aria-hidden><span /><span /><span /></div>
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.p {...fade(0)} className="glass-chip inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium text-muted-foreground">
          <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" /><span className="relative h-2 w-2 rounded-full bg-primary" /></span>
          For the next generation of tech builders
        </motion.p>
        <h1 className="landing-title mt-6">
          <Word i={0}>Tier2X.</Word>{" "}{words1.map((w, i) => <span key={w}><Word i={i + 1}>{w}</Word>{" "}</span>)}<br />
          <Word i={3} className="serif-accent ink-gradient pr-2">without</Word>{" "}<Word i={4}>the</Word>{" "}<Word i={5}>campus</Word>{" "}<Word i={6} className="serif-accent ink-gradient pr-2">limits.</Word>
        </h1>
        <div className="mt-8 flex flex-wrap items-end justify-between gap-6">
          <motion.p {...fade(0.7)} className="max-w-lg text-base leading-relaxed text-muted-foreground md:text-lg">Learn the skills. Build the proof. Find your people. Explore opportunities—and show the world what you can do.</motion.p>
          <motion.div {...fade(0.85)} className="flex flex-wrap gap-3">
            <Button asChild className="group h-12 rounded-full px-6 shadow-soft"><Link to="/dashboard">Enter the workspace <ArrowUpRight className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link></Button>
            <Button asChild variant="outline" className="glass-chip h-12 rounded-full px-6"><a href="#explore-workspace">See what’s inside <ArrowRight /></a></Button>
          </motion.div>
        </div>

        <motion.div {...fade(1)} className="relative mt-12">
          <div className="overflow-hidden rounded-3xl shadow-soft">
            <motion.img style={{ y: imgY, scale: imgScale }} src={studentBuilders} alt="Student builders collaborating on a real project together" width={1536} height={1024} className="h-[300px] w-full object-cover md:h-[520px]" />
          </div>
          <motion.div style={chipA} className="glass-chip absolute left-3 top-4 flex items-center gap-3 rounded-2xl px-4 py-3 md:-left-6 md:top-10">
            <Github className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold">Project evidence</p><p className="font-mono text-[10px] text-muted-foreground">README · demo · activity</p></div>
          </motion.div>
          <motion.div style={chipB} className="glass-chip absolute right-3 top-1/3 hidden items-center gap-3 rounded-2xl px-4 py-3 sm:flex md:-right-6">
            <Briefcase className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold">Internships & jobs</p><p className="font-mono text-[10px] text-muted-foreground">eligibility matched</p></div>
          </motion.div>
          <motion.div style={chipC} className="glass-chip absolute bottom-4 left-1/4 hidden items-center gap-3 rounded-2xl px-4 py-3 md:flex">
            <Map className="h-5 w-5 text-gold" /><div><p className="text-xs font-semibold">Your roadmap</p><p className="font-mono text-[10px] text-muted-foreground">step by step</p></div>
            <Sparkles className="h-4 w-4 text-primary" />
          </motion.div>
        </motion.div>
      </div>

      <div className="marquee-wrap relative z-10 mt-12 overflow-hidden border-y border-border py-5 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
        <div className="marquee gap-10">
          {[...tools, ...tools].map((t, i) => (
            <span key={i} className="flex shrink-0 items-center gap-10 font-display text-xl font-medium md:text-2xl">
              <span className={i % 2 ? "serif-accent text-gold" : ""}>{t}</span><span className="text-primary">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
