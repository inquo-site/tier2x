import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Map, Compass, Sparkles, Briefcase, Trophy, ClipboardList, Users, MessagesSquare, UserCheck, Github, Linkedin, FileText, FolderGit2, Rocket, UserCircle, Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const chapters = [
  { name: "Learn", number: "01", headline: "Turn ‘where do I start?’ into a plan.", description: "Choose a learning track, map your own goal, and get help when a concept or interview question gets in the way.", outcome: "A direction. A next step. A little more confidence.", tools: [
    { icon: Map, name: "Prep Roadmap", detail: "Follow skill tracks and mark milestones as you work through them.", to: "/prep" },
    { icon: Compass, name: "Roadmap Maker", detail: "Turn your learning goal into an AI-generated, phased roadmap.", to: "/roadmap-maker" },
    { icon: Sparkles, name: "AI Mentor", detail: "Talk through code, concepts, career questions, and interview preparation.", to: "/mentor" },
  ] },
  { name: "Build", number: "02", headline: "Give your ideas somewhere to grow.", description: "Put a project in front of other builders. Share the stack, attach your code and demo, and let people know which roles you need.", outcome: "From an idea in your notes to work people can see.", tools: [
    { icon: FolderGit2, name: "Project Hub", detail: "Showcase projects with GitHub links, live demos, tech stacks, and open team roles.", to: "/projects" },
    { icon: Rocket, name: "Startup Incubator", detail: "Post your startup pitch, share its stage, and find people for the roles you need.", to: "/startups" },
  ] },
  { name: "Connect", number: "03", headline: "Find people, not just connections.", description: "Discover peers with shared interests, join a room to learn or build together, and explore alumni referral opportunities beyond your campus.", outcome: "A circle of people who understand what you’re building.", tools: [
    { icon: Users, name: "Discover Peers", detail: "Explore builder profiles and discover people with complementary skills.", to: "/discover" },
    { icon: MessagesSquare, name: "Peer Rooms", detail: "Join topic-based rooms for conversations, study, and collaboration.", to: "/rooms" },
    { icon: UserCheck, name: "Alumni Referrals", detail: "Explore referrals shared by alumni and send an introduction request.", to: "/alumni" },
  ] },
  { name: "Opportunities", number: "04", headline: "Make your next move an informed one.", description: "Explore internships, off-campus jobs, and hackathons. Read the requirements before applying, then keep your applications together.", outcome: "Less scattered searching. More intentional applications.", tools: [
    { icon: Briefcase, name: "Internship Board", detail: "Compare internships by stack, location, stipend, and requirements.", to: "/internships" },
    { icon: Briefcase, name: "Off-Campus Jobs", detail: "Explore roles beyond your placement cell and inspect their eligibility and skills.", to: "/jobs" },
    { icon: Trophy, name: "Hackathons", detail: "Find challenges, check event details, and explore places to put your skills to work.", to: "/hackathons" },
    { icon: ClipboardList, name: "Application Tracker", detail: "Keep track of applications and their progress in one place.", to: "/applications" },
  ] },
  { name: "Your identity", number: "05", headline: "Let your work make the introduction.", description: "Bring your public repositories into a shareable builder profile, improve your LinkedIn wording, and create a resume that tells your story.", outcome: "A clearer picture of what you know—and what you’ve made.", tools: [
    { icon: Github, name: "Dev Report Card", detail: "Import public GitHub projects, inspect repository evidence, and share your /u/handle profile.", to: "/devprofile" },
    { icon: Linkedin, name: "LinkedIn Optimizer", detail: "Compare recruiter keywords and get AI-assisted rewrites of your profile text.", to: "/linkedin-optimizer" },
    { icon: FileText, name: "Resume Builder", detail: "Bring your skills, experience, and projects into an editable resume.", to: "/resume" },
    { icon: UserCircle, name: "My Profile", detail: "Keep your personal details, skills, and builder identity together.", to: "/profile" },
  ] },
] as const;

