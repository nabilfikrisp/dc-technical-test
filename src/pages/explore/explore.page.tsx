import LoadingUI from "@/components/loading-ui";
import LogoutButton from "@/components/logout-button";
import useAuth from "@/hooks/api/use-auth";

export default function ExplorePage() {
  const { user, hydrated } = useAuth();

  if (!hydrated) {
    return <LoadingUI message="Loading user data..." />;
  }

  return (
    <div className="mx-auto w-full max-w-[1100px] flex-1">
      <div className="flex items-center justify-between px-5 py-3">
        <h1 className="text-2xl font-bold">Explore Page</h1>
        {user && <p className="mt-4">Welcome, {user.username}!</p>}
        {!user && <p className="mt-4">Please log in to explore.</p>}
        <LogoutButton />
      </div>
    </div>
  );
}
