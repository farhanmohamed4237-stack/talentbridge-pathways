import { webcrypto } from "node:crypto";
import { beforeEach, describe, expect, it, vi } from "vitest";
const { request } = vi.hoisted(() => ({ request: vi.fn() }));
vi.mock("@lovable.dev/ai-gateway", () => ({
  generateResponse: request,
  GatewayError: class extends Error {},
}));
import { generateQuiz, completeQuiz, openSession, sealSession } from "@/lib/assessment.server";
import { fallbackQuestions } from "@/lib/assessment";

Object.defineProperty(globalThis, "crypto", { value: webcrypto, configurable: true });
const secret = "test-only-assessment-encryption-secret-not-used-by-the-app";
const context = { field: "Healthcare", experience: 2, skills: ["Patient care"] };
beforeEach(() => {
  request.mockReset();
  vi.spyOn(console, "error").mockImplementation(() => {});
});
describe("Server assessment recovery and integrity", () => {
  it("offers five labelled rule-based questions when a real AI request fails", async () => {
    request.mockRejectedValue(new Error("Service unavailable"));
    const quiz = await generateQuiz(context, secret);
    expect(quiz.source).toBe("rule-based");
    expect(quiz.questions).toHaveLength(5);
    expect(quiz.questions[0]).not.toHaveProperty("correct");
    const completed = await completeQuiz(quiz.token, [0, 1, 2, 0, 1], secret);
    expect(completed.result).toMatchObject({
      score: 100,
      source: "rule-based",
      feedbackSource: "rule-based",
    });
    expect(request).toHaveBeenCalledTimes(1);
  });
  it("preserves AI-question scores when personalized AI feedback is unavailable", async () => {
    request.mockRejectedValue(new Error("Feedback unavailable"));
    const token = await sealSession(
      { context, questions: fallbackQuestions(), source: "ai", expires: Date.now() + 60000 },
      secret,
    );
    const completed = await completeQuiz(token, [0, 1, 0, 0, 1], secret);
    expect(completed.result).toMatchObject({
      score: 80,
      source: "ai",
      feedbackSource: "rule-based",
      gaps: ["Professional judgment"],
    });
    expect(completed.result.activities).toHaveLength(1);
  });
  it("rejects tampered or expired sessions instead of trusting a browser answer key", async () => {
    const token = await sealSession(
      { context, questions: fallbackQuestions(), source: "ai", expires: Date.now() - 1 },
      secret,
    );
    await expect(openSession(token, secret)).rejects.toThrow("expired");
    await expect(openSession(`AAAA${token.slice(4)}`, secret)).rejects.toThrow();
  });
  it("rejects incomplete submissions before calling AI", async () => {
    const token = await sealSession(
      { context, questions: fallbackQuestions(), source: "ai", expires: Date.now() + 60000 },
      secret,
    );
    await expect(completeQuiz(token, [0], secret)).rejects.toThrow();
    expect(request).not.toHaveBeenCalled();
  });
});
