import { useState, useRef, useEffect, type FormEvent } from "react";
import {
  Search,
  MapPin,
  ArrowUpRight,
  BriefcaseBusiness,
  Send,
  Sparkles,
  ShieldCheck,
  GraduationCap,
  Wallet,
  FileCheck,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { opportunities, filterOpportunities, assistantReply } from "@/lib/talentbridge";
import { PageTitle } from "./shell";
export function OpportunitiesPage() {
  const [search, setSearch] = useState("");
  const [type, setType] = useState("All types");
  const [location, setLocation] = useState("All locations");
  const [selected, setSelected] = useState<(typeof opportunities)[number] | null>(null);
  const list = filterOpportunities(search, type, location);
  return (
    <>
      <PageTitle
        eyebrow="OPEN NEW DOORS"
        title="Explore opportunities"
        description="Discover what employment, learning and mentorship pathways could look like."
      />
      <div className="notice">
        All listings below are fictional demonstrations. They are not real vacancies or verified
        partnerships. Applications and live opportunity matching are not yet available.
      </div>
      <div className="filters">
        <div className="search-wrap">
          <Search size={18} />
          <input
            className="search-input"
            aria-label="Search opportunities"
            placeholder="Search by role, skill or professional field…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="field">
          <select
            aria-label="Opportunity type"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            {["All types", "Employment", "Mentorship", "Training", "Fellowship"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
        <div className="field">
          <select
            aria-label="Opportunity location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          >
            {["All locations", "Nairobi", "Kakuma", "Online"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </div>
      </div>
      <p className="text-xs text-muted-foreground mb-5" role="status">
        {list.length} demonstration {list.length === 1 ? "opportunity" : "opportunities"}
      </p>
      <div className="opportunity-grid">
        {list.map((o) => (
          <article className="opportunity" key={o.id}>
            <div className="opportunity-top">
              <span className="chip">{o.type}</span>
              <span className="demo-label">Demonstration</span>
            </div>
            <h2>{o.title}</h2>
            <p>{o.organization}</p>
            <div className="opportunity-meta">
              <span>
                <MapPin size={14} />
                {o.location}
              </span>
              <span>
                <BriefcaseBusiness size={14} />
                {o.mode}
              </span>
            </div>
            <p>{o.description}</p>
            <Button variant="outline" onClick={() => setSelected(o)}>
              View example <ArrowUpRight />
            </Button>
          </article>
        ))}
      </div>
      {list.length === 0 && (
        <div className="empty-state">
          <Search size={35} />
          <h2>No examples match these filters.</h2>
          <p>Try a broader search or choose a different type.</p>
          <Button
            variant="outline"
            onClick={() => {
              setSearch("");
              setType("All types");
              setLocation("All locations");
            }}
          >
            Clear filters
          </Button>
        </div>
      )}
      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="modal-body">
          <DialogTitle>{selected?.title || "Example opportunity"}</DialogTitle>
          <DialogDescription>Fictional demonstration · {selected?.type}</DialogDescription>
          <p>{selected?.description}</p>
          <p>
            <strong>Example pathway:</strong> Review your experience, prepare a CV that describes
            your self-reported skills, and check eligibility directly with any real provider you
            choose.
          </p>
          <div className="notice">
            This example has no application process, verified employer or closing date. No personal
            information is sent.
          </div>
          <Button variant="outline" onClick={() => setSelected(null)}>
            Close example
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
const guidance = [
  {
    icon: FileCheck,
    title: "Employment documentation",
    text: "Employers may request evidence of identity, qualifications, previous experience and work authorization. Requirements vary by role and individual circumstances.",
    bullets: [
      "Prepare a non-sensitive list of documents you have.",
      "Keep originals safe and avoid sharing them with unverified recruiters.",
      "Ask the employer what is required before sending documents.",
    ],
    url: "https://refugee.go.ke/",
    source: "Directorate of Refugee Services",
  },
  {
    icon: GraduationCap,
    title: "Credential recognition",
    text: "Recognition of foreign qualifications and permission to practice are separate processes. Regulated professions may have additional requirements.",
    bullets: [
      "Check recognition information with KNQA.",
      "Confirm registration requirements with your profession’s regulator.",
      "Ask about alternatives if qualification documents are missing.",
    ],
    url: "https://knqa.go.ke/",
    source: "Kenya National Qualifications Authority",
  },
  {
    icon: ShieldCheck,
    title: "Work authorization",
    text: "Your eligibility to work and required authorization depend on your situation. This prototype cannot determine your legal status or eligibility.",
    bullets: [
      "Check the current official requirements before accepting work.",
      "Seek a qualified legal adviser for advice on your circumstances.",
      "Do not treat this information as a permit or legal opinion.",
    ],
    url: "https://immigration.go.ke/",
    source: "Kenya Directorate of Immigration Services",
  },
  {
    icon: Wallet,
    title: "Financial access",
    text: "Banks and mobile money providers set identification and onboarding requirements. Access and eligibility must be confirmed with the provider.",
    bullets: [
      "Ask the provider which documents it currently accepts.",
      "Compare fees, account terms and protections before choosing.",
      "Never share your PIN, password or one-time code.",
    ],
    url: "https://www.centralbank.go.ke/",
    source: "Central Bank of Kenya",
  },
];
export function GuidancePage() {
  return (
    <>
      <PageTitle
        eyebrow="INFORMATION FOR YOUR NEXT STEP"
        title="Legal & financial guidance"
        description="A starting point for navigating work, qualifications and financial access in Kenya."
      />
      <div className="notice">
        <strong>General information — not verified legal or financial advice.</strong> This material
        has not been reviewed by a Kenyan legal professional. Requirements may change. Consult
        official sources and a qualified adviser for decisions about your circumstances. No
        institutional partnership is implied.
      </div>
      <div className="guidance-list">
        {guidance.map((g) => (
          <article className="guidance-item" key={g.title}>
            <div className="icon-box">
              <g.icon size={23} />
            </div>
            <h2>{g.title}</h2>
            <p>{g.text}</p>
            <ul>
              {g.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
            <a href={g.url} target="_blank" rel="noopener noreferrer">
              {g.source}
              <ArrowUpRight size={14} />
            </a>
          </article>
        ))}
      </div>
    </>
  );
}
export function AssistantPage() {
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      text: "Hello! What would you like to work on today? I can share sample guidance on CVs, interviews, credential recognition and your next career step. Please don’t share sensitive identification information.",
    },
  ]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const feed = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (feed.current) feed.current.scrollTop = feed.current.scrollHeight;
  }, [messages, busy]);
  async function send(text: string) {
    if (busy) return;
    const trimmed = text.trim();
    if (!trimmed) return;
    if (trimmed.length > 1000) {
      setError("Please keep your message under 1,000 characters.");
      return;
    }
    setError("");
    setInput("");
    setMessages((p) => [...p, { role: "user", text: trimmed }]);
    setBusy(true);
    await new Promise((r) => setTimeout(r, 650));
    setMessages((p) => [...p, { role: "assistant", text: assistantReply(trimmed) }]);
    setBusy(false);
  }
  function submit(e: FormEvent) {
    e.preventDefault();
    void send(input);
  }
  return (
    <>
      <PageTitle
        eyebrow="A LITTLE SUPPORT ALONG THE WAY"
        title="AI career assistant"
        description="A space to prepare, ask questions and explore your next step."
        action={
          <Button
            variant="outline"
            onClick={() => {
              setMessages([
                {
                  role: "assistant",
                  text: "Let’s start fresh. Ask about CV preparation, interviews, or credential recognition.",
                },
              ]);
              setError("");
            }}
            disabled={busy}
          >
            New conversation
          </Button>
        }
      />
      <div className="notice">
        Prototype conversation · Live AI is not connected. Replies are scripted examples, not
        personalized professional or legal advice. Conversations are not saved. Do not share
        identification numbers, financial details or documents.
      </div>
      <div className="chat-tool">
        <div className="chat-heading">
          <div className="icon-box">
            <Sparkles size={21} />
          </div>
          <div>
            <h2>TalentBridge career assistant</h2>
            <p>Scripted demonstration · Not live AI</p>
          </div>
        </div>
        <div
          className="messages"
          ref={feed}
          role="log"
          aria-live="polite"
          aria-label="Career conversation"
        >
          {messages.map((m, i) => (
            <div key={i} className={`message ${m.role}`}>
              <span className="sr-only">{m.role === "user" ? "You" : "Assistant"}: </span>
              {m.text}
            </div>
          ))}
          {busy && (
            <div className="message" role="status">
              Preparing a sample response…
            </div>
          )}
        </div>
        <div className="chat-suggestions">
          {[
            "Help me prepare for an interview",
            "How can I describe my qualifications?",
            "What should I include in my CV?",
          ].map((s) => (
            <Button variant="outline" disabled={busy} key={s} onClick={() => void send(s)}>
              {s}
              <ArrowRight />
            </Button>
          ))}
        </div>
        <form className="chat-form" onSubmit={submit}>
          <input
            className="chat-input"
            aria-label="Your message"
            maxLength={1000}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="What’s your next career question?"
            disabled={busy}
          />
          <Button
            type="submit"
            size="icon"
            aria-label="Send message"
            disabled={busy || !input.trim()}
          >
            <Send />
          </Button>
        </form>
        {error && (
          <p className="error px-5" role="alert">
            {error}
          </p>
        )}
      </div>
    </>
  );
}
