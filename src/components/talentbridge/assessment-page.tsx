import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, ArrowLeft, Check, ClipboardCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { fields, questions, assess } from "@/lib/talentbridge";
import { useTalent } from "./store";
import { PageTitle } from "./shell";
export function AssessmentPage() {
  const { profile, assessment, saveAssessment } = useTalent();
  const [field, setField] = useState(profile.occupation || fields[0] || "Technology & IT");
  const [started, setStarted] = useState(false);
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState(assessment);
  const [error, setError] = useState("");
  const question = questions[index];
  async function next() {
    if (answers[index] === undefined) {
      setError("Choose an answer before continuing.");
      return;
    }
    setError("");
    if (index < questions.length - 1) {
      setIndex(index + 1);
      return;
    }
    setBusy(true);
    await new Promise((r) => setTimeout(r, 500));
    const outcome = assess(field, answers);
    if (saveAssessment(outcome)) {
      setResult(outcome);
      setStarted(false);
    }
    setBusy(false);
  }
  return (
    <>
      <PageTitle
        eyebrow="LET YOUR SKILLS SPEAK"
        title="Skills assessment"
        description="Explore your strengths with a short, foundational workplace assessment."
      />
      <div className="notice">
        Preliminary assessments are not officially recognized certifications. This prototype uses
        five shared workplace questions, not a validated field-specific test. AI evaluation is not
        yet connected.
      </div>
      <div className="assessment-tool">
        {!started && result ? (
          <>
            <p className="eyebrow">PRELIMINARY RESULT</p>
            <ClipboardCheck size={32} className="text-primary" />
            <h2>Your starting point, not your limit.</h2>
            <div className="score">{result.score}%</div>
            <p className="text-muted-foreground">
              {result.field} · {result.competencies.length} of {questions.length} foundational
              competencies demonstrated.
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
              {questions
                .filter((q) => !result.competencies.includes(q.skill))
                .map((q) => (
                  <span className="chip" key={q.skill}>
                    {q.skill}
                  </span>
                ))}
            </div>
            {result.score === 100 && (
              <p>
                You answered all five foundational questions correctly. Consider deeper professional
                training.
              </p>
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
            <h2>Discover your foundational strengths.</h2>
            <p className="text-muted-foreground">
              Five questions about problem solving, communication, professional judgment,
              collaboration and digital literacy. Your field is recorded with the result.
            </p>
            <div className="field">
              <label htmlFor="assessment-field">Your professional field</label>
              <select
                id="assessment-field"
                value={field}
                onChange={(e) => setField(e.target.value)}
              >
                {fields.map((f) => (
                  <option key={f}>{f}</option>
                ))}
              </select>
            </div>
            <div className="form-actions">
              <Button
                onClick={() => {
                  setStarted(true);
                  setIndex(0);
                  setAnswers([]);
                }}
              >
                Begin assessment <ArrowRight />
              </Button>
              <span className="text-muted-foreground">About 3–5 minutes · No time limit</span>
            </div>
          </>
        ) : question ? (
          <>
            <div className="flex justify-between text-muted-foreground text-xs mb-4">
              <span>
                Question {index + 1} of {questions.length}
              </span>
              <span>{question.skill}</span>
            </div>
            <div className="progress-track">
              <progress max={questions.length} value={index + 1} aria-label="Assessment progress" />
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
                disabled={busy}
              >
                <ArrowLeft />
                {index > 0 ? "Back" : "Cancel"}
              </Button>
              <Button onClick={next} disabled={busy}>
                {busy
                  ? "Saving result…"
                  : index === questions.length - 1
                    ? "Finish assessment"
                    : "Next question"}
                {index === questions.length - 1 ? <Check /> : <ArrowRight />}
              </Button>
            </div>
          </>
        ) : null}
      </div>
    </>
  );
}
