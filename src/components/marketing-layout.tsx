import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";

const navLinks = [
  { to: "/", label: "Home" },
  { to: "/how-it-works", label: "How it works" },
  { to: "/pricing", label: "Pricing" },
  { to: "/for-alumni", label: "For Alumni" },
  { to: "/colleges", label: "Colleges" },
  { to: "/blog", label: "Blog" },
] as const;

const featureLinks = [
  { to: "/features", label: "All Features" },
  { to: "/prep", label: "Prep Roadmap" },
  { to: "/jobs", label: "Off-Campus Jobs" },
  { to: "/hackathons", label: "Hackathons" },
  { to: "/applications", label: "Application Tracker" },
  { to: "/alumni", label: "Alumni Referrals" },
  { to: "/rooms", label: "Peer Rooms" },
  { to: "/devprofile", label: "Dev Report Card" },
] as const;

const footerLinks = [
  { to: "/about", label: "About Us" },
  { to: "/privacy", label: "Privacy Policy" },
  { to: "/terms", label: "Terms & Conditions" },
  { to: "/disclaimer", label: "Disclaimer" },
] as const;

export function MarketingLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);
  return (
    <div className="minimal-marketing min-h-screen bg-background text-foreground">
      <header className="relative z-50 mx-auto flex max-w-6xl items-center justify-between gap-5 bg-background px-6 py-5 md:px-10 md:py-6">
        <Link to="/" className="shrink-0 text-2xl font-semibold" aria-label="Tier2X home">Tier2X<span className="text-muted-foreground">.</span></Link>
        <nav aria-label="Main navigation" className="hidden items-center gap-6 lg:flex">{navLinks.slice(1).map(l => <Link key={l.to} to={l.to} activeProps={{ className: "text-foreground" }} className="text-xs text-muted-foreground transition-colors hover:text-foreground">{l.label}</Link>)}</nav>
        <div className="flex items-center gap-3 md:gap-5"><Link to="/auth" className="hidden text-sm text-muted-foreground hover:text-foreground md:block">Log in</Link><Button asChild className="h-10 rounded-full px-4 text-xs shadow-none md:px-5 md:text-sm"><Link to="/auth">Get early access <ArrowUpRight /></Link></Button><Button variant="ghost" size="icon" className="shrink-0 lg:hidden" onClick={() => setOpen(v => !v)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open} aria-controls="mobile-navigation">{open ? <X /> : <Menu />}</Button></div>
      </header>
      {open && <nav id="mobile-navigation" aria-label="Mobile navigation" className="absolute inset-x-0 top-20 z-40 max-h-[80vh] overflow-y-auto border-b border-border bg-background px-6 py-5 shadow-lg lg:hidden"><div className="mx-auto max-w-6xl">{navLinks.map(l => <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="flex items-center justify-between border-b border-border py-4 text-base">{l.label}<ArrowUpRight className="h-4 w-4" /></Link>)}<Link to="/auth" onClick={() => setOpen(false)} className="block py-4 text-muted-foreground">Log in</Link></div></nav>}
      <main>{children}</main>
      <footer className="border-t border-border px-6 pb-7 pt-14 md:px-10">
        <div className="mx-auto max-w-6xl"><div className="grid gap-10 md:grid-cols-[2fr_1fr_1fr_1fr]">
          <div><Link to="/" className="text-3xl font-semibold">Tier2X.</Link><p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">A workspace for India’s student builders.<br />Opportunities. People. Proof-of-work.</p><a href="mailto:campusx4@gmail.com" className="mt-5 inline-block text-sm text-muted-foreground hover:text-foreground">campusx4@gmail.com</a><p className="mt-2 text-xs text-muted-foreground">Purnia, Bihar, India</p></div>
          {[{title:"Explore",links:navLinks.slice(1)},{title:"Workspace",links:featureLinks},{title:"Information",links:footerLinks}].map(group => <div key={group.title}><h2 className="mb-5 text-xs font-medium text-foreground">{group.title}</h2><ul className="space-y-3">{group.links.map(l => <li key={l.to}><Link to={l.to} className="text-xs text-muted-foreground hover:text-foreground">{l.label}</Link></li>)}</ul></div>)}
        </div><div className="mt-14 flex flex-wrap justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground"><span>© {new Date().getFullYear()} Tier2X</span><span>Build beyond your campus.</span></div></div>
      </footer>
    </div>
  );
}
