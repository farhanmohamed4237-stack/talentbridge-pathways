import { describe, it, expect } from "vitest";
import {
  privateAssessmentContext,
  contextSchema,
  quizSchema,
  fallbackQuestions,
  scoreQuiz,
} from "@/lib/assessment";
import { demoProfile } from "@/lib/talentbridge";

describe("Functional assessments", () => {
  it("sends field, numeric experience and only recognized self-reported skill terms", () => {
    expect(
      privateAssessmentContext(
        {
          ...demoProfile,
          skills:
            "Python, Technical support, person@example.com, ID 123456, 12 Main Street, Farhan Mohamed",
        },
        "Technology & IT",
      ),
    ).toEqual({ field: "Technology & IT", experience: 3, skills: ["Technical support", "Python"] });
  });
  it("rejects identities and arbitrary skills at the server input boundary", () => {
    expect(
      contextSchema.safeParse({ field: "Healthcare", experience: 3, skills: [], name: "Farhan" })
        .success,
    ).toBe(false);
    expect(
      contextSchema.safeParse({
        field: "Healthcare",
        experience: 3,
        skills: ["person@example.com"],
      }).success,
    ).toBe(false);
  });
  it("requires exactly five questions with four options and a valid answer key", () => {
    const items = fallbackQuestions();
    expect(quizSchema.safeParse({ questions: items }).success).toBe(true);
    expect(quizSchema.safeParse({ questions: items.slice(0, 4) }).success).toBe(false);
    expect(
      quizSchema.safeParse({ questions: items.map((q) => ({ ...q, correct: 4 })) }).success,
    ).toBe(false);
  });
  it("calculates scores from actual correct answers and separates competencies from gaps", () => {
    const result = scoreQuiz("Healthcare", fallbackQuestions(), [0, 1, 0, 0, 1], "ai");
    expect(result.score).toBe(80);
    expect(result.competencies).toEqual([
      "Problem solving",
      "Communication",
      "Collaboration",
      "Digital literacy",
    ]);
    expect(result.gaps).toEqual(["Professional judgment"]);
    expect(result.activities).toHaveLength(1);
  });
  it("keeps fallback results explicitly rule-based and rejects incomplete attempts", () => {
    expect(
      scoreQuiz("Education", fallbackQuestions(), [1, 0, 0, 1, 0], "rule-based"),
    ).toMatchObject({ score: 0, source: "rule-based", feedbackSource: "rule-based" });
    expect(() => scoreQuiz("Education", fallbackQuestions(), [0], "ai")).toThrow();
  });
});
