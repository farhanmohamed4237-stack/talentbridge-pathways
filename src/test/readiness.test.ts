import { describe, it, expect } from "vitest";
import { checklistPercent, outstanding, parseReadiness, readinessItems } from "@/lib/readiness";
const ids = readinessItems.map((i) => i.id);
describe("readiness checklist", () => {
  it("counts completed items over applicable items", () => {
    expect(checklistPercent({ identity: "completed", cv: "completed", interview: "not-applicable" }, ids)).toBe(40);
  });
  it("in-progress items do not count as complete", () => {
    expect(checklistPercent({ identity: "in-progress" }, ids)).toBe(0);
  });
  it("excludes completed and not-applicable from outstanding actions", () => {
    expect(outstanding(readinessItems, { identity: "completed", cv: "not-applicable" })).toHaveLength(4);
  });
  it("drops unknown statuses and sensitive extra fields from saved data", () => {
    const r = parseReadiness({ checklist: { identity: "verified", cv: "completed" }, accountNumber: "123", credential: "x" });
    expect(r.checklist).toEqual({ cv: "completed" });
    expect(r.credential).toBe("");
    expect("accountNumber" in r).toBe(false);
  });
});
