import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";

export default function LandingPage() {
  return (
    <div className="mx-auto w-full max-w-[1024px] flex-1">
      <section className="flex flex-col items-center justify-center px-5 pt-10 pb-5 text-center">
        <h1 className="mb-4 text-5xl font-extrabold tracking-tight">
          Welcome to TravelTalk
        </h1>
        <p className="text-muted-foreground mb-8 max-w-xl text-lg">
          Join a vibrant community of travelers sharing stories, tips, and
          inspiration. Post your adventures, ask questions, and discover new
          destinations from real people.
        </p>
        <Button
          size="lg"
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-8 py-4 text-lg"
        >
          Join the Community
        </Button>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-5">
        <h2 className="mb-8 text-center text-3xl font-bold">
          Trending Discussions
        </h2>
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <Card className="bg-card text-card-foreground transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Solo Backpacking in South America</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                <span className="font-semibold">by @wanderer42</span>
              </p>
              <p>
                Just finished a 3-month solo trip through Peru, Bolivia, and
                Chile! AMA about border crossings, budgeting, or must-see spots.
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Best Hidden Beaches in Southeast Asia?</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                <span className="font-semibold">by @beachbum</span>
              </p>
              <p>
                Looking for recommendations for quiet, less-touristy beaches in
                Thailand, Vietnam, or the Philippines. Drop your favorites!
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card text-card-foreground transition-shadow hover:shadow-lg">
            <CardHeader>
              <CardTitle>Photo Thread: Autumn in Japan 🍁</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4">
                <span className="font-semibold">by @sakura</span>
              </p>
              <p>
                Share your best autumn photos from Japan! Temples, parks,
                cityscapes—let's see those colors.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      <section className="flex flex-col items-center px-5 pt-5 pb-10">
        <h3 className="mb-4 text-2xl font-semibold">
          Ready to share your travel story?
        </h3>
        <Button
          size="lg"
          variant="outline"
          className="border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg"
        >
          Create a Post
        </Button>
      </section>
    </div>
  );
}
