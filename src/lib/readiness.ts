export type ItemStatus = "not-started" | "in-progress" | "completed" | "not-applicable";
export type CredentialStatus =
  | "documentation-unavailable"
  | "documentation-available"
  | "recognition-not-initiated"
  | "recognition-in-progress"
  | "recognition-reported-completed";
export type Readiness = {
  checklist: Record<string, ItemStatus>;
  financial: Record<string, ItemStatus>;
  credential: CredentialStatus | "";
  includeInPassport: boolean;
};
export const statusOptions: { value: ItemStatus; label: string }[] = [
  { value: "not-started", label: "Not started" },
  { value: "in-progress", label: "In progress" },
  { value: "completed", label: "Completed" },
  { value: "not-applicable", label: "Not applicable" },
];
export const credentialOptions: { value: CredentialStatus; label: string }[] = [
  { value: "documentation-unavailable", label: "Documentation unavailable" },
  { value: "documentation-available", label: "Documentation available" },
  { value: "recognition-not-initiated", label: "Recognition not initiated" },
  { value: "recognition-in-progress", label: "Recognition in progress" },
  { value: "recognition-reported-completed", label: "Recognition reported as completed" },
];
export const readinessItems = [
  {
    id: "identity",
    title: "Identity and documentation readiness",
    action: "Make a private list of the documents you hold. Do not upload or share them here.",
  },
  {
    id: "work-authorization",
    title: "Work authorization guidance",
    action:
      "Check current official requirements with the Directorate of Refugee Services and seek qualified legal advice for your situation.",
  },
  {
    id: "credentials",
    title: "Academic and professional credential recognition",
    action: "Review KNQA recognition information and your profession’s regulator, if any.",
  },
  {
    id: "cv",
    title: "Professional CV preparation",
    action: "Prepare a short CV with a summary, two project examples and your skills.",
  },
  {
    id: "interview",
    title: "Interview preparation",
    action: "Practise introducing yourself and describing a project: situation, action, result.",
  },
  {
    id: "remote-work",
    title: "Employment and remote-work readiness",
    action:
      "Check device and internet access, set up a professional email and learn common online tools.",
  },
] as const;
export const financialItems = [
  {
    id: "provider-options",
    title: "Compare mobile money and banking options",
    action: "Compare fees, terms and protections from providers you are considering.",
  },
  {
    id: "provider-documents",
    title: "Ask providers which documents they accept",
    action: "Confirm current onboarding requirements directly with each provider.",
  },
  {
    id: "receiving-payments",
    title: "Understand how you would receive employment payments",
    action: "Ask employers or remote-work platforms which payment methods they support.",
  },
  {
    id: "budget",
    title: "Create a simple monthly budget",
    action: "List expected income, essential costs and a small savings goal.",
  },
  {
    id: "scams",
    title: "Learn to recognise employment and payment scams",
    action: "Review the warning signs below and never pay a fee to get a job.",
  },
] as const;
export const emptyReadiness: Readiness = {
  checklist: {},
  financial: {},
  credential: "",
  includeInPassport: false,
};
const validStatus = new Set(statusOptions.map((s) => s.value));
const validCredential = new Set(credentialOptions.map((s) => s.value));
function cleanMap(raw: unknown, ids: readonly string[]) {
  const out: Record<string, ItemStatus> = {};
  if (raw && typeof raw === "object")
    for (const id of ids) {
      const v = (raw as Record<string, unknown>)[id];
      if (typeof v === "string" && validStatus.has(v as ItemStatus)) out[id] = v as ItemStatus;
    }
  return out;
}
export function parseReadiness(raw: unknown): Readiness {
  if (!raw || typeof raw !== "object") return emptyReadiness;
  const r = raw as Record<string, unknown>;
  return {
    checklist: cleanMap(r["checklist"], readinessItems.map((i) => i.id)),
    financial: cleanMap(r["financial"], financialItems.map((i) => i.id)),
    credential:
      typeof r["credential"] === "string" && validCredential.has(r["credential"] as CredentialStatus)
        ? (r["credential"] as CredentialStatus)
        : "",
    includeInPassport: r["includeInPassport"] === true,
  };
}
/** Percentage of applicable items marked completed. Not-applicable items are excluded. */
export function checklistPercent(map: Record<string, ItemStatus>, ids: readonly string[]) {
  const applicable = ids.filter((id) => map[id] !== "not-applicable");
  if (applicable.length === 0) return 100;
  const done = applicable.filter((id) => map[id] === "completed").length;
  return Math.round((done / applicable.length) * 100);
}
export function outstanding<T extends { id: string }>(items: readonly T[], map: Record<string, ItemStatus>) {
  return items.filter((i) => map[i.id] !== "completed" && map[i.id] !== "not-applicable");
}
export function statusLabel(s: ItemStatus | undefined) {
  return statusOptions.find((o) => o.value === (s ?? "not-started"))?.label ?? "Not started";
}
export function credentialLabel(s: CredentialStatus | "") {
  return credentialOptions.find((o) => o.value === s)?.label ?? "Not recorded";
}
