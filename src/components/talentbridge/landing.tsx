import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  ShieldCheck,
  Globe2,
  ClipboardCheck,
  ContactRound,
  Route,
  BriefcaseBusiness,
  Sparkles,
  Check,
  GraduationCap,
  HeartHandshake,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { DemoButton } from "./shell";
import hero from "@/assets/talentbridge-workspace.png.asset.json";
const features = [
  {
    icon: ClipboardCheck,
    title: "Let your skills speak",
    text: "Show what you can do with practical, competency-based skills assessments.",
    link: "Discover your strengths",
    to: "/assessment",
  },
  {
    icon: ContactRound,
    title: "Your skills, in one place",
    text: "Bring your experience, education and competencies together in a digital skills passport.",
    link: "Explore the skills passport",
    to: "/passport",
  },
  {
    icon: Route,
    title: "A clearer way forward",
    text: "Turn your ambitions into a career roadmap, with steps to learn, grow and progress.",
    link: "Find your next step",
    to: "/roadmap",
  },
  {
    icon: BriefcaseBusiness,
    title: "Open new doors",
    text: "Explore employment, mentorship and learning pathways that fit your potential.",
    link: "Explore opportunities",
    to: "/opportunities",
  },
] as const;
export function Landing() {
  return (
    <main>
      <section className="hero">
        <img
          className="hero-img"
          src={hero.url}
          alt="A professional working confidently at a laptop in a bright Nairobi-style shared office"
        />
        <div className="hero-inner">
          <div className="hero-copy">
            <span className="hero-pill">
              <span>
                <Globe2 size={13} />
              </span>{" "}
              CONNECTING TALENT TO POSSIBILITY
            </span>
            <p className="hero-brand">TalentBridge AI</p>
            <h1>
              Your skills deserve
              <br />a world of opportunity.
            </h1>
            <p className="tagline">
              Skills without borders.
              <br />
              Opportunities without barriers.
            </p>
            <p className="hero-description">
              Your experience is valuable. We help skilled refugees in Kenya showcase their
              abilities, build confidence, and take the next step in their careers.
            </p>
            <div className="hero-buttons">
              <Button size="lg" asChild>
                <Link to="/register">
                  Start your journey <ArrowUpRight />
                </Link>
              </Button>
              <DemoButton variant="hero" />
            </div>
            <p className="hero-proof">
              <ShieldCheck size={15} /> Free to explore <span>·</span> No sensitive documents
              required
            </p>
          </div>
        </div>
        <span className="hero-caption">Illustrative AI-generated photograph</span>
      </section>
      <section className="impact-strip" aria-label="Our commitments">
        <div className="impact-inner">
          <p className="impact-intro">
            Talent is everywhere.
            <br />
            Opportunity should be, too.
          </p>
          <div className="impact-item">
            <ContactRound />
            <div>
              <strong>Skills over paperwork</strong>
              <span>Make your experience visible</span>
            </div>
          </div>
          <div className="impact-item">
            <HeartHandshake />
            <div>
              <strong>Built for inclusion</strong>
              <span>Your background is not a barrier</span>
            </div>
          </div>
          <div className="impact-item">
            <Globe2 />
            <div>
              <strong>Rooted in Kenya</strong>
              <span>Supporting your next chapter</span>
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">YOUR POTENTIAL. YOUR PATH.</p>
            <h2>More than qualifications. Real possibilities.</h2>
            <p>A place to turn the skills you already have into the future you want.</p>
          </div>
          <Button asChild variant="link">
            <Link to="/how-it-works">
              See how it works <ArrowRight />
            </Link>
          </Button>
        </div>
        <div className="feature-grid">
          {features.map((f) => (
            <article className="feature-card" key={f.title}>
              <div className="icon-box">
                <f.icon size={23} />
              </div>
              <h3>{f.title}</h3>
              <p>{f.text}</p>
              <Link className="text-link" to={f.to}>
                {f.link}
                <ArrowRight size={14} />
              </Link>
            </article>
          ))}
        </div>
      </section>
      <section className="band">
        <div className="section">
          <div className="section-heading">
            <div>
              <p className="eyebrow">SMALL STEPS. MEANINGFUL PROGRESS.</p>
              <h2>Your next chapter starts here.</h2>
              <p>
                Missing paperwork or a limited network should not make your experience invisible.
              </p>
            </div>
          </div>
          <div className="steps">
            <article>
              <span className="step-number">01 / TELL YOUR STORY</span>
              <h3>Build your professional profile</h3>
              <p>
                Share your education, experience and skills. Start with what you know, not the
                documents you don’t have.
              </p>
            </article>
            <article>
              <span className="step-number">02 / DISCOVER YOUR STRENGTHS</span>
              <h3>Explore your competencies</h3>
              <p>
                Try a preliminary skills assessment and bring your results together in a printable
                skills passport.
              </p>
            </article>
            <article>
              <span className="step-number">03 / MOVE FORWARD</span>
              <h3>Find your direction</h3>
              <p>
                Build a development plan, explore example opportunities, and prepare for the next
                step in your career.
              </p>
            </article>
          </div>
          <div className="notice" style={undefined}>
            This initial prototype offers local profile saving and preliminary assessments. Real
            sign-in, live AI, verified vacancies and official certification are not yet available.
          </div>
        </div>
      </section>
      <section className="section">
        <div className="section-heading">
          <div>
            <p className="eyebrow">PROGRESS THAT INCLUDES EVERYONE</p>
            <h2>A better future, together.</h2>
            <p>Our purpose aligns with the United Nations Sustainable Development Goals.</p>
          </div>
          <GraduationCap size={36} className="text-primary" />
        </div>
        <div className="sdg-strip">
          {[
            ["4", "Quality Education"],
            ["8", "Decent Work & Economic Growth"],
            ["10", "Reduced Inequalities"],
            ["16", "Peace, Justice & Strong Institutions"],
            ["17", "Partnerships for the Goals"],
          ].map(([n, t]) => (
            <span className="sdg-badge" key={n}>
              <strong>SDG {n}</strong>
              {t}
            </span>
          ))}
        </div>
      </section>
      <section className="cta-band">
        <div className="section cta-inner">
          <div>
            <h2>Your experience matters. Let’s build on it.</h2>
            <p>Take the first step toward a career that reflects your potential.</p>
          </div>
          <Button size="lg" asChild>
            <Link to="/register">
              Get started <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </main>
  );
}
export function HowItWorks() {
  return (
    <main className="section">
      <p className="eyebrow">FROM EXPERIENCE TO POSSIBILITY</p>
      <h1>How TalentBridge AI works</h1>
      <p className="text-muted-foreground">
        A practical starting point for skilled refugees in Kenya.
      </p>
      <div className="steps">
        <article>
          <span className="step-number">01</span>
          <h2>Build your profile</h2>
          <p>
            Enter your education, professional field, experience, languages and self-reported
            skills. Only describe your documentation status; never upload sensitive documents.
          </p>
          <Link to="/profile" className="text-link">
            Build your profile <ArrowRight size={15} />
          </Link>
        </article>
        <article>
          <span className="step-number">02</span>
          <h2>Explore your strengths</h2>
          <p>
            Answer five foundational workplace questions. This transparent, rule-based prototype is
            not a professional field-specific test or a recognized certification.
          </p>
          <Link to="/assessment" className="text-link">
            Try an assessment <ArrowRight size={15} />
          </Link>
        </article>
        <article>
          <span className="step-number">03</span>
          <h2>Plan your next step</h2>
          <p>
            Print a summary of your skills, follow a development roadmap, and explore clearly
            labeled fictional opportunities.
          </p>
          <Link to="/dashboard" className="text-link">
            Open your workspace <ArrowRight size={15} />
          </Link>
        </article>
      </div>
      <div className="notice mt-10">
        Your information stays in this browser. No account is created. Authentication, a shared
        database, live AI assessment, verified opportunities and institutional verification are
        future integrations.
      </div>
      <DemoButton />
    </main>
  );
}
