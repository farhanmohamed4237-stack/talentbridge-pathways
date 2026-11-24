import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  emptyProfile,
  demoProfile,
  demoAssessment,
  type Profile,
  type Assessment,
} from "@/lib/talentbridge";
type Store = {
  profile: Profile;
  assessment: Assessment | null;
  demo: boolean;
  ready: boolean;
  error: string;
  saveProfile: (p: Profile) => boolean;
  saveAssessment: (a: Assessment) => boolean;
  startDemo: () => void;
  clear: () => void;
};
const Context = createContext<Store | null>(null);
export function TalentProvider({ children }: { children: ReactNode }) {
  const [profile, setProfile] = useState(emptyProfile);
  const [assessment, setAssessment] = useState<Assessment | null>(null);
  const [demo, setDemo] = useState(false);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      const raw = localStorage.getItem("talentbridge-prototype");
      if (raw) {
        const data = JSON.parse(raw);
        if (
          data.profile &&
          Object.keys(emptyProfile).every((k) => typeof data.profile[k] === "string")
        )
          setProfile(data.profile);
        if (
          data.assessment &&
          typeof data.assessment.score === "number" &&
          Array.isArray(data.assessment.competencies)
        )
          setAssessment(data.assessment);
        setDemo(data.demo === true);
      }
    } catch {
      setError("Saved information could not be loaded. You can start again.");
    }
    setReady(true);
  }, []);
  function persist(p: Profile, a: Assessment | null, d: boolean) {
    try {
      localStorage.setItem(
        "talentbridge-prototype",
        JSON.stringify({ profile: p, assessment: a, demo: d }),
      );
      setError("");
      return true;
    } catch {
      setError(
        "Your browser could not save this information. Please allow local storage and try again.",
      );
      return false;
    }
  }
  const value: Store = {
    profile,
    assessment,
    demo,
    ready,
    error,
    saveProfile(p) {
      if (!persist(p, assessment, demo)) return false;
      setProfile(p);
      return true;
    },
    saveAssessment(a) {
      if (!persist(profile, a, demo)) return false;
      setAssessment(a);
      return true;
    },
    startDemo() {
      persist(demoProfile, demoAssessment, true);
      setProfile(demoProfile);
      setAssessment(demoAssessment);
      setDemo(true);
    },
    clear() {
      if (persist(emptyProfile, null, false)) {
        setProfile(emptyProfile);
        setAssessment(null);
        setDemo(false);
      }
    },
  };
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useTalent() {
  const value = useContext(Context);
  if (!value) throw new Error("TalentProvider is required");
  return value;
}