function Preview({ chapter }: { chapter: number }) {
  const items = chapter === 0 ? ["Pick your skill track", "Work through a milestone", "Ask your AI mentor"]
    : chapter === 1 ? ["Describe your project", "Attach code + live demo", "Find your next teammate"]
    : chapter === 2 ? ["Discover a builder", "Join a peer room", "Request an alumni intro"]
    : chapter === 3 ? ["Read skills + eligibility", "Apply to an opportunity", "Track your next step"]
    : ["Import public repositories", "Share your builder profile", "Polish resume + LinkedIn"];
  const Icon = chapters[chapter]?.tools[0].icon ?? Map;
  return <div className="border-y border-border py-6">
    <div className="mb-6 flex items-center justify-between"><Icon className="h-7 w-7 text-gold" strokeWidth={1.5} /><span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">Your next moves</span></div>
    {items.map((item, i) => <div key={item} className="flex items-center gap-4 py-3"><span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs ${i === 0 ? "bg-primary text-primary-foreground" : "border border-border text-muted-foreground"}`}>{i === 0 ? <ArrowRight className="h-3.5 w-3.5" /> : `0${i + 1}`}</span><span className="text-sm font-medium">{item}</span></div>)}
  </div>;
}

export function FeatureBento() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const chapter = chapters[active] ?? chapters[0];
  return <>
    <section id="explore-workspace" className="scroll-mt-8 px-6 py-16 md:px-10 md:py-24">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-wrap items-end justify-between gap-6"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">The whole workspace, at a glance</p><h2 className="minimal-section-title mt-4">What’s your<br /><span className="text-gold">next move?</span></h2></div><p className="max-w-sm text-sm leading-relaxed text-muted-foreground">Not another list of links. A place to learn something, build something, meet someone, and find what comes next.</p></div>
        <div role="tablist" aria-label="Explore Tier2X features" className="mt-10 grid grid-cols-2 gap-2 sm:grid-cols-3 lg:grid-cols-5">
          {chapters.map((item, i) => <Button key={item.name} id={`chapter-tab-${i}`} role="tab" aria-selected={active === i} aria-controls={`chapter-panel-${i}`} tabIndex={active === i ? 0 : -1} variant={active === i ? "default" : "outline"} onClick={() => setActive(i)} onKeyDown={(event) => {
            const next = event.key === "ArrowRight" ? (i + 1) % chapters.length : event.key === "ArrowLeft" ? (i + chapters.length - 1) % chapters.length : event.key === "Home" ? 0 : event.key === "End" ? chapters.length - 1 : null;
            if (next === null) return;
            event.preventDefault(); setActive(next); document.getElementById(`chapter-tab-${next}`)?.focus();
          }} className="h-14 justify-start gap-3 rounded-lg px-4"><span className="font-mono text-[10px] opacity-70">{item.number}</span>{item.name}</Button>)}
        </div>
        <div id={`chapter-panel-${active}`} role="tabpanel" aria-labelledby={`chapter-tab-${active}`} tabIndex={0} className="mt-8 min-h-[450px] rounded-lg bg-surface p-6 md:p-10">
          <motion.div key={active} initial={reduce ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="grid gap-10 lg:grid-cols-[1fr_1.05fr]">
            <div><p className="font-mono text-xs text-gold">CHAPTER {chapter.number} / {chapter.name.toUpperCase()}</p><h3 className="mt-4 max-w-md text-3xl font-semibold leading-tight md:text-4xl">{chapter.headline}</h3><p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">{chapter.description}</p><div className="mt-6 max-w-md"><Preview chapter={active} /></div><p className="mt-5 flex items-start gap-2 text-xs text-muted-foreground"><Check className="h-4 w-4 shrink-0 text-gold" />{chapter.outcome}</p></div>
            <div className="divide-y divide-border">{chapter.tools.map(({ icon: Icon, name, detail, to }) => <Link key={name} to={to} className="group flex items-start gap-4 py-5 first:pt-0 last:pb-0"><Icon className="mt-1 h-6 w-6 shrink-0 text-gold" strokeWidth={1.5} /><div className="flex-1"><h4 className="text-lg font-semibold">{name}</h4><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{detail}</p><span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-gold">Explore {name}<ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span></div></Link>)}</div>
          </motion.div>
        </div>
      </div>
    </section>
    <section className="border-y border-border px-6 py-12 md:px-10">
      <div className="mx-auto max-w-6xl"><div className="mb-8 flex flex-wrap items-baseline justify-between gap-3"><h2 className="text-2xl font-semibold">One login. Your whole toolkit.</h2><span className="text-xs text-muted-foreground">Pick any starting point.</span></div><div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-5">{chapters.map(group => <div key={group.name}><p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-gold">{group.number} / {group.name}</p><ul className="space-y-3">{group.tools.map(({ name, to }) => <li key={name}><Link to={to} className="group flex items-start justify-between gap-2 text-sm text-foreground hover:text-gold">{name}<ArrowUpRight className="mt-0.5 h-3.5 w-3.5 shrink-0 opacity-40 group-hover:opacity-100" /></Link></li>)}</ul></div>)}</div></div>
    </section>
  </>;
}
