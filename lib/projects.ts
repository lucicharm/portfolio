import type { ImageAspect } from "@/components/ProjectImage";

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
      // Intrinsic pixel size; set both to show the whole image uncropped.
      width?: number;
      height?: number;
    };

export type Section = {
  heading: string;
  blocks: Block[];
};

export type Project = {
  slug: string;
  title: string;
  // Optional: omitted values are left out of the byline.
  client?: string;
  year?: string;
  role?: string;
  tags: string[];
  summary: string;
  heroMetric?: { value: string; label: string };
  // Hero image sits between the metadata header and the project body.
  // Leave src undefined to show a placeholder; set src when the image is ready.
  heroImage?: {
    src?: string;
    alt: string;
    caption?: string;
    aspect?: ImageAspect;
    width?: number;
    height?: number;
  };
  sections: Section[];
};

export const projects: Project[] = [
  {
    slug: "pd-admin",
    title: "Professional Learning admin redesign",
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
        heading: "The problem",
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
        heading: "Design approach",
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
    title: "SMS job offers for substitute management",
    client: "PowerSchool",
    year: "2022",
    role: "Lead UX Designer",
    tags: ["Product Design", "Feature Design", "Inclusive Research", "Mobile-First"],
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
        heading: "The problem",
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
            type: "paragraph",
            text: "We also interviewed deaf users as part of the research. An automated phone offer only works if you can hear it when it rings. A text message can be read on the substitute's own schedule, without needing to hear anything.",
          },
          {
            type: "callout",
            text: "Competitive advantage: at the time of this project, Frontline — the primary competitor — did not offer two-way SMS job offers. This feature gave PowerSchool a clear differentiator in the market.",
          },
        ],
      },
      {
        heading: "Feature design",
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
    title: "Assessment planning tool redesign",
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
        heading: "The problem",
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
        heading: "The design tension",
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
        heading: "Design approach",
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
  {
    slug: "matrix-schedule-accessibility",
    title: "A clearer view of the matrix schedule",
    client: "PowerSchool",
    year: "2022",
    role: "UX Designer",
    tags: ["Accessibility", "Inclusive Design", "User Research"],
    summary:
      "I interviewed blind screen-reader users and designed a structured text view that made a complex class schedule easier to navigate, while preserving the visual matrix familiar to existing users.",
    sections: [
      {
        heading: "The challenge",
        blocks: [
          {
            type: "paragraph",
            text: "A class schedule is a dense matrix. Days, terms, semesters, and periods organize courses across rows and columns. That visual structure helps people scan the schedule and compare classes. For a person using a screen reader, the same information arrives as spoken output, one item at a time.",
          },
          {
            type: "paragraph",
            text: "Complex table headers did not always come through accurately in screen readers. Even when the software announced the headers correctly, the number of relationships a listener had to keep in mind made it hard to follow the schedule. The issue was both technical and cognitive: people needed to understand which course belonged to which day, semester, and period without holding the entire grid in memory.",
          },
          {
            type: "paragraph",
            text: "The visual schedule already served users who depended on the matrix. Replacing it would disrupt a familiar workflow. I focused on an alternate way to reach the same schedule information, so people could continue using the view that suited them.",
          },
          {
            type: "image",
            src: "/images/matrix/original-matrix.png",
            width: 2466,
            height: 872,
            alt: "The original Matrix Schedule page. A color-coded grid shows Day A of the 22-23 school year, with semesters S1 and S2 as rows and class periods 1 through 7, including 4A and 4B, as columns. Each cell stacks a course name, section number, teacher, room, and term. Some courses span both semesters, and period 4B is empty.",
            caption:
              "The original matrix. Understanding one class means relating its cell to the day, semester, and period headers around it. Sample data.",
          },
        ],
      },
      {
        heading: "What I learned from users",
        blocks: [
          {
            type: "paragraph",
            text: "I led interviews with blind screen-reader users to understand how they worked with the schedule and where the existing presentation slowed them down. A key need was the ability to jump quickly to different parts of the schedule. Screen readers offer heading navigation, so a person can move directly through a page by its heading structure instead of listening to every preceding item.",
          },
          {
            type: "paragraph",
            text: "That changed how I framed the problem. Correct header announcements addressed accuracy, while heading navigation addressed the effort of moving through a dense grid. The experience needed to make the schedule's organization available as a set of clear, navigable sections. I designed around the user's task of finding a particular part of the schedule, with table announcements as one part of the experience.",
          },
        ],
      },
      {
        heading: "Designing the text view",
        blocks: [
          {
            type: "paragraph",
            text: "I designed a text view that presents the same schedule in a logical hierarchy. A text-format link opens the alternate view. The page uses a heading for each day, a nested heading for each term and semester, and another heading for every class period. Course details appear in a list beneath their period heading. Empty periods are stated in text.",
          },
          {
            type: "paragraph",
            text: "For example, a user can navigate to Day A, move to Term 22-23, Semester 1, and then jump to Period 1. The course name, section number, teacher, room, and term are listed together. Proper heading levels let screen-reader users move through the schedule section by section, while the list keeps the details for each class grouped in a predictable order.",
          },
          {
            type: "paragraph",
            text: "The structure follows the way people need to make sense of the schedule: first locate a day, then a semester, then a period, and finally review the information for that class. The page makes those groupings explicit, supports direct navigation, and reduces the relationships a listener has to hold in memory.",
          },
          {
            type: "paragraph",
            text: "The text-format link offers a clear choice at the schedule itself. People who prefer the matrix can keep scanning it visually. People who use a screen reader can open the structured view and move through its heading outline. Both views represent the same schedule, with the text view making its organization explicit in a form that supports the navigation users asked for.",
          },
          {
            type: "paragraph",
            text: "I chose familiar document structure for the alternate view. Screen-reader users already know how to move by headings, and the outline reflects the schedule's existing organization. The solution gives them a direct route to a day, semester, or period, then presents the relevant details together. The core design decision was to make the information's hierarchy available as navigation.",
          },
          {
            type: "paragraph",
            text: "The hierarchy also gives users more than one useful level of orientation. A person can browse the schedule's days and semesters first, then move into the details of a period. When they reach a period, the list keeps its course, section number, teacher, room, and term together. The page outline and the content groups work as one system.",
          },
          {
            type: "image",
            src: "/images/matrix/updated-matrix.png",
            width: 2466,
            height: 946,
            alt: "The updated Schedule page. The color-coded matrix is unchanged, and a new Text format link sits directly below the page title.",
            caption:
              "The matrix stays as it was. A Text format link below the title opens the alternate view.",
          },
          {
            type: "image",
            src: "/images/matrix/text-view.png",
            width: 1446,
            height: 2032,
            alt: "The text view of the schedule. Below the title, a Matrix format link returns to the grid. The heading Day A is followed by the heading Term 22-23, Semester 1, then a heading for each class period. Under each period, a bulleted list gives the course name in bold, section number, teacher, room, and term. Under Period 4B, the text reads Empty Period.",
            caption:
              "The text view. Users jump by heading to a day, semester, or period, then read that class's details as a list. Sample data, so courses differ from the matrix above.",
          },
        ],
      },
      {
        heading: "Working through release",
        blocks: [
          {
            type: "paragraph",
            text: "I led the user interviews, designed the alternate view, and partnered with engineering through release. Keeping the matrix and adding a text format meant the team could support the existing visual workflow while making the schedule's content available through a structure that works with screen-reader heading navigation.",
          },
          {
            type: "paragraph",
            text: "The implementation used semantic markup for the hierarchy. A day is an h2, a term and semester an h3, and each period an h4. Each class's details stay grouped beneath the period they describe. This gives screen-reader users heading navigation and gives the content a clear organization in the page itself.",
          },
          {
            type: "image",
            src: "/images/matrix/engineering-handoff.png",
            width: 2368,
            height: 2032,
            alt: "Engineering handoff annotations for the text view. On the left, the rendered text view has callouts labeled H2, H3, H4, and unordered list. On the right, a code panel shows the markup: Day A as an h2, Term 22-23, Semester 1 as an h3, each period as an h4, and each period's course details in an unordered list with the course name in bold.",
            caption:
              "Handoff documentation specifying heading levels and list markup for engineering.",
          },
          {
            type: "paragraph",
            text: "That structure also made the relationship between each label and its information explicit in the document. The course name, section number, teacher, room, and term appear together in a list. An empty period is identified in text under its own heading. Users can navigate to the section they need, then read the details in a consistent order.",
          },
          {
            type: "paragraph",
            text: "The text view shipped. I led interviews before release, but did not run a formal usability test of the finished view with participants. I can describe the release and the feedback I received, but I have no measured task-time improvement or quantified outcome to report.",
          },
        ],
      },
      {
        heading: "What changed for one user",
        blocks: [
          {
            type: "paragraph",
            text: "After release, a school counselor who uses a screen reader emailed to describe what access to the product meant in their work. They said they could read every component, move through schedules efficiently, make needed changes, and share information with staff and families. Their note connected the design decision to the work the schedule supports every day.",
          },
          {
            type: "callout",
            text: "“I cannot even fully explain how efficient I am now that I can read every component of PowerSchool. I fly through schedules, make the changes I need and can relay information to staff members and families.”",
          },
          {
            type: "paragraph",
            text: "That message was one user's account; I have no broader study or product metric to quantify the impact. It showed me why navigation structure matters: when people can reach the information they need and understand how it is organized, they can act on it and pass it along with confidence.",
          },
        ],
      },
      {
        heading: "Reflection",
        blocks: [
          {
            type: "paragraph",
            text: "This work reinforced that accessible data must make cells available, provide context, and support practical navigation. Interviews helped me see that screen-reader users wanted to jump between schedule sections, and semantic headings gave them a familiar tool to do that.",
          },
          {
            type: "paragraph",
            text: "I learned to treat navigation and comprehension as part of the design problem, alongside correct announcements. Preserving the matrix and adding a structured text view let the product keep its familiar visual form while giving screen-reader users another way to find and use the same schedule.",
          },
        ],
      },
    ],
  },
  {
    slug: "acr-dashboard",
    title: "ACR Dashboard",
    client: "PowerSchool",
    year: "2026",
    role: "Designer and builder",
    tags: ["Accessibility Programs", "Internal Tools", "Data Visualization"],
    summary:
      "I designed and built an internal dashboard that tracks the status of every ACR and rolls accessibility issues up into executive reporting. It shows leadership how the program is doing and shows me where to focus training.",
    heroImage: {
      src: "/images/acr-dashboard/dashboard-main1.png",
      width: 1109,
      height: 940,
      alt: "The ACR Dashboard home page. Summary cards show portfolio conformance at 40%, meaning 22 of 55 criteria have no open defects across 6 products; conformance status of 1 conformant, 1 partially conformant, and 4 non-conformant products; and 1,692 open defects, all as of June 2, 2026. A conformance trend line built from weekly Jira snapshots falls from 100% to about 40%. An ACR status panel counts 2 current, 1 expiring soon, 2 expired, and 2 missing reports.",
      caption:
        "The dashboard home: overall conformance, product status, open defects, the trend over time, and which ACRs need renewal.",
    },
    sections: [
      {
        heading: "The problem",
        blocks: [
          {
            type: "paragraph",
            text: "Producing ACRs was one problem. Knowing where the program stood was another. Leadership needed an overall view of accessibility conformance across products. The program needed to know which ACRs were current, which were about to expire, and where accessibility issues were concentrated.",
          },
        ],
      },
      {
        heading: "What the dashboard shows",
        blocks: [
          {
            type: "list",
            items: [
              "Portfolio conformance: the share of WCAG criteria with no open defects across all tracked products",
              "Conformance status: how many products are conformant, partially conformant, or non-conformant",
              "Open defects across products, with an as-of date on every figure",
              "A conformance trend built from weekly Jira snapshots",
              "ACR status: current (within 12 months), expiring soon (renewal within 60 days), expired, or missing",
            ],
          },
          {
            type: "paragraph",
            text: "The Products view gives each product's most recent ACR, its status, and its open and closed Jira issues. Every metric carries a plain-language definition, so an executive can read the numbers without knowing how ACRs work.",
          },
          {
            type: "image",
            src: "/images/acr-dashboard/dashboard-products.png",
            width: 1109,
            height: 940,
            alt: "The Products page. A table lists seven products with the date of each product's most recent ACR and a status badge of Current, Expiring soon, or Expired, or a dash where no ACR exists. Columns show total Jira tickets, closed issues, open issues, and a bar showing the mix of closed and open issues. One product shows No Jira data.",
            caption:
              "Each product's latest ACR, its renewal status, and its open and closed issues.",
          },
        ],
      },
      {
        heading: "From data to training priorities",
        blocks: [
          {
            type: "paragraph",
            text: "Grouping issues by WCAG success criterion shows where problems cluster across the whole portfolio. In this snapshot, 1.3.1 Info and Relationships has far more open issues than any other criterion, followed by 2.1.1 Keyboard and 1.1.1 Non-text Content.",
          },
          {
            type: "paragraph",
            text: "A pattern that repeats across products is a training need, not a one-off bug. The dashboard tells me which skills to teach so that teams stop introducing the same issues.",
          },
          {
            type: "image",
            src: "/images/acr-dashboard/dashboard-main2.png",
            width: 1109,
            height: 940,
            alt: "The Issues by success criteria chart for WCAG 2.2 Level A. Each criterion has a gray bar for open issues and a green bar for closed issues. 1.3.1 Info and Relationships has by far the longest open bar, followed by 2.1.1 Keyboard and 1.1.1 Non-text Content. Many criteria have no issues.",
            caption:
              "Open and closed issues by success criterion. A few criteria account for most of the open issues.",
          },
          {
            type: "image",
            src: "/images/acr-dashboard/dashboard-overview.png",
            width: 1109,
            height: 940,
            alt: "The WCAG Overview page, grouped by principle. A bar chart compares open and closed issues across all products: Perceivable has about 940 open, Robust about 470, Operable about 340, and Understandable under 100, with far fewer closed in each. Below, a Perceivable table lists each success criterion with its level and open and closed counts, starting with 1.1.1 Non-text Content at 65 open and 46 closed.",
            caption:
              "Issues grouped by WCAG principle, with a table for each principle's success criteria.",
          },
        ],
      },
    ],
  },
  {
    slug: "accessibility-design-handoff",
    title: "Accessibility in design handoff",
    tags: ["Accessibility", "Interaction Design", "Design Handoff"],
    summary:
      "Examples of the handoff files I give engineering. Each one specifies how a component works with a keyboard and a screen reader, not just how it looks, so engineers don't have to guess.",
    sections: [
      {
        heading: "Why handoff matters",
        blocks: [
          {
            type: "paragraph",
            text: "A visual spec answers what a component looks like. It leaves out how it works with a keyboard, where focus goes, and what a screen reader says. If the design doesn't answer those questions, engineers answer them during development, one component at a time. My handoff files answer them before development starts.",
          },
        ],
      },
      // To add a handoff example: copy the section below, put its image in
      // /public/images/handoff/ (or reuse an existing folder), and set width
      // and height to the image's pixel size.
      {
        heading: "Example: Reordering a list with drag and drop",
        blocks: [
          {
            type: "paragraph",
            text: "Administrators reorder a list of District Quick Links. Drag and drop is the familiar way to do that, but it only works with a mouse. WCAG 2.2 requires a keyboard path (2.1.1 Keyboard) and a way to complete dragging actions without dragging (2.5.7 Dragging Movements).",
          },
          {
            type: "image",
            src: "/images/drag-drop/drag-drop-table-row.png",
            width: 3862,
            height: 1892,
            alt: "Design specification for reordering District Quick Links. On the left, a product page lists eight quick links in a table with link text, URL, and edit and delete buttons. Instructions above the table explain dragging or using Space and the arrow keys. The Job Opportunities row is lifted in drag mode with a focus outline. Numbered callouts mark the grab, edit, and delete buttons. On the right, notes specify the screen-reader announcements for grabbing, moving, and dropping a row, and each button's type, hidden label, states, and behavior.",
            caption:
              "The handoff spec: the list in drag mode, with interaction notes and button annotations.",
          },
          {
            type: "paragraph",
            text: "The spec defines one interaction that works with a mouse or a keyboard:",
          },
          {
            type: "list",
            items: [
              "Instructions above the list explain both methods: drag with a mouse, or press Space on a row's grab button to enter drag mode",
              "In drag mode, the arrow keys move the row and a second press of Space drops it",
              "The lifted row shows a focus outline and a drop shadow, so it is clear what is being moved",
            ],
          },
          {
            type: "paragraph",
            text: "It also scripts what a screen reader announces at each step:",
          },
          {
            type: "list",
            items: [
              "On focus: \u201cPress Spacebar to grab and reorder\u201d",
              "On grab: \u201cJob Opportunities grabbed. Current position 5 of 8.\u201d",
              "On each move: \u201cNew position: 6 of 8.\u201d",
              "On drop: \u201cJob Opportunities dropped. Position 4 of 8.\u201d",
            ],
          },
          {
            type: "paragraph",
            text: "Each icon button is annotated with its type, hidden label, states, and behavior. Labels include the row's link text, such as \u201cGrab Job Opportunities\u201d or \u201cDelete Job Opportunities\u201d, so a screen-reader user knows which row each button acts on. The spec also links to the accessible drag-and-drop patterns it builds on.",
          },
        ],
      },
    ],
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((cs) => cs.slug === slug);
}
