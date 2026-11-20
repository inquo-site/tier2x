import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Users, FolderGit2, Sparkles, Check, Github, ExternalLink, Layers, Plus } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { FeaturedBlogsSection } from "@/components/featured-blogs";
import { motion, useReducedMotion } from "motion/react";
import studentBuilders from "@/assets/student-builders.jpg";
import { FeatureBento } from "@/components/feature-bento";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tier2X — Learn, Build, Connect & Find Tech Opportunities" },
      {
        name: "description",
        content:
          "Explore Tier2X: learning roadmaps, AI mentorship, GitHub project profiles, peer collaboration, internships, jobs, and career tools in one workspace.",
      },
      { name: "keywords", content: "off campus jobs India, tier 2 college placements, alumni referral, fresher jobs, Tier2X, Suman Kumar" },
      { property: "og:title", content: "Tier2X — Learn, Build, Connect & Find Tech Opportunities" },
      { property: "og:description", content: "Learning roadmaps, real project evidence, peer connections, and tech opportunities. Discover your next move with Tier2X." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://tier2x.lovable.app/" },
    ],
    links: [{ rel: "canonical", href: "https://tier2x.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          name: "Tier2X",
          url: "https://tier2x.lovable.app/",
          email: "campusx4@gmail.com",
          founder: { "@type": "Person", name: "Suman Kumar" },
          address: { "@type": "PostalAddress", addressLocality: "Purnia", addressRegion: "Bihar", postalCode: "854315", addressCountry: "IN" },
          description: "Off-campus jobs, alumni introductions and career support for students at India's Tier-2 and Tier-3 engineering colleges.",
        }),
      },
    ],
  }),
  component: Landing,
});

const questions = [
  { question: "What can I do on Tier2X?", answer: "Follow a learning roadmap, ask an AI mentor, showcase projects, discover collaborators, explore internships and jobs, join hackathons, and prepare your public profile, LinkedIn, and resume—all from the same workspace." },
  { question: "Do I need a GitHub account to start?", answer: "No. You can explore learning, networking, and career tools without importing GitHub. Add a public GitHub username when you want your project evidence on your shareable profile." },
  { question: "What does the GitHub evidence score mean?", answer: "It reflects public repository signals such as a README, license, topics, activity, and demo link. It is not a source-code audit or verification that you own the account. Some checks may remain pending when GitHub limits requests." },
  { question: "Does Tier2X guarantee a job or referral?", answer: "No. Tier2X helps you discover opportunities, understand requirements, request introductions, and track applications. Employers and alumni make their own decisions; always review the original listing before applying." },
  { question: "Are AI Company teams part of the student workspace?", answer: "AI Company OS is a separate offering with team-based plans. Explore its team descriptions and pricing before choosing a plan; it is not required to use the student workspace." },
];

