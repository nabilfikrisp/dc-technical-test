import { Link } from "react-router";
import { Button } from "../components/ui/button";

import {
  MapPin,
  Users,
  MessageCircle,
  Camera,
  ArrowRight,
  Sparkles,
} from "lucide-react";

export default function LandingPage() {
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
            <Camera
              className="text-accent h-6 w-6 animate-bounce"
              style={{ animationDelay: "1s" }}
            />
          </div>
          <div className="absolute bottom-20 left-32 opacity-20">
            <Sparkles className="text-primary h-7 w-7 animate-pulse" />
          </div>

          <div className="relative z-10">
            <div className="text-primary mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium backdrop-blur-sm">
              <Users className="h-4 w-4" />
              Join 10,000+ travelers worldwide
            </div>

            <h1 className="from-foreground via-foreground to-foreground/80 mb-6 bg-gradient-to-r bg-clip-text text-5xl font-extrabold tracking-tight text-transparent sm:text-6xl">
              Welcome to{" "}
              <span className="from-primary to-accent bg-gradient-to-r bg-clip-text text-transparent">
                TravelTalk
              </span>
            </h1>

            <p className="text-muted-foreground mb-8 max-w-2xl text-lg leading-relaxed">
              Join a vibrant community of travelers sharing stories, tips, and
              inspiration. Post your adventures, ask questions, and discover new
              destinations from real people.
            </p>

            <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
              <Link to="/articles">
                <Button
                  size="lg"
                  className="group bg-primary text-primary-foreground hover:bg-primary/90 relative overflow-hidden px-8 py-4 text-lg shadow-lg transition-all duration-300 hover:shadow-xl"
                >
                  Join the Community
                  <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>

              <Link to="/articles">
                <Button
                  size="lg"
                  variant="outline"
                  className="border-border/50 bg-background/50 hover:bg-accent/50 px-8 py-4 text-lg backdrop-blur-sm transition-all duration-300"
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Browse Articles
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="relative flex flex-col items-center px-5 pt-12 pb-16 text-center">
          <div className="bg-accent/10 mb-6 inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium">
            <Sparkles className="h-4 w-4" />
            Start your journey
          </div>

          <h3 className="mb-4 text-3xl font-bold">
            Ready to share your travel story?
          </h3>

          <p className="text-muted-foreground mb-8 max-w-md">
            Connect with fellow travelers and inspire others with your
            adventures
          </p>

          <Link to="/articles">
            <Button
              size="lg"
              variant="outline"
              className="group border-primary/50 bg-background/50 text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg shadow-lg backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
            >
              Create a Post
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </section>
      </div>
    </div>
  );
}
