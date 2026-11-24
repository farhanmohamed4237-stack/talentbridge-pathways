import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "@tanstack/react-router";
import { ArrowRight, UserRound, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTalent } from "./store";
import { DemoButton } from "./shell";
export function RegistrationPage() {
  const { profile, saveProfile } = useTalent();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [accepted, setAccepted] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    if (name.trim().length < 2 || password.length < 8 || !accepted) {
      setError(
        "Enter your name, an email, a password of at least 8 characters, and accept the prototype notice.",
      );
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 350));
    if (saveProfile({ ...profile, name: name.trim() })) {
      setPassword("");
      setEmail("");
      await navigate({ to: "/profile" });
    }
    setBusy(false);
  }
  return (
    <main className="auth-page">
      <div className="auth-panel">
        <div className="icon-box">
          <UserRound />
        </div>
        <p className="eyebrow">YOUR NEXT CHAPTER</p>
        <h1>Start your journey.</h1>
        <p>Your experience deserves to be seen. Let’s take the first step.</p>
        <div className="notice">
          Registration preview only. No account is created, and your email and password are not
          saved or sent. Continuing saves only your display name on this device.
        </div>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="register-name">Display name</label>
            <input
              id="register-name"
              required
              minLength={2}
              maxLength={80}
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="nickname"
              placeholder="Your name"
            />
          </div>
          <div className="field">
            <label htmlFor="register-email">Email address · Preview only</label>
            <input
              id="register-email"
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="register-password">Password · Preview only</label>
            <input
              id="register-password"
              required
              type="password"
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="new-password"
              placeholder="At least 8 characters"
            />
          </div>
          <label className="flex gap-2 text-xs text-muted-foreground items-start mb-5">
            <input
              type="checkbox"
              required
              checked={accepted}
              onChange={(e) => setAccepted(e.target.checked)}
            />
            I understand this is a local prototype, not a secure user account. I will not enter
            sensitive information.
          </label>
          {error && (
            <p role="alert" className="error text-xs">
              {error}
            </p>
          )}
          <Button type="submit" disabled={busy}>
            {busy ? "Preparing your profile…" : "Continue to my profile"}
            <ArrowRight />
          </Button>
        </form>
        <p className="auth-switch">
          Already exploring? <Link to="/login">Log in preview</Link>
        </p>
        <div className="auth-demo">
          <DemoButton />
        </div>
      </div>
    </main>
  );
}
export function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  async function submit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    await new Promise((r) => setTimeout(r, 350));
    setPassword("");
    setMessage(
      "Sign-in is not connected yet. No credentials were sent. Open your saved workspace or explore the demonstration below.",
    );
    setBusy(false);
  }
  return (
    <main className="auth-page">
      <div className="auth-panel">
        <div className="icon-box">
          <ShieldCheck />
        </div>
        <p className="eyebrow">WELCOME BACK</p>
        <h1>Continue your journey.</h1>
        <p>A new opportunity starts with your next step.</p>
        <div className="notice">
          Sign-in preview · Authentication and password recovery are not implemented. Email and
          password are not stored or sent.
        </div>
        <form onSubmit={submit}>
          <div className="field">
            <label htmlFor="login-email">Email address</label>
            <input
              id="login-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              placeholder="you@example.com"
            />
          </div>
          <div className="field">
            <label htmlFor="login-password">Password</label>
            <input
              id="login-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              placeholder="Your password"
            />
          </div>
          <Button type="submit" disabled={busy}>
            {busy ? "Checking preview…" : "Preview sign-in"}
            <ArrowRight />
          </Button>
          {message && (
            <p className="notice mt-4" role="status">
              {message}
            </p>
          )}
        </form>
        <p className="auth-switch">
          New to TalentBridge? <Link to="/register">Get started</Link>
        </p>
        <div className="auth-demo">
          <Button asChild variant="outline">
            <Link to="/dashboard">
              Open saved workspace <ArrowRight />
            </Link>
          </Button>
          <div className="mt-3">
            <DemoButton />
          </div>
        </div>
      </div>
    </main>
  );
}
