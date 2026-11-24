import { useEffect, useState, type FormEvent } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  Check,
  ClipboardCheck,
  ContactRound,
  UserRound,
  BriefcaseBusiness,
  Printer,
  Download,
  Route as RouteIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  completion,
  fields,
  emptyProfile,
  opportunities,
  questions,
  type Profile,
} from "@/lib/talentbridge";
import { useTalent } from "./store";
import { PageTitle, Logo } from "./shell";
export function Dashboard() {
  const { profile, assessment, demo } = useTalent();
  const percent = completion(profile);
  return (
    <>
      <PageTitle
        eyebrow="YOUR FUTURE STARTS WITH YOU"
        title={
          profile.name ? `Welcome, ${profile.name.split(" ")[0]}.` : "Welcome to your next chapter."
        }
        description="A little progress today. More possibilities tomorrow."
        action={
          <Button asChild variant="outline">
            <Link to="/profile">
              Edit profile <UserRound />
            </Link>
          </Button>
        }
      />
      <div className="dashboard-grid">
        <article className="metric">
          <div className="metric-top">
            Profile completion
            <UserRound size={20} />
          </div>
          <strong>{percent}%</strong>
          <div className="progress-track">
            <progress max={100} value={percent} aria-label="Profile completion" />
          </div>
          <p className="mt-3">
            {percent === 100
              ? "Your professional story is ready."
              : "Make your experience and strengths visible."}
          </p>
          <Link className="text-link" to="/profile">
            {percent === 100 ? "View your profile" : "Complete your profile"}{" "}
            <ArrowRight size={14} />
          </Link>
        </article>
        <article className="metric">
          <div className="metric-top">
            Skills assessment
            <ClipboardCheck size={20} />
          </div>
          <strong>{assessment ? `${assessment.score}%` : "Not started"}</strong>
          <p>
            {assessment
              ? `${assessment.competencies.length} foundational competencies demonstrated`
              : "Discover your foundational workplace strengths."}
            {demo && " · Sample result"}
          </p>
          <Link className="text-link" to="/assessment">
            {assessment ? "View assessment" : "Start assessment"} <ArrowRight size={14} />
          </Link>
        </article>
        <article className="metric">
          <div className="metric-top">
            Digital skills passport
            <ContactRound size={20} />
          </div>
          <strong>{profile.name ? "Ready to view" : "Build your profile"}</strong>
          <p>A printable snapshot of your experience and skills.</p>
          <Link className="text-link" to="/passport">
            Open skills passport <ArrowRight size={14} />
          </Link>
        </article>
      </div>
      <div className="dashboard-bottom">
        <section>
          <h2 className="subheading">Your next steps</h2>
          {[
            {
              icon: UserRound,
              title: "Tell your professional story",
              text:
                percent === 100 ? "Profile completed" : "Add your education, experience and skills",
              to: "/profile",
            },
            {
              icon: ClipboardCheck,
              title: "Explore your competencies",
              text: assessment
                ? "Preliminary assessment completed"
                : "Take a five-question preliminary assessment",
              to: "/assessment",
            },
            {
              icon: RouteIcon,
              title: "Make a plan for your future",
              text: "Identify a skill gap and your next learning step",
              to: "/roadmap",
            },
          ].map((s) => (
            <div className="list-row" key={s.title}>
              <div className="icon-box">
                <s.icon size={19} />
              </div>
              <div>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </div>
              <Button asChild variant="ghost" size="icon">
                <Link to={s.to as "/profile" | "/assessment" | "/roadmap"} aria-label={s.title}>
                  <ArrowRight />
                </Link>
              </Button>
            </div>
          ))}
        </section>
        <section>
          <h2 className="subheading">Opportunities to explore</h2>
          {opportunities
            .filter((o) => o.field === profile.occupation || o.field === "All fields")
            .slice(0, 3)
            .map((o) => (
              <div className="list-row" key={o.id}>
                <div className="icon-box">
                  <BriefcaseBusiness size={18} />
                </div>
                <div>
                  <h3>{o.title}</h3>
                  <p>
                    {o.type} · {o.location} · Demonstration
                  </p>
                </div>
              </div>
            ))}
          <Link className="text-link mt-5" to="/opportunities">
            View all example opportunities <ArrowRight size={14} />
          </Link>
        </section>
      </div>
      <div className="notice mt-8">
        Preliminary assessments are not officially recognized certifications. Your profile and
        assessment are saved only in this browser.
      </div>
    </>
  );
}
export function ProfilePage() {
  const { profile, saveProfile } = useTalent();
  const [form, setForm] = useState<Profile>(profile);
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  useEffect(() => {
    setForm(profile);
  }, [profile]);
  function update(key: keyof Profile, value: string) {
    setForm((p) => ({ ...p, [key]: value }));
    setMessage("");
  }
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (form.name.trim().length < 2) {
      setMessage("Please enter a name with at least two characters.");
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 350));
    if (
      saveProfile(
        Object.fromEntries(Object.entries(form).map(([k, v]) => [k, v.trim()])) as Profile,
      )
    )
      setMessage("Your professional profile has been saved in this browser.");
    setBusy(false);
  }
  return (
    <>
      <PageTitle
        eyebrow="MAKE YOUR EXPERIENCE VISIBLE"
        title="Professional profile"
        description="Your story is more than a certificate. Start with what you know."
      />
      <div className="notice">
        Only enter information you’re comfortable sharing on this device. Do not provide refugee
        identification numbers or upload documents.
      </div>
      <form onSubmit={submit}>
        <section className="form-section">
          <h2>About you</h2>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="name">Display name *</label>
              <input
                id="name"
                required
                minLength={2}
                maxLength={80}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="Your name"
              />
            </div>
            <div className="field">
              <label htmlFor="location">Location *</label>
              <input
                id="location"
                required
                maxLength={100}
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                placeholder="e.g. Nairobi, Kenya"
              />
            </div>
            <div className="field">
              <label htmlFor="languages">Languages *</label>
              <input
                id="languages"
                required
                maxLength={200}
                value={form.languages}
                onChange={(e) => update("languages", e.target.value)}
                placeholder="e.g. English, Swahili"
              />
            </div>
            <div className="field">
              <label htmlFor="occupation">Professional field *</label>
              <select
                id="occupation"
                required
                value={form.occupation}
                onChange={(e) => update("occupation", e.target.value)}
              >
                <option value="">Select your field</option>
                {fields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
          </div>
        </section>
        <section className="form-section">
          <h2>Education & experience</h2>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="education">Education or training *</label>
              <input
                id="education"
                required
                maxLength={200}
                value={form.education}
                onChange={(e) => update("education", e.target.value)}
                placeholder="Formal education, vocational or self-directed learning"
              />
            </div>
            <div className="field">
              <label htmlFor="experience">Years of experience *</label>
              <input
                id="experience"
                type="number"
                min={0}
                max={80}
                step={0.5}
                required
                value={form.experience}
                onChange={(e) => update("experience", e.target.value)}
                placeholder="0"
              />
            </div>
            <div className="field">
              <label htmlFor="skills">Professional skills *</label>
              <textarea
                id="skills"
                required
                maxLength={1000}
                value={form.skills}
                onChange={(e) => update("skills", e.target.value)}
                placeholder="e.g. Customer service, coding, project coordination"
              />
              <small>Separate your skills with commas. These are self-reported.</small>
            </div>
            <div className="field">
              <label htmlFor="documentation">Qualification documentation status *</label>
              <select
                id="documentation"
                required
                value={form.documentation}
                onChange={(e) => update("documentation", e.target.value)}
              >
                <option value="">Select your status</option>
                {[
                  "Documentation available",
                  "Some documentation available",
                  "Documentation unavailable",
                  "Prefer not to say",
                ].map((s) => (
                  <option key={s}>{s}</option>
                ))}
              </select>
              <small>No documents are requested or verified.</small>
            </div>
          </div>
        </section>
        <div className="form-actions">
          <Button type="submit" disabled={busy}>
            {busy ? "Saving…" : "Save professional profile"}
            <Check />
          </Button>
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setForm(profile);
              setMessage("Unsaved changes discarded.");
            }}
          >
            Discard changes
          </Button>
          <span className="success" role="status">
            {message}
          </span>
        </div>
      </form>
    </>
  );
}
export function PassportPage() {
  const { profile, assessment, demo } = useTalent();
  function download() {
    const text = `TALENTBRIDGE AI — DIGITAL SKILLS PASSPORT\n${demo ? "FICTIONAL DEMONSTRATION PROFILE\n" : ""}Name: ${profile.name}\nField: ${profile.occupation}\nLocation: ${profile.location}\nEducation (self-reported): ${profile.education}\nExperience (self-reported): ${profile.experience} years\nLanguages: ${profile.languages}\nDocumentation status (unverified): ${profile.documentation}\nSelf-reported skills: ${profile.skills}\nPreliminary assessment: ${assessment ? `${assessment.field}, ${assessment.score}% — ${assessment.competencies.join(", ")}` : "Not completed"}\nNOT an officially recognized certification. No credentials have been verified.\n`;
    const url = URL.createObjectURL(new Blob([text], { type: "text/plain" }));
    const a = document.createElement("a");
    a.href = url;
    a.download = "talentbridge-skills-passport.txt";
    a.click();
    URL.revokeObjectURL(url);
  }
  return (
    <>
      <PageTitle
        eyebrow="YOUR EXPERIENCE, TOGETHER"
        title="Digital skills passport"
        description="A clear, shareable summary of your professional journey."
        action={
          <div className="flex gap-2">
            <Button variant="outline" onClick={download} disabled={!profile.name}>
              <Download />
              Export
            </Button>
            <Button onClick={() => window.print()} disabled={!profile.name}>
              <Printer />
              Print passport
            </Button>
          </div>
        }
      />
      {!profile.name ? (
        <div className="empty-state">
          <ContactRound size={40} />
          <h2>Your passport starts with your story.</h2>
          <p>Complete your professional profile to create your skills passport.</p>
          <Button asChild>
            <Link to="/profile">
              Build your profile <ArrowRight />
            </Link>
          </Button>
        </div>
      ) : (
        <article className="passport">
          <div className="passport-header">
            <Logo />
            <div>
              <p className="eyebrow">DIGITAL SKILLS PASSPORT</p>
              <span className="demo-label">
                {demo ? "Fictional demonstration" : "Self-reported profile · Unverified"}
              </span>
            </div>
          </div>
          <h2>{profile.name}</h2>
          <p>
            {profile.occupation} · {profile.location}
          </p>
          <dl className="passport-details">
            <div>
              <dt>Education & training · Self-reported</dt>
              <dd>{profile.education || "Not provided"}</dd>
            </div>
            <div>
              <dt>Professional experience · Self-reported</dt>
              <dd>
                {profile.experience || "Not provided"}
                {profile.experience && " years"}
              </dd>
            </div>
            <div>
              <dt>Languages</dt>
              <dd>{profile.languages || "Not provided"}</dd>
            </div>
            <div>
              <dt>Documentation status · Unverified</dt>
              <dd>{profile.documentation || "Not provided"}</dd>
            </div>
          </dl>
          <h3>Self-reported professional skills</h3>
          <div className="chips">
            {profile.skills
              .split(",")
              .filter((s) => s.trim())
              .map((s, i) => (
                <span className="chip" key={`${s}-${i}`}>
                  {s.trim()}
                </span>
              ))}
          </div>
          <h3>Preliminary assessed competencies {demo && "· Sample results"}</h3>
          {assessment ? (
            <>
              <p>
                {assessment.field} · Foundational workplace assessment · {assessment.score}%
              </p>
              <div className="chips">
                {assessment.competencies.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            </>
          ) : (
            <p>Assessment not yet completed.</p>
          )}
          <div className="notice mt-7">
            This passport is a prototype summary, not an officially recognized certification.
            Education, experience and documentation have not been independently verified.
            Preliminary scores are not proof of professional qualification.
          </div>
        </article>
      )}
    </>
  );
}
export function RoadmapPage() {
  const { profile, assessment } = useTalent();
  const gaps = assessment
    ? questions.map((q) => q.skill).filter((s) => !assessment.competencies.includes(s))
    : [];
  return (
    <>
      <PageTitle
        eyebrow="SMALL STEPS. REAL DIRECTION."
        title="Your career roadmap"
        description={
          profile.occupation
            ? `A starting plan for your journey in ${profile.occupation.toLowerCase()}.`
            : "Build a practical plan around your experience and ambitions."
        }
      />
      <div className="notice">
        These rule-based recommendations are a starting point, not live AI advice. Training
        providers, eligibility and certification recognition must be checked independently.
      </div>
      {gaps.length > 0 && (
        <div>
          <h2 className="subheading">Areas to develop</h2>
          <div className="chips">
            {gaps.map((g) => (
              <span className="chip" key={g}>
                {g}
              </span>
            ))}
          </div>
        </div>
      )}
      {[
        {
          icon: UserRound,
          title: "Bring your experience into focus",
          text: profile.name
            ? `Review your ${profile.experience || "existing"} years of experience and choose a target role in ${profile.occupation || "your field"}. Add concrete project examples to a CV.`
            : "Complete your professional profile to make this starting plan more relevant to your goals.",
          to: "/profile",
          label: "Review your profile",
        },
        {
          icon: ClipboardCheck,
          title: assessment ? "Strengthen your next skill" : "Establish your starting point",
          text: assessment
            ? gaps.length
              ? `Prioritize ${gaps[0]?.toLowerCase()}. Choose an introductory course and practice with a small real-world project.`
              : "You demonstrated all foundational competencies in this short assessment. Look for deeper, field-specific learning and build a portfolio."
            : "Take the preliminary assessment to identify foundational strengths and areas for practice.",
          to: "/assessment",
          label: "Review your assessment",
        },
        {
          icon: RouteIcon,
          title: "Explore a recognized certification pathway",
          text:
            profile.occupation === "Healthcare"
              ? "Healthcare practice may require recognition and registration with the relevant Kenyan professional regulator. Confirm your profession’s current requirements before enrolling."
              : profile.occupation === "Technology & IT"
                ? "Explore recognized, entry-level IT certification options. Compare prerequisites, examination fees and employer relevance directly with the awarding body. The prototype does not issue certifications."
                : "Check KNQA and your profession’s regulator for recognition pathways. Confirm entry requirements, fees and recognition before committing to a course.",
          to: "/guidance",
          label: "Read recognition guidance",
        },
        {
          icon: BriefcaseBusiness,
          title: "Prepare for your next opportunity",
          text: "Develop a short CV, practice introducing yourself and identify mentors. Browse fictional example opportunities to understand different pathways; live applications are not available.",
          to: "/opportunities",
          label: "Explore example opportunities",
        },
      ].map((s, i) => (
        <article className="roadmap-step" key={s.title}>
          <div className="icon-box">
            <s.icon size={22} />
          </div>
          <div>
            <p className="eyebrow">STEP {i + 1}</p>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
            <Link
              className="text-link"
              to={s.to as "/profile" | "/assessment" | "/guidance" | "/opportunities"}
            >
              {s.label} <ArrowRight size={14} />
            </Link>
          </div>
        </article>
      ))}
    </>
  );
}
