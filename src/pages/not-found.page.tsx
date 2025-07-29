import { Link } from "react-router";
import { Button } from "../components/ui/button";

import { ArrowLeft, MapPin, Compass, AlertCircle } from "lucide-react";

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex w-full flex-1 flex-col">
      {/* Background gradient */}
      <div className="from-primary/5 to-accent/5 absolute inset-0 -z-10 bg-gradient-to-br via-transparent" />

      <div className="mx-auto flex w-full max-w-[1024px] flex-1 flex-col">
        <section className="relative flex flex-1 flex-col items-center justify-center overflow-hidden px-5 pt-16 pb-12 text-center">
          <div className="absolute top-20 left-20 opacity-20">
            <MapPin
              className="text-primary h-8 w-8 animate-bounce"
              style={{ animationDelay: "0s" }}
            />
          </div>
          <div className="absolute top-32 right-16 opacity-20">
            <Compass
              className="text-accent h-6 w-6 animate-spin"
              style={{ animationDelay: "1s", animationDuration: "3s" }}
            />
          </div>
          <div className="absolute bottom-20 left-32 opacity-20">
            <AlertCircle className="text-primary h-7 w-7 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <AlertCircle className="h-4 w-4" />
              Oops! You've wandered off the path
            </div>

            <h1 className="from-foreground via-foreground to-foreground/80 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                404
              </span>{" "}
              Not Found
            </h1>

            <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">
              The page you're looking for seems to have taken a detour. Don't
              worry, even the best travelers sometimes take wrong turns. Let's
              help you find your way back to the community.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/">
                <Button
                  size="lg"
                  className="group bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  <ArrowLeft className="mr-2 h-5 w-5 transition-transform group-hover:-translate-x-1" />
                  Back to Home
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
