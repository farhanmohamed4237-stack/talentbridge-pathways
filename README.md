# TalentBridge AI

> **Skills without borders. Opportunities without barriers.**

**Live application:** https://talentbridge-pathways.lovable.app

Built for the **ILO Mini-Hackathon — Unlocking Displaced Talent: Pathways for Skilled Refugees**.

---

## Project overview

TalentBridge AI is a working prototype of a career inclusion platform for skilled refugees in Kenya. It helps displaced professionals describe their skills, take a short AI-generated skills assessment, build a Digital Skills Passport, plan a career roadmap and prepare for work. Employers get guidance on reading candidate skills fairly and recruiting inclusively.

The prototype is meant for demonstration and learning. Its assessments are **preliminary**: they are not accredited certifications, verified qualifications or evidence that someone is allowed to work.

## Problem statement

Many refugees arrive with professional training and experience in fields such as healthcare, engineering, IT, education and skilled trades. In host countries they often run into:

- missing or unrecognised academic and professional documents;
- uncertainty about work authorisation and how to get credentials recognised;
- employers who cannot easily judge skills from another country;
- limited access to career guidance, CV help and interview preparation;
- barriers to financial services and a higher risk of job and payment scams.

As a result, skilled people end up unemployed or working below their skill level, and host economies lose talent they could use.

## Proposed solution

TalentBridge AI offers one private place to:

1. **Describe skills** in a professional profile, without being asked for identity documents.
2. **Show competencies** through a short assessment written by AI for the user's field.
3. **Present skills** in a Digital Skills Passport they can download and print.
4. **Plan next steps** with a personalised career roadmap.
5. **Prepare for work** with employment, credential recognition and financial readiness checklists.
6. **Help employers** recruit inclusively, based on competencies.

## Target beneficiaries

- **Skilled refugees and displaced professionals in Kenya** looking for work that matches their skills.
- **Employers and recruiters** who want to recruit inclusively and fairly.
- **Support organisations** (for future pilots) that guide displaced job seekers.

## Core features

### Implemented in this prototype

| Feature | Description |
| --- | --- |
| Landing and How it works | Explains the platform, its aims and the SDGs it supports. |
| Professional profile | Professional field, years of experience, skills, education, languages and career goals. Saved only in the user's browser. |
| AI skills assessment | Five multiple-choice questions written by AI for the user's field, with a score and personalised feedback (see below). |
| Digital Skills Passport | Brings together the profile, assessment results, strengths, skill gaps, learning activities and, if the user chooses, a readiness summary. Can be downloaded as a text file or printed. |
| Career roadmap | Step-by-step plan that uses the assessment and readiness results. |
| Employment Readiness Centre | Checklists for documents, work authorisation, credential recognition, CV, interviews and remote work, a credential recognition tracker the user fills in themselves, financial readiness steps and scam warning signs. |
| Employer Hub | Guidance on reading the passport, inclusive and competency-based recruitment, checking skills responsibly and fair recruitment, plus three **fictional** sample candidates. |
| Example opportunities | **Fictional** job listings, clearly labelled, that can be filtered by field. |
| Guidance | General, non-legal guidance pointing to relevant Kenyan institutions (for example KNQA, the Department of Refugee Services, Immigration and the Central Bank of Kenya). |
| Demo mode | A sample profile and results so judges can explore the app quickly. |

### Preview-only features (not fully working)

- **Registration and sign-in:** demonstration screens only. No accounts are created and no credentials are stored.
- **Career assistant:** gives scripted answers based on rules, not AI. Messages are not saved.

## AI-powered assessment and personalisation

- **Question generation:** a server-side function asks an AI model through Lovable's AI integration for five distinct multiple-choice questions. The questions match the user's field, years of experience and chosen skills.
- **Scoring:** the app calculates the score from correct answers only (20% per question). The AI does not decide the score.
- **Protected answer key:** correct answers are encrypted on the server in a session token that expires, so the browser never receives them.
- **Personalised feedback:** after scoring, the AI describes the competencies shown, skill gaps and suggested learning activities. Wrong answers are presented as areas to practise.
- **Data sent to the AI:** only the professional field, a number for years of experience and skill terms from an approved list. Names, emails, locations, ID details and free-text profile content are never sent.
- **Clearly labelled fallback:** if the AI service is unavailable, the app switches to five general workplace questions and its own feedback, both clearly marked as **rule-based fallback**. The app records whether the questions and the feedback came from AI or from the fallback.
- **Request limit:** each visitor can make a limited number of assessment requests per minute.

