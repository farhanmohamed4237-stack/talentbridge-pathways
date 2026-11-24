import { Link, useLocation } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Menu,
  X,
  Globe2,
  LayoutDashboard,
  UserRound,
  ClipboardCheck,
  ContactRound,
  Route as RouteIcon,
  BriefcaseBusiness,
  ShieldCheck,
  Sparkles,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTalent } from "./store";
export function Logo() {
  return (
    <Link to="/" className="brand" aria-label="TalentBridge AI home">
      <span className="logo-mark">
        <svg viewBox="0 0 32 32" fill="none" aria-hidden="true">
          <path
            d="M5 24V13C5 4 27 4 27 13V24M5 15H27M11 15V25M21 15V25"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
          />
          <path d="M3 25H29" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
        </svg>
      </span>
      <span>
        TalentBridge<span className="brand-ai"> AI</span>
      </span>
    </Link>
  );
}
export const appNav = [
  { to: "/dashboard", label: "Overview", icon: LayoutDashboard },
  { to: "/profile", label: "Professional profile", icon: UserRound },
  { to: "/assessment", label: "Skills assessment", icon: ClipboardCheck },
  { to: "/passport", label: "Skills passport", icon: ContactRound },
  { to: "/roadmap", label: "Career roadmap", icon: RouteIcon },
  { to: "/opportunities", label: "Opportunities", icon: BriefcaseBusiness },
  { to: "/guidance", label: "Legal & financial guidance", icon: ShieldCheck },
  { to: "/assistant", label: "Career assistant", icon: Sparkles },
] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  return (
    <header className="site-header">
      <div className="header-inner">
        <Logo />
        <nav className="desktop-nav" aria-label="Main navigation">
          <Link to="/" activeProps={{ className: "nav-active" }} activeOptions={{ exact: true }}>
            Home
          </Link>
          <Link to="/how-it-works" activeProps={{ className: "nav-active" }}>
            How it works
          </Link>
          <Link to="/opportunities" activeProps={{ className: "nav-active" }}>
            Opportunities
          </Link>
          <Link to="/guidance" activeProps={{ className: "nav-active" }}>
            Resources
          </Link>
        </nav>
        <div className="header-actions">
          <Button variant="ghost" asChild>
            <Link to="/login">Log in</Link>
          </Button>
          <Button asChild>
            <Link to="/register">
              Get started <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </Button>
      </div>
      {open && (
        <nav className="mobile-nav" aria-label="Mobile navigation">
          {[
            { to: "/" as const, label: "Home" },
            { to: "/how-it-works" as const, label: "How it works" },
            ...appNav,
            { to: "/login" as const, label: "Log in" },
            { to: "/register" as const, label: "Get started" },
          ].map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={() => setOpen(false)}
              aria-current={pathname === n.to ? "page" : undefined}
            >
              {n.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Logo />
        <p>Skills without borders. Opportunities without barriers.</p>
        <span>
          <Globe2 size={15} /> Built for inclusion. Designed for Kenya.
        </span>
      </div>
      <div className="footer-bottom">
        <span>© 2026 TalentBridge AI</span>
        <span>Initial prototype · Not an official certification service</span>
      </div>
    </footer>
  );
}
export function Workspace({ children }: { children: React.ReactNode }) {
  const { profile, demo, clear, error, ready } = useTalent();
  return (
    <div className="workspace">
      <aside className="sidebar">
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <nav aria-label="Workspace navigation">
          {appNav.map((n) => (
            <Link key={n.to} to={n.to} activeProps={{ className: "selected" }}>
              <n.icon size={19} />
              {n.label}
              {n.to === "/assistant" && <span className="tiny-label">BETA</span>}
            </Link>
          ))}
        </nav>
        <div className="sidebar-note">
          <Globe2 />
          <strong>Potential has no borders.</strong>
          <p>Your experience matters. Let’s make it visible.</p>
        </div>
      </aside>
      <main className="workspace-main">
        <div className="workspace-top">
          <span>My workspace</span>
          <span className="user-chip">
            <UserRound size={15} />
            {profile.name || "Your career journey"}
          </span>
        </div>
        {demo && (
          <div className="notice demo-notice">
            <span>Demonstration mode · You’re exploring a fictional sample profile.</span>
            <Button size="sm" variant="ghost" onClick={clear}>
              Exit demo <X />
            </Button>
          </div>
        )}
        {error && (
          <div className="notice error" role="alert">
            {error}
          </div>
        )}
        {ready ? children : <p role="status">Loading your workspace…</p>}
      </main>
    </div>
  );
}
export function PageTitle({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string;
  title: string;
  description: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="page-title">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
      {action}
    </div>
  );
}
export function DemoButton({ variant = "outline" }: { variant?: "outline" | "ghost" | "hero" }) {
  const { startDemo } = useTalent();
  return (
    <Button variant={variant} asChild>
      <Link to="/dashboard" onClick={startDemo}>
        Explore demo <ArrowRight />
      </Link>
    </Button>
  );
}
