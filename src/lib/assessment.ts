import { z } from "zod";
import { fields, questions, type Assessment, type Profile } from "./talentbridge";

// Only canonical professional terms cross the AI boundary, never free-form profile text.
export const skillTerms = [
  "Technical support",
  "Communication",
  "Problem solving",
  "Collaboration",
  "Digital literacy",
  "Coding",
  "Python",
  "JavaScript",
  "Networking",
  "Cybersecurity",
  "Data analysis",
  "Customer service",
  "Project management",
  "Project coordination",
  "Accounting",
  "Bookkeeping",
  "Administration",
  "Leadership",
  "Marketing",
  "Excel",
  "Patient care",
  "Nursing",
  "First aid",
  "Infection prevention",
  "Clinical documentation",
  "Teaching",
  "Lesson planning",
  "Classroom management",
  "Adult learning",
  "Assessment",
  "Electrical work",
  "Welding",
  "Carpentry",
  "Mechanical maintenance",
  "Construction",
  "Workplace safety",
  "Quality control",
];
export const contextSchema = z
  .object({
    field: z.string().refine((f) => fields.includes(f)),
    experience: z.number().min(0).max(80),
    skills: z.array(z.string().refine((s) => skillTerms.includes(s))).max(skillTerms.length),
  })
  .strict();
export type AssessmentContext = z.infer<typeof contextSchema>;
export function privateAssessmentContext(
  profile: Pick<Profile, "experience" | "skills">,
  field: string,
): AssessmentContext {
  const entries = profile.skills
    .toLowerCase()
    .split(/[,;\n]/)
    .map((s) => s.trim());
  const years = Number(profile.experience);
  return contextSchema.parse({
    field,
    experience: Number.isFinite(years) ? Math.min(80, Math.max(0, years)) : 0,
    skills: skillTerms.filter((s) => entries.includes(s.toLowerCase())),
  });
}
export const questionSchema = z.object({
  skill: z.string().min(1).max(100),
  text: z.string().min(10).max(800),
  answers: z.array(z.string().min(1).max(400)).length(4),
  correct: z.number().int().min(0).max(3),
  explanation: z.string().min(1).max(800),
  activity: z.string().min(1).max(600),
});
export const quizSchema = z
  .object({ questions: z.array(questionSchema).length(5) })
  .superRefine((quiz, ctx) => {
    if (
      new Set(quiz.questions.map((q) => q.text)).size !== 5 ||
      quiz.questions.some((q) => new Set(q.answers).size !== 4)
    )
      ctx.addIssue({ code: "custom", message: "Questions and answer choices must be distinct" });
  });
export type QuizQuestion = z.infer<typeof questionSchema>;
export type PublicQuestion = Pick<QuizQuestion, "skill" | "text" | "answers">;
export type Quiz = {
  questions: PublicQuestion[];
  token: string;
  source: "ai" | "rule-based";
  notice: string;
};
export const feedbackSchema = z.object({
  feedback: z.string().min(1).max(1600),
  activities: z.array(z.string().min(1).max(600)).min(1).max(5),
});
export function scoreQuiz(
  field: string,
  items: QuizQuestion[],
  answers: number[],
  source: "ai" | "rule-based",
): Assessment {
  if (
    items.length !== 5 ||
    answers.length !== 5 ||
    answers.some((a, i) => !Number.isInteger(a) || a < 0 || a >= (items[i]?.answers.length ?? 0))
  )
    throw new Error("Complete all five questions.");
  const passed = items.filter((q, i) => q.correct === answers[i]);
  const missed = items.filter((q, i) => q.correct !== answers[i]);
  return {
    field,
    score: passed.length * 20,
    competencies: [...new Set(passed.map((q) => q.skill))],
    gaps: [...new Set(missed.map((q) => q.skill))],
    source,
    feedbackSource: "rule-based",
    questionCount: 5,
    feedback: `You answered ${passed.length} of 5 questions correctly. This preliminary result reflects only the topics tested, not professional qualification.`,
    activities: (missed.length ? missed : items).map((q) => q.activity),
  };
}
export function fallbackQuestions(): QuizQuestion[] {
  return questions.map((q) => ({
    ...q,
    answers: [...q.answers, "Proceed without checking the situation"],
    explanation: `The best choice is: ${q.answers[q.correct] ?? "Review the topic"}.`,
    activity: `Practice ${q.skill.toLowerCase()} in a short workplace scenario and review your approach with a mentor.`,
  }));
}
export function assessmentLabel(a: Assessment) {
  return a.source === "ai"
    ? "Preliminary AI assessment"
    : a.source === "rule-based"
      ? "Rule-based fallback assessment"
      : "Foundational workplace assessment";
}
