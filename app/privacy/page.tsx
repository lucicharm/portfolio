import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy notice",
  description:
    "How this portfolio handles analytics, the password gate, the contact form, and hosting on GitHub Pages.",
};

const headingClass =
  "text-xl font-extrabold tracking-[-0.015em] pb-3 mb-4 border-b border-rule";

export default function PrivacyPage() {
  return (
    <article className="wrap py-16">
      <header className="mb-12 grid max-w-[44rem] grid-cols-[minmax(0,1fr)] gap-5">
        <p className="font-mono text-sm tracking-[0.02em] text-ink-2">Privacy</p>
        <h1 className="text-3xl font-extrabold leading-[1.08] tracking-[-0.03em]">
          Privacy notice
        </h1>
        <p className="font-mono text-sm tracking-[0.02em] text-ink-2">
          Last updated October 30, 2026
        </p>
      </header>

      <div className="grid max-w-[44rem] grid-cols-[minmax(0,1fr)] gap-12">
        <section aria-labelledby="who-heading">
          <h2 id="who-heading" className={headingClass}>
            Who runs this site
          </h2>
          <p>
            This portfolio is run by Melissa Garland. For questions about this
            notice or your data, use the{" "}
            <Link href="/contact">contact form</Link>{" "}
            or message me on{" "}
            <a href="https://www.linkedin.com/in/magarland/" rel="me">
              LinkedIn
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="analytics-heading">
          <h2 id="analytics-heading" className={headingClass}>
            Analytics
          </h2>
          <p>
            This site uses GoatCounter to count page views, including views of
            the password screen. It records the page, the site or link that
            referred you, your country or region, and your browser, operating
            system, and screen size. GoatCounter doesn&apos;t use cookies and
            doesn&apos;t store IP addresses or anything else that identifies
            you. See{" "}
            <a href="https://www.goatcounter.com/help/privacy">
              GoatCounter&apos;s privacy policy
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="gate-heading">
          <h2 id="gate-heading" className={headingClass}>
            Password gate
          </h2>
          <p>
            You don&apos;t need to give your name or email to view the
            portfolio. This browser&apos;s local storage remembers that
            you&apos;ve unlocked the site. It
            doesn&apos;t store the password, isn&apos;t used for tracking, and
            stays until you clear your browser data.
          </p>
        </section>

        <section aria-labelledby="contact-heading">
          <h2 id="contact-heading" className={headingClass}>
            Contact form
          </h2>
          <p>
            If you send a message, your name, email address, and message are
            sent through Formspree and delivered to my email so I can respond.
            I keep messages only as long as needed to reply and follow up, and
            I&apos;ll delete them if you ask. See{" "}
            <a href="https://formspree.io/legal/privacy-policy/">
              Formspree&apos;s privacy policy
            </a>
            .
          </p>
        </section>

        <section aria-labelledby="hosting-heading">
          <h2 id="hosting-heading" className={headingClass}>
            Hosting
          </h2>
          <p>
            This site is hosted on GitHub Pages. GitHub may log visitors&apos;
            IP addresses for security, as described in the{" "}
            <a href="https://docs.github.com/en/site-policy/privacy-policies/github-general-privacy-statement">
              GitHub General Privacy Statement
            </a>
            . I don&apos;t have access to those logs. Fonts are served from
            this site, not from a third party.
          </p>
        </section>

        <section aria-labelledby="rights-heading">
          <h2 id="rights-heading" className={headingClass}>
            Your rights
          </h2>
          <p>
            Depending on where you live, you may have the right to access,
            correct, or delete personal data I hold about you, or to object to
            how it&apos;s used. To make a request,{" "}
            <Link href="/contact">get in touch</Link>
            . You can also complain to your local data protection authority.
          </p>
        </section>

        <p>
          <Link href="/portfolio" className="inline-flex min-h-11 items-center">
            Return to the portfolio
          </Link>
        </p>
      </div>
    </article>
  );
}
