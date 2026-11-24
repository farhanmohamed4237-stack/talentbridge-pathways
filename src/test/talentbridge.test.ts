import { describe, it, expect } from "vitest";
import {
  assess,
  completion,
  emptyProfile,
  demoProfile,
  demoAssessment,
  filterOpportunities,
  assistantReply,
} from "@/lib/talentbridge";
describe("TalentBridge prototype rules", () => {
  it("keeps the demonstration result consistent with the five-question assessment", () => {
    expect(demoAssessment).toEqual(assess("Technology & IT", [0, 1, 0, 0, 1]));
  });
  it("records preliminary assessment data from actual answers", () => {
    expect(assess("Technology & IT", [0, 1, 2, 0, 1])).toEqual({
      field: "Technology & IT",
      score: 100,
      competencies: [
        "Problem solving",
        "Communication",
        "Professional judgment",
        "Collaboration",
        "Digital literacy",
      ],
    });
    expect(assess("Healthcare", [1, 0, 0, 1, 0]).score).toBe(0);
  });
  it("calculates profile completion from locally entered fields", () => {
    expect(completion(emptyProfile)).toBe(0);
    expect(completion(demoProfile)).toBe(100);
    expect(completion({ ...emptyProfile, name: "Farhan" })).toBe(13);
  });
  it("filters demonstration opportunities by search, type and location together", () => {
    expect(filterOpportunities("IT", "Employment", "Nairobi").map((o) => o.id)).toEqual(["1"]);
    expect(filterOpportunities("IT", "Training", "Nairobi")).toHaveLength(0);
  });
  it("supports four requested opportunity pathways", () => {
    expect(
      new Set(filterOpportunities("", "All types", "All locations").map((o) => o.type)),
    ).toEqual(new Set(["Employment", "Mentorship", "Training", "Fellowship"]));
  });
  it("routes credential questions to general recognition guidance, not credential issuance", () => {
    expect(assistantReply("How do I recognize my qualifications?")).toContain("KNQA");
    expect(assistantReply("How do I obtain work authorization?")).toContain(
      "Directorate of Refugee Services",
    );
  });
});
