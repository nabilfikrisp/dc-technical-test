import { Outlet } from "react-router";
import Header from "./header";
import Footer from "./footer";

export default function Layout() {
  return (
    <main className="flex min-h-screen flex-col">
      <Header />

      <Outlet />

      <Footer />
    </main>
  );
}
