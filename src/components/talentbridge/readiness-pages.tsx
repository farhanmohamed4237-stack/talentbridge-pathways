import { ArrowUpRight, ListChecks, Wallet, GraduationCap, AlertTriangle, Building2, Users, Scale, ContactRound, Search } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageTitle } from "./shell";
import { useTalent } from "./store";
import {
  readinessItems,
  financialItems,
  statusOptions,
  credentialOptions,
  checklistPercent,
  outstanding,
  type ItemStatus,
  type CredentialStatus,
} from "@/lib/readiness";

function Checklist({
  label,
  items,
  map,
  onChange,
}: {
  label: string;
  items: readonly { id: string; title: string; action: string }[];
  map: Record<string, ItemStatus>;
  onChange: (id: string, s: ItemStatus) => void;
}) {
  const percent = checklistPercent(map, items.map((i) => i.id));
  const todo = outstanding(items, map);
  return (
    <>
      <div className="readiness-progress">
        <div className="metric-top">
          <span>{label} · self-reported completion</span>
          <strong>{percent}%</strong>
        </div>
        <div className="progress-track">
          <progress max={100} value={percent} aria-label={`${label} completion`} />
        </div>
      </div>
      <ul className="readiness-list">
        {items.map((item) => (
          <li className="readiness-row" key={item.id}>
            <div>
              <h3>{item.title}</h3>
              <p>{item.action}</p>
            </div>
            <div className="field">
              <select
                aria-label={`Status: ${item.title}`}
                value={map[item.id] ?? "not-started"}
                onChange={(e) => onChange(item.id, e.target.value as ItemStatus)}
              >
                {statusOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </li>
        ))}
      </ul>
      <h3 className="subheading mt-6">Outstanding actions ({todo.length})</h3>
      {todo.length === 0 ? (
        <p>No outstanding actions in this checklist.</p>
      ) : (
        <ul className="list-disc pl-5 space-y-1">
          {todo.map((t) => (
            <li key={t.id}>{t.action}</li>
          ))}
        </ul>
      )}
    </>
  );
}

export function ReadinessPage() {
  const { readiness, saveReadiness } = useTalent();
  const set = (patch: Partial<typeof readiness>) => saveReadiness({ ...readiness, ...patch });
  return (
    <>
      <PageTitle
        eyebrow="GET READY, STEP BY STEP"
        title="Employment readiness centre"
        description="Track your preparation for work, qualifications and payments in one place."
      />
      <div className="notice">
        <strong>Self-reported progress only.</strong> Completing this checklist does not confirm
        legal status, work authorization, credential recognition or eligibility for any job or
        financial service. Nothing here is verified or reviewed by a legal professional. Progress is
        saved only in this browser. Do not enter ID numbers, account numbers or documents.
      </div>

      <section className="form-section">
        <h2>
          <ListChecks size={20} className="inline mr-2" />
          Employment readiness checklist
        </h2>
        <Checklist
          label="Employment readiness"
          items={readinessItems}
          map={readiness.checklist}
          onChange={(id, s) => set({ checklist: { ...readiness.checklist, [id]: s } })}
        />
      </section>

      <section className="form-section">
        <h2>
          <GraduationCap size={20} className="inline mr-2" />
          Credential recognition tracker
        </h2>
        <div className="field max-w-md">
          <label htmlFor="credential-status">Your qualification recognition status (self-reported)</label>
          <select
            id="credential-status"
            value={readiness.credential}
            onChange={(e) => set({ credential: e.target.value as CredentialStatus | "" })}
          >
            <option value="">Choose a status</option>
            {credentialOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
          <small>This status is unverified and is not proof of recognition.</small>
        </div>
        <h3 className="subheading mt-6">Practical steps to explore</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            Visit the{" "}
            <a className="text-link inline" href="https://knqa.go.ke/" target="_blank" rel="noopener noreferrer">
              Kenya National Qualifications Authority (KNQA)
            </a>{" "}
            website for its current process for recognising foreign qualifications.
          </li>
          <li>
            For regulated professions (for example health, engineering, law or teaching), ask the
            relevant Kenyan professional body which registration steps apply to you. Recognition of a
            qualification and permission to practise can be separate processes.
          </li>
          <li>If documents are missing, ask the institution whether alternative evidence is accepted.</li>
          <li>Keep a private record of dates and contacts. Never pay unofficial agents for “guaranteed” recognition.</li>
        </ul>
      </section>

      <section className="form-section">
        <h2>
          <Wallet size={20} className="inline mr-2" />
          Financial readiness
        </h2>
        <div className="guidance-list">
          <article className="guidance-item">
            <h3>Mobile money and banking</h3>
            <p>Mobile money providers and banks each set their own onboarding and document rules. Ask each provider directly and compare fees.</p>
          </article>
          <article className="guidance-item">
            <h3>Receiving work payments</h3>
            <p>Ask employers and remote-work platforms which payment methods they support, how long transfers take and what fees apply.</p>
          </article>
          <article className="guidance-item">
            <h3>Provider documentation</h3>
            <p>Requirements can change. Confirm the current list with the provider or the{" "}
              <a className="text-link inline" href="https://www.centralbank.go.ke/" target="_blank" rel="noopener noreferrer">Central Bank of Kenya</a>.</p>
          </article>
          <article className="guidance-item">
            <h3>Basic financial literacy</h3>
            <p>Track income and spending, keep a small emergency fund and read loan terms carefully before borrowing.</p>
          </article>
        </div>
        <div className="notice mt-6">
          <AlertTriangle size={16} className="inline mr-1" />
          <strong>Scam warning signs:</strong> paying a fee to get a job, requests for your PIN,
          password or one-time code, pressure to act immediately, offers that sound too good to be
          true, or payments asked to personal numbers. Real employers do not charge you to apply.
        </div>
        <Checklist
          label="Financial readiness"
          items={financialItems}
          map={readiness.financial}
          onChange={(id, s) => set({ financial: { ...readiness.financial, [id]: s } })}
        />
        <p className="text-xs text-muted-foreground mt-4">
          TalentBridge AI does not process payments, collect financial details or guarantee access to
          any financial service.
        </p>
      </section>

      <section className="form-section">
        <h2>Share in your passport</h2>
        <label className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={readiness.includeInPassport}
            onChange={(e) => set({ includeInPassport: e.target.checked })}
          />
          Include my self-reported readiness summary in my Digital Skills Passport
        </label>
        <div className="flex flex-wrap gap-3 mt-5">
          <Button variant="outline" asChild>
            <Link to="/passport">View passport</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/roadmap">View career roadmap</Link>
          </Button>
        </div>
      </section>
    </>
  );
}

const candidates = [
  {
    name: "Example candidate A",
    field: "Healthcare",
    summary: "Six years as a clinical nurse. Languages: English, Swahili, Arabic. Recognition reported as in progress.",
    skills: ["Patient care", "Record keeping", "Teamwork"],
  },
  {
    name: "Example candidate B",
    field: "Technology & IT",
    summary: "Four years in network support and help-desk roles. Languages: English, French, Kinyarwanda.",
    skills: ["Technical support", "Networking", "Problem solving"],
  },
  {
    name: "Example candidate C",
    field: "Business & Administration",
    summary: "Eight years in procurement and office management. Languages: English, Somali, Swahili.",
    skills: ["Procurement", "Budgeting", "Communication"],
  },
];

export function EmployerHubPage() {
  const sections = [
    { icon: Users, title: "Why recruit skilled displaced professionals", text: "Candidates may bring professional experience, multiple languages, adaptability and perspectives from different work environments. Assess each person on their individual skills." },
    { icon: ContactRound, title: "Reading the Digital Skills Passport", text: "The passport is a self-reported summary. Preliminary assessment scores come from a short online quiz and are not certifications. Use it as a conversation starter, not as proof of qualification." },
    { icon: Search, title: "Competency-based, inclusive recruitment", text: "Use structured interviews, practical work samples and consistent criteria. Offer flexibility on document formats where lawful, and accept alternative evidence of experience when appropriate." },
    { icon: GraduationCap, title: "Responsible verification", text: "Verify credentials and work authorization through official channels such as KNQA, professional regulators and government authorities. Only ask for documents you genuinely need, store them securely and seek legal advice on your obligations." },
    { icon: Scale, title: "Fair recruitment and non-discrimination", text: "Never charge candidates recruitment fees. Do not reject candidates on nationality or refugee status alone where the law does not require it. Keep personal information confidential." },
  ];
  return (
    <>
      <PageTitle
        eyebrow="FOR EMPLOYERS, NGOS AND HIRING PARTNERS"
        title="Employer hub"
        description="Practical guidance for fair, skills-first recruitment of displaced professionals in Kenya."
      />
      <div className="notice">
        General information only — not legal advice. TalentBridge AI has no official partnerships and
        does not verify candidates, credentials or work authorization.
      </div>
      <div className="guidance-list">
        {sections.map((s) => (
          <article className="guidance-item" key={s.title}>
            <div className="icon-box">
              <s.icon size={23} />
            </div>
            <h2>{s.title}</h2>
            <p>{s.text}</p>
          </article>
        ))}
      </div>
      <h2 className="subheading mt-10">
        <Building2 size={18} className="inline mr-2" />
        Example candidate profiles
      </h2>
      <div className="opportunity-grid">
        {candidates.map((c) => (
          <article className="opportunity" key={c.name}>
            <div className="opportunity-top">
              <span className="chip">{c.field}</span>
              <span className="demo-label">Fictional demonstration</span>
            </div>
            <h2>{c.name}</h2>
            <p>{c.summary}</p>
            <div className="chips">
              {c.skills.map((s) => (
                <span className="chip" key={s}>{s}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
      <p className="text-xs text-muted-foreground mt-4">
        These are invented examples, not real people or available candidates.{" "}
        <a className="text-link inline" href="https://refugee.go.ke/" target="_blank" rel="noopener noreferrer">
          Directorate of Refugee Services <ArrowUpRight size={12} className="inline" />
        </a>
      </p>
    </>
  );
}