function Landing() {
  const reduce = useReducedMotion();
  const reveal = { initial: reduce ? false as const : { opacity: 0, y: 20 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.6 } };
  return (
    <MarketingLayout>
      <section className="landing-intro px-6 pt-7 md:px-10 md:pt-10">
        <div className="mx-auto max-w-6xl">
          <p className="flex items-center gap-2 text-xs uppercase tracking-widest text-muted-foreground"><span className="h-2 w-2 rounded-full bg-primary" /> For the next generation of tech builders</p>
          <motion.h1 {...reveal} className="landing-title mt-5">Tier2X. Your ambition,<br /><span className="text-gold">without the campus limits.</span></motion.h1>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6"><p className="max-w-lg text-base leading-relaxed text-muted-foreground">Learn the skills. Build the proof. Find your people.<br className="hidden sm:block" /> Explore opportunities—and show the world what you can do.</p><div className="flex flex-wrap gap-3"><Button asChild className="h-11 px-5"><Link to="/dashboard">Enter the workspace <ArrowUpRight /></Link></Button><Button asChild variant="outline" className="h-11 px-5"><a href="#explore-workspace">See what’s inside <ArrowRight /></a></Button></div></div>
          <motion.figure {...reveal} className="relative mb-0 mt-8 overflow-hidden rounded-lg"><img src={studentBuilders} alt="Student builders collaborating on a real project together" width={1536} height={1024} className="landing-photo w-full object-cover" /><figcaption className="flex flex-wrap items-center justify-between gap-2 bg-secondary px-5 py-3 text-xs text-secondary-foreground"><span>Big ideas can start on any campus.</span><span className="font-mono text-[10px] uppercase tracking-widest">Skills → Projects → People → Possibilities</span></figcaption></motion.figure>
        </div>
      </section>
      <FeatureBento />

      <section className="bg-secondary px-6 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-6xl">
          <motion.div {...reveal} className="grid items-start gap-10 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
            <div><p className="text-xs uppercase tracking-widest text-muted-foreground">Proof over promises</p><h2 className="minimal-section-title mt-4">Your work.<br />Not just your word.</h2><p className="mt-6 max-w-md text-sm leading-relaxed text-muted-foreground">Your profile should tell more than your college name. Bring public GitHub repositories, live projects, and your technology stack into one shareable identity.</p><ul className="mt-6 space-y-4">{["Automatic import of eligible public repositories", "README, license, demo, and activity indicators", "Language breakdown from repository evidence", "A public /u/handle profile you can share"].map(text => <li key={text} className="flex items-start gap-3 text-sm"><Check className="mt-0.5 h-4 w-4 shrink-0 text-gold" />{text}</li>)}</ul><Button asChild variant="outline" className="mt-8 border-border bg-transparent"><Link to="/devprofile">Build your tech identity <ArrowUpRight /></Link></Button></div>
            <div className="overflow-hidden rounded-lg border border-border bg-card" aria-label="Illustrative public project evidence preview"><div className="flex items-center justify-between gap-3 border-b border-border px-6 py-4"><span className="flex items-center gap-2 text-sm font-semibold"><Github className="h-4 w-4" /> Project evidence</span><span className="font-mono text-[10px] text-muted-foreground">EXAMPLE PREVIEW</span></div><div className="p-6 md:p-8"><p className="font-mono text-xs text-gold">PUBLIC REPOSITORY</p><h3 className="mt-3 text-2xl font-semibold">Your next shipped project</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">The code, context, and demo behind the things you build.</p><div className="mt-6 flex flex-wrap gap-2">{["React", "TypeScript", "Python"].map(t => <span key={t} className="rounded border border-border px-2 py-1 font-mono text-[10px]">{t}</span>)}</div><div className="mt-7 grid grid-cols-2 gap-x-5 gap-y-4 border-y border-border py-5">{["README", "License", "Live demo", "Recent activity"].map(t => <div key={t} className="flex items-center gap-2 text-xs"><Check className="h-3.5 w-3.5 text-gold" />{t}</div>)}</div><div className="mt-5 flex flex-wrap gap-5 text-xs text-muted-foreground"><span className="flex items-center gap-2"><Github className="h-3.5 w-3.5" />Code link</span><span className="flex items-center gap-2"><ExternalLink className="h-3.5 w-3.5" />Demo link</span></div><p className="mt-6 text-[11px] leading-relaxed text-muted-foreground">Illustrative signals, not a real imported project. Evidence scores are not source-code audits or account verification.</p></div></div>
          </motion.div>
        </div>
      </section>

      <section className="px-6 py-16 md:px-10 md:py-24"><div className="mx-auto max-w-6xl"><p className="text-xs uppercase tracking-widest text-muted-foreground">Make it yours</p><h2 className="minimal-section-title mt-4">Start where you are.<br /><span className="text-gold">Move toward what’s next.</span></h2><div className="mt-10 grid gap-8 md:grid-cols-3">{[
        { number: "01", title: "Set your direction", text: "Create your profile, add your skills, and choose what you want to work toward.", to: "/profile", link: "Create your profile" },
        { number: "02", title: "Make something real", text: "Follow a roadmap, ask for help, share a project, or join people already building.", to: "/projects", link: "Explore projects" },
        { number: "03", title: "Open the next door", text: "Bring your proof-of-work to internships, off-campus roles, hackathons, and alumni introductions.", to: "/internships", link: "Find opportunities" },
      ].map(item => <motion.article {...reveal} key={item.number} className="border-t border-border pt-6"><span className="font-mono text-xs text-gold">{item.number}</span><h3 className="mt-5 text-2xl font-semibold">{item.title}</h3><p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p><Button asChild variant="link" className="mt-4 h-auto p-0 text-gold"><Link to={item.to}>{item.link} <ArrowUpRight /></Link></Button></motion.article>)}</div></div></section>

      <section className="border-y border-border bg-surface px-6 py-12 md:px-10 md:py-16"><div className="mx-auto grid max-w-6xl items-start gap-8 md:grid-cols-[1.1fr_0.9fr]"><div><p className="flex items-center gap-2 text-xs uppercase tracking-widest text-gold"><Layers className="h-4 w-4" /> Beyond the student workspace</p><h2 className="mt-4 text-3xl font-semibold md:text-4xl">Building a company, too?</h2><p className="mt-5 max-w-lg text-sm leading-relaxed text-muted-foreground">Explore AI Company OS: departmental AI teams for work across product, engineering, design, marketing, and content. Review team plans and manage assigned tasks in a dedicated console.</p><Button asChild variant="outline" className="mt-6"><Link to="/ai-company">Explore AI Company OS <ArrowUpRight /></Link></Button></div><div className="divide-y divide-border">{[{ icon: Sparkles, name: "Departmental teams", detail: "Choose the team that fits the work you need." }, { icon: FolderGit2, name: "Task workspace", detail: "Assign work and review task progress and results." }, { icon: Users, name: "Separate team plans", detail: "View team-based pricing before you activate." }].map(({icon: Icon, name, detail}) => <div key={name} className="flex gap-4 py-4 first:pt-0"><Icon className="mt-1 h-5 w-5 shrink-0 text-gold" /><div><h3 className="text-base font-semibold">{name}</h3><p className="mt-1 text-sm text-muted-foreground">{detail}</p></div></div>)}</div></div></section>
      <FeaturedBlogsSection />
      <section className="px-6 py-16 md:px-10 md:py-20"><div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr]"><div><p className="text-xs uppercase tracking-widest text-muted-foreground">Before you jump in</p><h2 className="minimal-section-title mt-4">A few things<br />worth knowing.</h2><Button asChild variant="link" className="mt-4 p-0 text-gold"><Link to="/pricing">Explore pricing <ArrowUpRight /></Link></Button></div><div className="divide-y divide-border border-y border-border">{questions.map(({question, answer}) => <details key={question} className="group py-5"><summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-base font-medium">{question}<Plus className="h-4 w-4 shrink-0 transition-transform group-open:rotate-45" /></summary><p className="mt-4 pr-6 text-sm leading-relaxed text-muted-foreground">{answer}</p></details>)}</div></div></section>
      <section className="bg-secondary px-6 py-16 md:px-10 md:py-20"><div className="mx-auto max-w-6xl text-center"><p className="text-xs uppercase tracking-widest text-muted-foreground">Your next chapter starts here</p><h2 className="minimal-section-title mt-4">More than your college name.<br /><span className="text-gold">Show what you’re made of.</span></h2><p className="mx-auto mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">One place for your learning, your work, your people, and the opportunities ahead.</p><Button asChild className="mt-7 h-12 px-6"><Link to="/dashboard">Find your next move <ArrowUpRight /></Link></Button></div></section>
    </MarketingLayout>
  );
}
