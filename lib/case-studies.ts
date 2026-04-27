import type { ImageAspect } from "@/components/CaseStudyImage";

export type Block =
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "metrics"; items: { value: string; label: string; note?: string }[] }
  | { type: "callout"; text: string }
  | {
      type: "image";
      // Leave src undefined to show a placeholder.
      // To add a real image: place the file in /public/images/ and set src, e.g.:
      //   src: "/images/pd-admin-before-after.png"
      // or use an external URL:
      //   src: "https://example.com/image.png"
      src?: string;
      alt: string;
      caption?: string;
      aspect?: ImageAspect;
    };

export type Section = {
  heading: string;
  blocks: Block[];
};

export type CaseStudy = {
  slug: string;
  title: string;
  client: string;
  year: string;
  role: string;
  tags: string[];
  summary: string;
  heroMetric?: { value: string; label: string };
  // Hero image sits between the metadata header and the case study body.
  // Leave src undefined to show a placeholder; set src when the image is ready.
  heroImage?: {
    src?: string;
    alt: string;
    caption?: string;
    aspect?: ImageAspect;
  };
  sections: Section[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "pd-admin",
    title: "Professional Learning Admin Redesign",
    client: "PowerSchool",
    year: "2021–2022",
    role: "UX Principal",
    tags: ["Design Systems", "Enterprise UX", "User Research", "Self-Service"],
    summary:
      "Redesigned the admin configuration experience for PowerSchool's Professional Learning product, moving customers from service-dependent workarounds to a modern self-service interface — and measuring the results.",
    heroMetric: { value: "65%", label: "decrease in support cases" },
    heroImage: {
      // src: "/images/pd-admin-hero.png",
      alt: "Before-and-after overview: the legacy support-ticket-dependent configuration workflow alongside the new self-service PD Admin panel",
      aspect: "wide",
    },
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "PowerSchool's Professional Learning product had accumulated years of configuration debt. Customers who needed to change simple settings had to open a support ticket and wait for the services team to make the change on their behalf — a frustrating, costly loop for everyone involved.",
          },
          {
            type: "paragraph",
            text: "Beyond the operational friction, the product's UI had drifted out of step with the rest of the PowerSchool suite. New customers familiar with other PS products encountered an inconsistent, outdated interface that eroded trust and drove unnecessary support contact.",
          },
          {
            type: "list",
            items: [
              "No self-service path for common configuration changes",
              "Inconsistent patterns compared to other PowerSchool products",
              "Outdated visual language that slowed adoption",
              "Feature-level usability problems throughout the product",
            ],
          },
          {
            type: "image",
            // src: "/images/pd-admin-legacy-ui.png",
            alt: "Screenshot of the legacy Professional Learning interface showing outdated visual patterns and the support-mediated settings workflow",
            caption: "The legacy interface customers were working around.",
            aspect: "wide",
          },
        ],
      },
      {
        heading: "Design Approach",
        blocks: [
          {
            type: "paragraph",
            text: "The core insight was simple: customers don't need hand-holding to change their own settings — they need a well-designed admin panel that trusts them. I designed a self-service configuration layer that aligned with the PowerSchool design system, replacing the previous services-mediated workflow with direct, clear controls.",
          },
          {
            type: "paragraph",
            text: "I worked closely with the services and support teams to identify the most frequently requested configuration changes and prioritized those first. Where new design patterns were needed, I introduced them carefully to maintain consistency across the product suite.",
          },
          {
            type: "image",
            // src: "/images/pd-admin-new-panel.png",
            alt: "The redesigned PD Admin settings panel showing self-service configuration controls organized into clear sections, consistent with the PowerSchool design system",
            caption: "The new self-service admin panel — customers configure their own product.",
            aspect: "wide",
          },
          {
            type: "callout",
            text: "An unexpected finding: the self-service model was so thorough it created a new challenge — implementations took longer because there was more to learn. This was a positive outcome reframed: we adjusted our success targets and worked with the services team on a new implementation process.",
          },
        ],
      },
      {
        heading: "Outcomes",
        blocks: [
          {
            type: "metrics",
            items: [
              {
                value: "65%",
                label: "Decrease in support cases",
                note: "4.92 → 1.68 cases per customer (last 90 days)",
              },
              {
                value: "30%",
                label: "Increase in customer control",
                note: "\"Can you change this product to work for you?\" — legacy 36% yes → PD Admin 66% yes",
              },
              {
                value: "23%",
                label: "Higher ease-of-change rating",
                note: "Avg 2.54 → 3.125 on a 5-point scale",
              },
              {
                value: "10%",
                label: "Decrease in implementation time",
                note: "Average hours across all implementation tiers",
              },
            ],
          },
          {
            type: "paragraph",
            text: "Down-market sales also responded positively: win rate for districts with 5,000 students or fewer increased from 25.8% to 38.9% — a 13-point gain — as the streamlined admin experience made the product more accessible to smaller teams without dedicated IT support.",
          },
        ],
      },
      {
        heading: "Reflection",
        blocks: [
          {
            type: "paragraph",
            text: "This project reinforced something I find consistently true in enterprise UX: the biggest wins often come not from inventing new interaction patterns, but from removing unnecessary friction in existing ones. Giving customers control over their own product — and trusting them with it — was both the right design decision and the right business decision.",
          },
        ],
      },
    ],
  },
  {
    slug: "sms-job-offers",
    title: "SMS Job Offers for Substitute Management",
    client: "PowerSchool",
    year: "2022",
    role: "Lead UX Designer",
    tags: ["Product Design", "Feature Design", "Accessibility", "Mobile-First"],
    summary:
      "Designed a two-way SMS system to replace phone-based job offers for substitute teachers — solving a <5% call answer rate, cutting over $1M in annual telecom costs, and giving substitutes a better way to accept jobs.",
    heroMetric: { value: "<5%", label: "of phone calls were being answered" },
    heroImage: {
      // src: "/images/sms-hero.png",
      alt: "Two mobile phone screens side by side: left showing a missed IVR phone call, right showing the new SMS job offer message with job details and ACCEPT/DECLINE reply options",
      aspect: "wide",
    },
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "PowerSchool's substitute management system filled open teaching positions by calling substitutes with automated phone offers. The system was broken in a fundamental way: fewer than 5% of calls were answered. The system was placing over a million dollars in phone calls per year with almost nothing to show for it.",
          },
          {
            type: "list",
            items: [
              "Less than 5% call answer rate on automated job offer calls",
              "$1M+ per year in telecom costs, including long-distance charges",
              "Substitutes missed job details unless they answered the call in real time",
              "Districts couldn't communicate with subs outside of live phone interaction",
            ],
          },
        ],
      },
      {
        heading: "Why SMS",
        blocks: [
          {
            type: "paragraph",
            text: "Text messaging solved for each of these problems simultaneously. Unlike a phone call, an SMS is received and read asynchronously — the substitute doesn't have to be available at the exact moment the system calls. The job details can be read, considered, and acted on without requiring a live connection.",
          },
          {
            type: "paragraph",
            text: "There was also a strong equity angle: SMS works on any phone, doesn't require a data plan or a smartphone, and doesn't require a running app. For a workforce that often works across multiple districts, with varying levels of tech access, this mattered.",
          },
          {
            type: "callout",
            text: "Competitive advantage: at the time of this project, Frontline — the primary competitor — did not offer two-way SMS job offers. This feature gave PowerSchool a clear differentiator in the market.",
          },
        ],
      },
      {
        heading: "Feature Design",
        blocks: [
          {
            type: "paragraph",
            text: "The core design challenge was keeping the SMS interaction simple enough for any device while preserving the rules and logic of the existing job matching system. Substitutes needed to be able to accept or decline a job with minimal friction — ideally a single reply.",
          },
          {
            type: "list",
            items: [
              "Opt-in / opt-out: substitutes explicitly choose SMS job offers",
              "Consistent sender number: subs always receive offers from the same number, building trust",
              "Interactive commands: ACCEPT, DECLINE, STOP, UNSTOP, HELP — all documented in the initial opt-in message",
              "Job detail in the message: enough information to decide without having to log in",
              "Confirmation on accept: job number sent immediately if still available, or a clear message if the job was filled",
              "Timer-based fallback: if a sub doesn't respond, the system moves to the next candidate",
            ],
          },
          {
            type: "image",
            // src: "/images/sms-conversation-mockup.png",
            alt: "SMS conversation mockup showing a job offer message with school name, date, grade, and pay rate, followed by the substitute replying ACCEPT and receiving a confirmation with the job number",
            caption: "The full SMS exchange: offer → accept → confirmation.",
            aspect: "portrait",
          },
        ],
      },
      {
        heading: "Workflow",
        blocks: [
          {
            type: "paragraph",
            text: "The SMS system was designed to slot directly into the existing job matching logic — the same search rules, priority lists, and classification tiers. The only change was the communication channel. This meant the system could be adopted incrementally and rolled back at the district level via a startup parameter.",
          },
          {
            type: "image",
            // src: "/images/sms-flow-diagram.png",
            alt: "System flow diagram showing how the SMS job offer replaces the IVR phone call step while the upstream job creation and search-rule logic remain unchanged",
            caption: "SMS slots into the existing job matching workflow — only the delivery channel changes.",
            aspect: "wide",
          },
          {
            type: "paragraph",
            text: "A critical edge case was contention: multiple substitutes accepting the same job at the same moment. The system handles this by confirming only the first valid acceptance and responding to all others with a clear, non-apologetic message: the job is no longer available.",
          },
        ],
      },
    ],
  },
  {
    slug: "assessment-planning",
    title: "Assessment Planning Tool Redesign",
    client: "Tk20",
    year: "2012",
    role: "Lead UX Designer",
    tags: ["Information Architecture", "Enterprise UX", "Cognitive Design", "Onboarding"],
    summary:
      "Redesigned the setup and planning experience for an assessment tool used by university faculty — reducing cognitive load for a notoriously complex, high-stakes task that users routinely dreaded.",
    heroMetric: { value: "Step-by-step", label: "wizard replaced freeform setup" },
    heroImage: {
      // src: "/images/assessment-planning-hero.png",
      alt: "The redesigned assessment planning wizard: step 2 of 5, showing a numbered progress bar, example-driven field labels, and inline guidance text tailored to different accrediting agency terminology",
      aspect: "wide",
    },
    sections: [
      {
        heading: "The Problem",
        blocks: [
          {
            type: "paragraph",
            text: "Assessment planning at universities is not a loved task. Faculty members assigned to it have been called 'suckers' by those who give out the role. The existing tool made an already unpleasant job worse: it didn't match how faculty actually thought about the process, the navigation was unclear, and the language was full of internal jargon that meant different things at different institutions.",
          },
          {
            type: "list",
            items: [
              "The tool's mental model didn't match users' natural workflows",
              "Navigation structure was unclear — users didn't know where they were or what came next",
              "Language was abstract and jargon-heavy, varying by accrediting agency",
              "Error messages were generic, not actionable",
              "No indication of how long setup would take or what information users needed to have ready",
            ],
          },
          {
            type: "image",
            // src: "/images/assessment-planning-before.png",
            alt: "Screenshot of the original assessment planning interface showing the freeform setup screen with unclear navigation, ambiguous Apple-style progress dots in the lower left, and dense jargon-heavy labels",
            caption: "The original tool: progress dots, no guidance, and terminology that changed meaning by institution.",
            aspect: "wide",
          },
        ],
      },
      {
        heading: "The Design Tension",
        blocks: [
          {
            type: "paragraph",
            text: "The product's flexibility was a genuine competitive advantage — competitors offered more rigid tools, and Tk20 won deals because institutions could adapt the system to their unique processes. But flexibility without guidance is just complexity. The design challenge was: how do you support infinite variation without abandoning the user?",
          },
          {
            type: "callout",
            text: "The answer was progressive disclosure: give the user a structured path through the setup, but build that path flexibly enough that it works for any institutional configuration.",
          },
        ],
      },
      {
        heading: "Design Approach",
        blocks: [
          {
            type: "paragraph",
            text: "I started with user interviews across several institutions to understand the range of mental models and workflows. This surfaced a clear pattern: users needed to understand the big picture before they could make good local decisions. They needed to know what they were setting up, why it mattered, and how long it would take.",
          },
          {
            type: "list",
            items: [
              "Wizard for first-time setup: surfaces on first visit, walks through each configuration step in sequence",
              "Numbered progress: replaced ambiguous progress dots (unfamiliar outside of Apple contexts) with numbered steps at the top of the flow",
              "Examples over descriptions: instead of defining abstract concepts, used concrete examples from real accreditation contexts",
              "Time and prerequisites surfaced upfront: users could see how long setup would take and what to have ready before starting",
              "Specific, actionable error messages: each error explained what was wrong and what to do next",
            ],
          },
          {
            type: "image",
            // src: "/images/assessment-planning-wizard-overview.png",
            alt: "The full wizard flow shown as an annotated screen sequence: step 1 (overview and time estimate), step 2 (plan template naming with examples), step 3 (outcome configuration), step 4 (review), step 5 (publish)",
            caption: "Five steps replacing a freeform screen: each step prepares the user for the next.",
            aspect: "wide",
          },
          {
            type: "image",
            // src: "/images/assessment-planning-wizard-step-detail.png",
            alt: "Close-up of wizard step 2 showing a field label that adapts its example text based on the selected accrediting agency (SACSCOC vs. HLC vs. WASC), with an inline hint explaining why the terminology differs",
            caption: "Example-driven labels adapt to each institution's accrediting agency language.",
            aspect: "standard",
          },
        ],
      },
      {
        heading: "Reflection",
        blocks: [
          {
            type: "paragraph",
            text: "This project was an early lesson in the difference between complexity and difficulty. The assessment planning process is genuinely complex — it has to be, because the domain is complex. The goal wasn't to make it simple; it was to make it learnable. Breaking the process into guided steps, using real examples, and giving users orientation at every stage transformed a daunting freeform task into something that could be approached with confidence.",
          },
        ],
      },
    ],
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find((cs) => cs.slug === slug);
}
