import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { ArrowUpRight, Map, Compass, Sparkles, Briefcase, Trophy, ClipboardList, Users, MessagesSquare, UserCheck, Github, Linkedin, FileText } from "lucide-react";

const reveal = (i: number) => ({
  initial: { opacity: 0, y: 24 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.6, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
  whileHover: { y: -4 },
});

const card = "group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card p-6";

function Tag({ children }: { children: string }) {
  return <span className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">{children}</span>;
}

function More({ to }: { to: string }) {
  return <Link to={to} className="mt-auto inline-flex items-center gap-1 pt-6 text-sm font-medium text-foreground">Open <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>;
}

export function FeatureBento() {
  return (
    <section className="px-6 py-20 md:px-10 md:py-28">
      <div className="mx-auto max-w-6xl">
        <Tag>Everything inside Tier2X</Tag>
        <h2 className="minimal-section-title mt-4">One workspace.<br /><span className="text-gold">Every step of your career.</span></h2>
        <p className="mt-5 max-w-xl text-muted-foreground">Learn, find opportunities, grow your network and polish your profile — 13 tools, one login.</p>

        <div className="mt-14 grid auto-rows-[minmax(180px,auto)] gap-4 md:grid-cols-6">
          {/* Prep roadmap — large */}
          <motion.div {...reveal(0)} className={`${card} md:col-span-4 md:row-span-2 bg-secondary`}>
            <Tag>Learn · Prep Roadmap</Tag>
            <h3 className="mt-3 text-2xl font-semibold">Skill journey, step by step.</h3>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">Clear roadmaps for DSA, web dev, AI and more — track every milestone.</p>
            <div className="mt-8 space-y-3">
              {[["DSA Foundations", 100], ["React & APIs", 68], ["System Design", 32]].map(([n, v], i) => (
                <div key={n as string}>
                  <div className="mb-1 flex justify-between text-xs"><span>{n}</span><span className="font-mono">{v}%</span></div>
                  <div className="h-2 rounded-full bg-background"><motion.div initial={{ width: 0 }} whileInView={{ width: `${v}%` }} viewport={{ once: true }} transition={{ duration: 1.1, delay: 0.2 + i * 0.15 }} className="h-2 rounded-full bg-primary" /></div>
                </div>
              ))}
            </div>
            <More to="/prep" />
          </motion.div>

          <motion.div {...reveal(1)} className={`${card} md:col-span-2`}>
            <Sparkles className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold">AI Mentor</h3>
            <p className="mt-1 text-sm text-muted-foreground">Ask anything — career, code, interviews. 24/7.</p>
            <More to="/dashboard" />
          </motion.div>
          <motion.div {...reveal(2)} className={`${card} md:col-span-2`}>
            <Compass className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold">Roadmap Maker</h3>
            <p className="mt-1 text-sm text-muted-foreground">Build your own custom learning path with AI.</p>
            <More to="/roadmap-maker" />
          </motion.div>

          {/* Opportunities */}
          <motion.div {...reveal(3)} className={`${card} md:col-span-3`}>
            <Tag>Opportunity</Tag>
            <h3 className="mt-3 text-xl font-semibold">Internships, jobs & hackathons — live.</h3>
            <div className="mt-5 flex flex-wrap gap-2">
              {[[Briefcase, "Internship Board"], [Briefcase, "Off-Campus Jobs"], [Trophy, "Hackathons"]].map(([I, l]) => { const Icon = I as typeof Briefcase; return <span key={l as string} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-3 py-1.5 text-xs"><Icon className="h-3.5 w-3.5" />{l as string}</span>; })}
            </div>
            <More to="/jobs" />
          </motion.div>
          <motion.div {...reveal(4)} className={`${card} md:col-span-3 bg-surface`}>
            <ClipboardList className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-xl font-semibold">Application Tracker</h3>
            <div className="mt-4 grid grid-cols-3 gap-2 text-center text-xs">
              {[["Applied", 12], ["Interview", 4], ["Offer", 1]].map(([l, n]) => <div key={l as string} className="rounded-xl bg-background py-3"><div className="text-2xl font-semibold">{n}</div><div className="text-muted-foreground">{l}</div></div>)}
            </div>
            <More to="/applications" />
          </motion.div>

          {/* Network */}
          {[[Users, "Discover Peers", "Find builders with your skills.", "/discover"], [MessagesSquare, "Peer Rooms", "Study & build together, live.", "/rooms"], [UserCheck, "Alumni Referrals", "Get referred by seniors.", "/alumni"]].map(([I, t, d, to], i) => { const Icon = I as typeof Users; return (
            <motion.div key={t as string} {...reveal(5 + i)} className={`${card} md:col-span-2`}>
              <Tag>Network</Tag>
              <Icon className="mt-4 h-6 w-6 text-gold" strokeWidth={1.5} />
              <h3 className="mt-3 text-lg font-semibold">{t as string}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d as string}</p>
              <More to={to as string} />
            </motion.div>); })}

          {/* Profile tools */}
          <motion.div {...reveal(8)} className={`${card} md:col-span-2`}>
            <Github className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold">Dev Report Card</h3>
            <p className="mt-1 text-sm text-muted-foreground">Your GitHub work, scored and shareable.</p>
            <More to="/devprofile" />
          </motion.div>
          <motion.div {...reveal(9)} className={`${card} md:col-span-2 bg-secondary`}>
            <Linkedin className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold">LinkedIn Optimizer</h3>
            <div className="mt-3 flex items-baseline gap-2"><span className="text-4xl font-semibold">54</span><ArrowUpRight className="h-4 w-4" /><span className="text-4xl font-semibold text-gold">89</span></div>
            <p className="mt-1 text-xs text-muted-foreground">Recruiter keyword score</p>
            <More to="/linkedin-optimizer" />
          </motion.div>
          <motion.div {...reveal(10)} className={`${card} md:col-span-2`}>
            <FileText className="h-6 w-6 text-gold" strokeWidth={1.5} />
            <h3 className="mt-4 text-lg font-semibold">Resume Builder</h3>
            <p className="mt-1 text-sm text-muted-foreground">ATS-friendly resume in minutes.</p>
            <More to="/dashboard" />
          </motion.div>
        </div>
        <p className="mt-6 flex items-center gap-2 text-xs text-muted-foreground"><Map className="h-4 w-4" /> Free to start — sign up and everything opens up.</p>
      </div>
    </section>
  );
}
