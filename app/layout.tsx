import type { Metadata } from "next";
import { Montserrat, Roboto, PT_Mono } from "next/font/google";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SkipNav from "@/components/SkipNav";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
  display: "swap",
});

const ptMono = PT_Mono({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-pt-mono",
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
      className={`${montserrat.variable} ${roboto.variable} ${ptMono.variable}`}
    >
      <body className="min-h-screen flex flex-col bg-surface text-body overflow-x-hidden">
          <SkipNav />
          <Nav />
          <main id="main-content" className="flex-1">
            {children}
          </main>
          <Footer />
      </body>
    </html>
  );
}