## User journey

```text
Landing ─▶ (Registration preview or Demo) ─▶ Profile ─▶ AI assessment
   ─▶ Results and feedback ─▶ Digital Skills Passport ─▶ Career roadmap
   ─▶ Readiness Centre ─▶ Example opportunities / Guidance
Employers ─▶ Employer Hub ─▶ Read passports, inclusive recruitment guidance
```

## Technology stack and system architecture

- **Frontend:** React 19 and TanStack Start/Router, styled with Tailwind CSS v4 and shadcn/ui.
- **Server:** TanStack Start server functions, deployed to an edge (Cloudflare Workers-style) environment.
- **AI:** Lovable AI integration (`@lovable.dev/ai-gateway`), called only from the server.
- **Backend platform:** Lovable Cloud, which keeps secrets on the server. The prototype does not use any database tables yet.
- **Storage:** profile, assessment and readiness data are saved only in the user's own browser.
- **Testing:** Vitest and Testing Library.

```text
Browser (React UI, data saved in the browser)
   │  sends only the field, experience and approved skill terms
   ▼
Server functions (checking, request limits, encrypted sessions, scoring)
   │  AI key kept on the server
   ▼
Lovable AI integration ─▶ AI model
```

Main source files:

- `src/lib/talentbridge.ts`: profiles, demo data, example opportunities
- `src/lib/assessment.ts`: approved data list, checking and scoring (safe to run in the browser)
- `src/lib/assessment.server.ts` and `assessment.functions.ts`: AI requests, encrypted sessions, fallback
- `src/lib/readiness.ts`: readiness checklists
- `src/components/talentbridge/`: page components and the shared data store
- `src/routes/`: one file per page

## Privacy, security and responsible AI

- The app never asks for refugee ID numbers, identity documents or bank account numbers.
- Data is minimised: only non-identifying professional information is sent to the AI.
- The AI key and other secrets stay on the server and are never in the code sent to the browser. The only keys in the repository are public "publishable" keys, which are designed to be visible.
- Profiles, results and readiness progress stay on the user's device. Exiting demo mode deletes them.
- Every result is labelled *preliminary* and kept separate from officially recognised qualifications.
- Sources are shown openly: AI and rule-based fallback content are labelled separately.
- Guidance is general information, not legal or financial advice.
- No fake credentials, employers, jobs or partnerships: all sample listings and candidates are labelled fictional.

## Alignment with the Sustainable Development Goals

- **SDG 4: Quality Education.** Skill gap analysis and suggested learning activities support lifelong learning.
- **SDG 8: Decent Work and Economic Growth.** Readiness tools, passports and employer guidance support productive, fair employment.
- **SDG 10: Reduced Inequalities.** Recruitment based on competencies, with privacy protection, lowers the barriers displaced professionals face.

## Prototype limitations

- No real user accounts; registration and sign-in are previews.
- Data is saved only in the browser, so it does not move between devices and is lost if browser data is cleared.
- Assessments are short (five questions) and preliminary. They are not psychometrically validated or accredited.
- Job listings and employer candidates are fictional; there are no real placements or employer connections.
- The career assistant gives scripted answers, not AI answers.
- The app does not check credentials, identity or work authorisation.
- No partnerships with the ILO, UNHCR, KNQA, employers or other organisations are claimed.
- The interface is available in English only.

## Local installation

Requirements: Node.js 20+ and [Bun](https://bun.sh) (or npm).

```sh
git clone <repository-url>
cd <repository-folder>
bun install
bun run dev        # start the development server
bun run test       # run the automated tests
bun run build      # create a production build
```

The AI assessment needs server-side settings provided by Lovable Cloud (the AI integration key and an `ASSESSMENT_SESSION_SECRET` for encrypting sessions). Never commit these values. If they are missing, the AI assessment cannot run.

## Future development and scalability

The following are **planned** and not yet built:

- Secure accounts with optional, user-controlled cloud storage of profiles.
- Longer, adaptive assessments reviewed by experts in each field.
- Support for Swahili, French, Arabic, Somali and other languages, plus easier access on low-bandwidth connections.
- An AI-powered career assistant with safety controls.
- Verified employer accounts and real, moderated job listings.
- Pilot work with support organisations and recognition bodies, which would require formal agreements.
- Ways for users to share their passport with consent, and accessibility audits.

## Live demonstration

**https://talentbridge-pathways.lovable.app**

Select **Try demo** on the landing page to explore with a sample profile, or create your own profile to take an AI assessment.
