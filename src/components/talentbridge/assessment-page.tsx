import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { ArrowRight, ArrowLeft, Check, ClipboardCheck, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fields, questions, type Assessment } from "@/lib/talentbridge";
import { assessmentLabel, privateAssessmentContext, type Quiz } from "@/lib/assessment";
import { generateAssessment, finishAssessment } from "@/lib/assessment.functions";
import { useTalent } from "./store";
import { PageTitle } from "./shell";
export function AssessmentPage() {
  const { profile, assessment, saveAssessment, ready } = useTalent();
  const generate = useServerFn(generateAssessment);
  const finish = useServerFn(finishAssessment);
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [notice, setNotice] = useState("");
  const [pendingResult, setPendingResult] = useState<Assessment | null>(null);
  const [field, setField] = useState(profile.occupation || fields[0] || "Technology & IT");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(assessment);
  const [error, setError] = useState("");
  useEffect(() => {
    setResult(assessment);
  }, [assessment]);
  useEffect(() => {
    if (profile.occupation) setField(profile.occupation);
  }, [profile.occupation]);
  const question = quiz?.questions[index];
  const count = quiz?.questions.length ?? 5;
  const context = privateAssessmentContext(profile, field);
  async function begin() {
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const generated = await generate({ data: context });
      setQuiz(generated);
      setNotice(generated.notice);
      setStarted(true);
      setAnswers([]);
      setIndex(0);
      setPendingResult(null);
    } catch {
      setError(
        "The assessment could not be started. Your saved result is unchanged. Please try again when the connection is available.",
      );
    } finally {
      setBusy(false);
    }
  }
  async function next() {
    if (answers[index] === undefined) {
      setError("Choose an answer before continuing.");
      return;
    }
    setError("");
    if (index < count - 1) {
      setIndex(index + 1);
      return;
    }
    setBusy(true);
    try {
      if (!quiz) throw new Error("Assessment missing");
      let outcome = pendingResult;
      if (!outcome) {
        const completed = await finish({ data: { token: quiz.token, answers } });
        outcome = completed.result;
        setPendingResult(outcome);
        setNotice(completed.notice);
      }
      if (saveAssessment(outcome)) {
        setResult(outcome);
        setStarted(false);
      } else
        setError(
          "Your result is ready but could not be saved. Allow browser storage, then finish again to save without another AI request.",
        );
    } catch {
      setError(
        "The result could not be retrieved. Your answers are still here. Check your connection before trying again; an expired assessment must be restarted.",
      );
    } finally {
      setBusy(false);
    }
  }
  return (
    <>
      <PageTitle
        eyebrow="LET YOUR SKILLS SPEAK"
        title="Skills assessment"
        description="Explore your strengths with five questions tailored to your professional background."
      />
      <div className="notice">
        Preliminary AI assessments are learning tools, not officially recognized qualifications or
        validated professional tests. Only your selected field, years of experience and recognized
        professional skill terms are sent to AI; names, emails, identification information and
        locations are excluded.
      </div>
      {notice && (
        <div className="notice" role="status">
          {notice}
        </div>
      )}
      {error && !started && (
        <p role="alert" className="error">
          {error}
        </p>
      )}
      <div className="assessment-tool">
        {!started && result ? (
          <>
            <p className="eyebrow">{assessmentLabel(result)}</p>
            <ClipboardCheck size={32} className="text-primary" />
            <h2>Your starting point, not your limit.</h2>
            <div className="score">{result.score}%</div>
            <p className="text-muted-foreground">
              {result.field} · {result.score}% correct across {result.questionCount ?? 5} questions.
            </p>
            <h3>Demonstrated in this assessment</h3>
            {result.competencies.length ? (
              <div className="chips">
                {result.competencies.map((c) => (
                  <span className="chip" key={c}>
                    {c}
                  </span>
                ))}
              </div>
            ) : (
              <p>
                This attempt did not demonstrate the tested competencies. Review the topics and try
                again.
              </p>
            )}
            <h3>Areas for practice</h3>
            <div className="chips">
              {(
                result.gaps ??
                questions.filter((q) => !result.competencies.includes(q.skill)).map((q) => q.skill)
              ).map((skill) => (
                <span className="chip" key={skill}>
                  {skill}
                </span>
              ))}
            </div>
            {result.score === 100 && (
              <p>
                You answered all five questions correctly. Consider deeper professional training.
              </p>
            )}
            {result.feedback && (
              <>
                <h3>
                  {result.feedbackSource === "ai"
                    ? "Personalized AI feedback"
                    : "Rule-based feedback"}
                </h3>
                <p>{result.feedback}</p>
              </>
            )}
            {result.activities && (
              <>
                <h3>Recommended learning activities</h3>
                <ul className="list-disc pl-5 space-y-2">
                  {result.activities.map((activity, i) => (
                    <li key={i}>{activity}</li>
                  ))}
                </ul>
              </>
            )}
            <div className="form-actions">
              <Button asChild>
                <Link to="/roadmap">
                  View career roadmap <ArrowRight />
                </Link>
              </Button>
              <Button
                variant="outline"
                onClick={() => {
                  setResult(null);
                  setAnswers([]);
                  setIndex(0);
                  setNotice("");
                  setError("");
                  setQuiz(null);
                }}
              >
                Take another assessment
              </Button>
            </div>
          </>
        ) : !started ? (
          <>
            <div className="icon-box">
              <ClipboardCheck />
            </div>
            <h2>Discover your professional strengths.</h2>
            <p className="text-muted-foreground">
              Five multiple-choice questions based on your selected field, experience and
              self-reported skills. If AI is unavailable, a clearly labelled foundational workplace
              assessment is offered instead.
            </p>
            <div className="field">
              <label htmlFor="assessment-field">Your professional field</label>
              <select
                id="assessment-field"
                value={field}
                disabled={busy}
                onChange={(e) => setField(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <p className="text-muted-foreground">
              Experience: {context.experience} years · Skills shared with AI:{" "}
              {context.skills.join(", ") || "None of the recognized skill terms selected"}.
            </p>
            <Link to="/profile" className="text-link">
              Update experience and skills <ArrowRight size={14} />
            </Link>
            <div className="form-actions">
              <Button onClick={begin} disabled={busy || !ready}>
                {busy ? (
                  <>
                    <LoaderCircle className="animate-spin motion-reduce:animate-none" /> Generating
                    questions…
                  </>
                ) : (
                  <>
                    Begin assessment <ArrowRight />
                  </>
                )}
              </Button>
              <span className="text-muted-foreground">About 3–5 minutes · No time limit</span>
            </div>
          </>
        ) : question ? (
          <>
            <div className="flex justify-between text-muted-foreground text-xs mb-4">
              <span>
                Question {index + 1} of {count}
              </span>
              <span>{question.skill}</span>
            </div>
            <div className="progress-track">
              <progress max={count} value={index + 1} aria-label="Assessment progress" />
            </div>
            <h2>{question.text}</h2>
            <fieldset className="answer-options">
              <legend className="sr-only">Choose one answer</legend>
              {question.answers.map((a, i) => (
                <label className="answer-option" key={a}>
                  <input
                    type="radio"
                    name={`question-${index}`}
                    value={i}
                    checked={answers[index] === i}
                    disabled={busy || !!pendingResult}
                    onChange={() => {
                      setAnswers((previous) => {
                        const copy = [...previous];
                        copy[index] = i;
                        return copy;
                      });
                      setError("");
                    }}
                  />
                  {a}
                </label>
              ))}
            </fieldset>
            {error && (
              <p role="alert" className="error">
                {error}
              </p>
            )}
            <div className="flex justify-between gap-3">
              <Button
                variant="outline"
                onClick={() => (index > 0 ? setIndex(index - 1) : setStarted(false))}
                disabled={busy || !!pendingResult}
              >
                <ArrowLeft />
                {index > 0 ? "Back" : "Cancel"}
              </Button>
              <Button onClick={next} disabled={busy}>
                {busy
                  ? "Scoring and preparing feedback…"
                  : index === count - 1
                    ? "Finish assessment"
                    : "Next question"}
                {busy ? (
                  <LoaderCircle className="animate-spin motion-reduce:animate-none" />
                ) : index === count - 1 ? (
                  <Check />
                ) : (
                  <ArrowRight />
                )}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
