import type { Metadata } from "next";
import { IBM_Plex_Mono, Public_Sans } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkipNav from "@/components/SkipNav";
import PasswordGate from "@/components/PasswordGate";
import Analytics from "@/components/Analytics";

// Public Sans is a variable font, so every weight comes in one file.
const publicSans = Public_Sans({
  subsets: ["latin"],
  variable: "--font-public-sans",
  display: "swap",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Melissa Garland — UX Principal",
    template: "%s | Melissa Garland",
  },
  description:
    "UX Principal with 20+ years building design systems and accessibility programs for enterprise software. Currently at PowerSchool.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${publicSans.variable} ${plexMono.variable}`}
    >
      <body className="min-h-screen flex flex-col">
        <Analytics />
        <PasswordGate>
          <SkipNav />
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
        </PasswordGate>
      </body>
    </html>
  );
}
