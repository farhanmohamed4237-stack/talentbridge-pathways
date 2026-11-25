export type Profile = {
  name: string;
  occupation: string;
  education: string;
  experience: string;
  skills: string;
  location: string;
  languages: string;
  documentation: string;
};
export type Assessment = {
  field: string;
  score: number;
  competencies: string[];
  source?: "ai" | "rule-based";
  feedbackSource?: "ai" | "rule-based";
  gaps?: string[];
  feedback?: string;
  activities?: string[];
  questionCount?: number;
};
export const emptyProfile: Profile = {
  name: "",
  occupation: "",
  education: "",
  experience: "",
  skills: "",
  location: "",
  languages: "",
  documentation: "",
};
export const demoProfile: Profile = {
  name: "Amina Hassan",
  occupation: "Technology & IT",
  education: "Diploma in Information Technology",
  experience: "3",
  skills: "Technical support, Communication, Problem solving",
  location: "Nairobi, Kenya",
  languages: "English, Swahili, Somali",
  documentation: "Some documentation available",
};
export const demoAssessment: Assessment = {
  field: "Technology & IT",
  score: 80,
  competencies: ["Problem solving", "Communication", "Collaboration", "Digital literacy"],
};
export const fields = [
  "Technology & IT",
  "Business & Administration",
  "Healthcare",
  "Education",
  "Engineering & Trades",
];
export const questions = [
  {
    skill: "Problem solving",
    text: "A client reports an unfamiliar problem. What should you do first?",
    answers: [
      "Understand the issue and gather information",
      "Immediately replace their equipment",
      "Ignore it until someone else responds",
    ],
    correct: 0,
  },
  {
    skill: "Communication",
    text: "How would you explain a complex task to a new colleague?",
    answers: [
      "Use as much technical jargon as possible",
      "Use simple steps and check their understanding",
      "Ask them to work it out alone",
    ],
    correct: 1,
  },
  {
    skill: "Professional judgment",
    text: "You discover an error in work you have already submitted. What do you do?",
    answers: [
      "Hide the error",
      "Blame another colleague",
      "Inform the relevant person and propose a correction",
    ],
    correct: 2,
  },
  {
    skill: "Collaboration",
    text: "Your team disagrees on the next step. How do you respond?",
    answers: [
      "Listen to different views and compare options",
      "Refuse to participate",
      "Insist on your approach without discussion",
    ],
    correct: 0,
  },
  {
    skill: "Digital literacy",
    text: "An unexpected email asks for your password. What should you do?",
    answers: [
      "Reply with your password",
      "Verify the sender through an official channel and do not share it",
      "Forward it to all your contacts",
    ],
    correct: 1,
  },
];
export function assess(field: string, answers: number[]): Assessment {
  const passed = questions.filter((q, i) => answers[i] === q.correct);
  return {
    field,
    score: Math.round((passed.length / questions.length) * 100),
    competencies: passed.map((q) => q.skill),
  };
}
export function completion(profile: Profile) {
  return Math.round((Object.values(profile).filter((v) => v.trim() !== "").length / 8) * 100);
}
export const opportunities = [
  {
    id: "1",
    title: "Junior IT Support Specialist",
    organization: "Example technology employer",
    type: "Employment",
    location: "Nairobi",
    mode: "On-site",
    field: "Technology & IT",
    description:
      "Practice matching your technical support and communication skills to an entry-level role. This is a fictional listing, not an open vacancy.",
  },
  {
    id: "2",
    title: "Career Mentorship Circle",
    organization: "Example mentorship programme",
    type: "Mentorship",
    location: "Online",
    mode: "Remote",
    field: "All fields",
    description:
      "An example of a peer mentorship programme for interview preparation and professional networking. No applications are accepted.",
  },
  {
    id: "3",
    title: "Digital Skills Foundations",
    organization: "Example learning provider",
    type: "Training",
    location: "Online",
    mode: "Remote",
    field: "Technology & IT",
    description:
      "An illustrative learning pathway covering productivity tools, digital safety and online communication.",
  },
  {
    id: "4",
    title: "Emerging Leaders Fellowship",
    organization: "Example fellowship programme",
    type: "Fellowship",
    location: "Nairobi",
    mode: "Hybrid",
    field: "Business & Administration",
    description:
      "A fictional professional development fellowship focused on leadership and community projects.",
  },
  {
    id: "5",
    title: "Community Learning Facilitator",
    organization: "Example education employer",
    type: "Employment",
    location: "Kakuma",
    mode: "On-site",
    field: "Education",
    description:
      "An example role supporting adult learning and facilitating community education activities. Not a real job offer.",
  },
  {
    id: "6",
    title: "Workplace Communication",
    organization: "Example learning provider",
    type: "Training",
    location: "Online",
    mode: "Remote",
    field: "All fields",
    description:
      "A demonstration course recommendation for professional writing, teamwork and interview confidence.",
  },
];
export function filterOpportunities(search: string, type: string, location: string) {
  return opportunities.filter(
    (o) =>
      `${o.title} ${o.field} ${o.organization}`.toLowerCase().includes(search.toLowerCase()) &&
      (type === "All types" || o.type === type) &&
      (location === "All locations" || o.location === location),
  );
}
export function assistantReply(input: string) {
  const text = input.toLowerCase();
  if (/credential|qualification|document/.test(text))
    return "List your education and the documentation you have, without uploading sensitive documents. Recognition requirements depend on your profession. Check KNQA’s official website and the relevant professional regulator for the current process. This is general information, not verified legal advice.";
  if (/interview|cv|resume/.test(text))
    return "Start with a short summary of your experience. Describe two projects using the situation, your action, and the result. Include your self-reported skills, but do not present this prototype assessment as a recognized certification. What role are you preparing for?";
  if (/legal|permit|work author/.test(text))
    return "Work authorization requirements depend on individual circumstances and may change. Consult the Directorate of Refugee Services and a qualified legal adviser before making decisions. Do not share identification numbers here. This is general information, not legal advice.";
  return "A useful next step is to complete your professional profile, try the preliminary assessment, and identify one skill to develop. Tell me about your target role or ask about CV preparation, interviews, or credential recognition. This is a scripted prototype response, not live AI.";
}
