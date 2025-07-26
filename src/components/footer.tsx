import { Link } from "react-router";

export default function Footer() {
  return (
    <footer className="bg-background border-border border-t py-6">
      <div className="mx-auto flex max-w-[1000px] flex-col items-center justify-between gap-2 px-5 md:flex-row">
        <span className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} TravelTalk. All rights reserved.
        </span>
        <nav className="flex gap-4 text-sm">
          <Link
            to="/"
            className="hover:text-primary text-foreground transition-colors"
          >
            Home
          </Link>
          <Link
            to="/explore"
            className="hover:text-primary text-foreground transition-colors"
          >
            Explore
          </Link>
          <Link
            to="/privacy"
            className="hover:text-primary text-foreground transition-colors"
          >
            Privacy
          </Link>
        </nav>
      </div>
    </footer>
  );
}
