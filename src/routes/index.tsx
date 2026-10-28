import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowRight, Users, FolderGit2, Briefcase, Rocket, Check } from "lucide-react";
import { MarketingLayout } from "@/components/marketing-layout";
import { Button } from "@/components/ui/button";
import { FeaturedBlogsSection } from "@/components/featured-blogs";
import { motion } from "motion/react";
import studentBuilders from "@/assets/student-builders.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tier2X — Off-campus jobs & alumni intros for Tier-2/3 students" },
      {
        name: "description",
        content:
          "Off-campus drives, alumni intros and proof-of-work for students at India's Tier-2 and Tier-3 engineering colleges.",
      },
      { name: "keywords", content: "off campus jobs India, tier 2 college placements, alumni referral, fresher jobs, Tier2X, Suman Kumar" },
      { property: "og:title", content: "Tier2X — Off-campus jobs & alumni intros for Tier-2/3 students" },
      { property: "og:description", content: "Off-campus drives, alumni intros and proof-of-work for the ~3,900 Indian engineering colleges that aren't IITs." },
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

const paths = [
  { number: "01", icon: Briefcase, title: "Find your opportunity.", body: "Off-campus jobs, internships, and hackathons. Explore what’s next, beyond your placement cell.", to: "/jobs", label: "Explore opportunities" },
  { number: "02", icon: Users, title: "Build your network.", body: "Meet peers who share your skills and ambitions. Connect with alumni who’ve been where you are.", to: "/discover", label: "Meet the community" },
  { number: "03", icon: FolderGit2, title: "Show what you can do.", body: "Bring your projects, live demos, and GitHub repos together. Let your work make the introduction.", to: "/projects", label: "Explore projects" },
] as const;

function Landing() {
  return (
    <MarketingLayout>
      <section className="minimal-hero">
        <div className="mx-auto max-w-6xl px-6 py-12 md:px-10 md:py-16">
          <p className="mb-6 text-xs font-medium uppercase tracking-widest text-muted-foreground">India’s student builder workspace</p>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} className="minimal-headline">Tier2X.<br />Beyond your campus.<br /><span className="text-gold">Closer to what’s next.</span></motion.h1>
          <div className="mt-10 grid items-start gap-10 md:grid-cols-[0.9fr_1.3fr] md:gap-16">
            <div className="pb-2 md:pt-3">
              <p className="max-w-md text-base leading-relaxed text-muted-foreground md:text-lg">Off-campus opportunities, alumni introductions, and a place to show your work — for students at India’s Tier-2 and Tier-3 colleges.</p>
              <Button asChild variant="outline" className="mt-8 h-12 rounded-full border-border bg-transparent px-6 text-foreground hover:bg-secondary hover:text-secondary-foreground"><Link to="/dashboard">Get early access <ArrowUpRight /></Link></Button>
              <p className="mt-8 flex items-center gap-2 text-xs text-muted-foreground"><Check className="h-4 w-4 text-gold" /> By a student. For student builders.</p>
            </div>
            <motion.figure initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.9, delay: 0.2, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }} className="relative m-0">
              <img src={studentBuilders} alt="Indian student builders collaborating on a laptop project" width={1536} height={1024} className="aspect-[16/9] w-full rounded-lg object-cover" />
              <figcaption className="mt-3 flex items-center justify-between gap-4 text-xs text-muted-foreground"><span>Build something that opens doors.</span><span className="text-gold">Opportunity starts here ↗</span></figcaption>
            </motion.figure>
          </div>
        </div>
      </section>

      <section className="px-6 py-20 md:px-10 md:py-28">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-6 md:grid-cols-[1.1fr_0.9fr] md:gap-20">
            <h2 className="minimal-section-title">Your college is a starting point.<br /><span className="text-muted-foreground">Not your limit.</span></h2>
            <div className="md:pt-2"><p className="text-base leading-relaxed text-muted-foreground md:text-lg">Great work can come from any campus. Tier2X brings opportunities, people, and proof-of-work into one place — so you can focus on moving forward.</p><Button asChild variant="link" className="mt-5 h-auto p-0 text-foreground"><Link to="/how-it-works">See how it works <ArrowRight /></Link></Button></div>
          </div>
          <div className="mt-16 grid md:grid-cols-3">
            {paths.map(({ number, icon: Icon, title, body, to, label }, i) => <motion.article key={number} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.6, delay: i * 0.1 }} className="minimal-path">
              <div className="flex items-center justify-between"><span className="font-mono text-xs text-muted-foreground">{number}</span><Icon className="h-6 w-6 text-foreground" strokeWidth={1.5} /></div>
              <h3 className="mt-10 text-2xl font-medium">{title}</h3><p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">{body}</p>
              <Button asChild variant="link" className="mt-7 h-auto justify-start p-0 text-sm text-foreground"><Link to={to}>{label} <ArrowUpRight /></Link></Button>
            </motion.article>)}
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-surface px-6 py-20 md:px-10 md:py-24">
        <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2 md:gap-24">
          <div><p className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Less scrolling. More shipping.</p><h2 className="minimal-section-title mt-5">Make your next<br />move count.</h2><Button asChild className="mt-8 h-12 rounded-full px-6 shadow-none"><Link to="/dashboard">Enter Tier2X <ArrowUpRight /></Link></Button></div>
          <div className="divide-y divide-border">
            {[
              { icon: FolderGit2, title: "A portfolio, not just a profile.", text: "Share the projects you’ve actually built.", to: "/devprofile" },
              { icon: Users, title: "People who get your journey.", text: "Find collaborators, peers, and alumni.", to: "/for-alumni" },
              { icon: Rocket, title: "An idea worth building.", text: "Find teammates and take your startup forward.", to: "/startups" },
            ].map(({ icon: Icon, title, text, to }) => <Link key={title} to={to} className="group flex items-start gap-5 py-7 first:pt-0"><Icon className="mt-1 h-5 w-5 shrink-0" strokeWidth={1.5} /><div className="flex-1"><h3 className="text-lg font-medium">{title}</h3><p className="mt-2 text-sm text-muted-foreground">{text}</p></div><ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></Link>)}
          </div>
        </div>
      </section>
      <FeaturedBlogsSection />
      <section className="px-6 py-20 text-center md:px-10 md:py-28"><p className="text-xs uppercase tracking-widest text-muted-foreground">From Purnia. For every campus.</p><h2 className="minimal-section-title mt-5">Your next chapter<br />starts with a small step.</h2><Button asChild className="mt-8 h-12 rounded-full px-7 shadow-none"><Link to="/dashboard">Let’s get started <ArrowUpRight /></Link></Button></section>
    </MarketingLayout>
  );
}
