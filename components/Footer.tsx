import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-border mt-24">
      <div className="max-w-5xl mx-auto px-6 py-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <p className="font-display font-semibold text-primary">
          Melissa Garland
        </p>
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-8 text-sm text-muted font-sans items-start sm:items-center">
          <Link href="/contact" className="hover:text-primary transition-colors">
            Get in touch
          </Link>
          <span>UX Principal · Design Systems · Accessibility</span>
        </div>
      </div>
    </footer>
  );
}
