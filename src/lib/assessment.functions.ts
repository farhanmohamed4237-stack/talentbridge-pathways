import { createServerFn } from "@tanstack/react-start";
import { getRequestHeader } from "@tanstack/react-start/server";
import { z } from "zod";
import { contextSchema } from "./assessment";
import { generateQuiz, completeQuiz, allowAssessmentRequest } from "./assessment.server";

// These public learning functions accept no identity or private profile records.
// Existing CSRF middleware remains active; per-instance throttling bounds casual abuse.
export const generateAssessment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => contextSchema.parse(input))
  .handler(async ({ data }) => {
    if (
      !allowAssessmentRequest(
        getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for") ?? "unknown",
        "generate",
      )
    )
      throw new Error("Too many assessment requests. Please wait a minute.");
    return generateQuiz(data, process.env["ASSESSMENT_SESSION_SECRET"] ?? "");
  });
export const finishAssessment = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z
      .object({
        token: z.string().min(1).max(40000),
        answers: z.array(z.number().int().min(0).max(3)).length(5),
      })
      .strict()
      .parse(input),
  )
  .handler(async ({ data }) => {
    if (
      !allowAssessmentRequest(
        getRequestHeader("cf-connecting-ip") ?? getRequestHeader("x-forwarded-for") ?? "unknown",
        "finish",
      )
    )
      throw new Error("Too many assessment requests. Please wait a minute.");
    return completeQuiz(data.token, data.answers, process.env["ASSESSMENT_SESSION_SECRET"] ?? "");
  });
