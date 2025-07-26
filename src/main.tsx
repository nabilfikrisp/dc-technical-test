import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import ArticleListPage from "./pages/articles/articel-list.page";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/layout";
import LoginPage from "./pages/auth/login.page";
import LandingPage from "./pages/lading.page";
import RegisterPage from "./pages/auth/register.page";
import ExplorePage from "./pages/explore/explore.page";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./components/guards/auth-guard";
import GuestGuard from "./components/guards/guest-guard";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route element={<AuthGuard />}>
              <Route path="/articles" element={<ArticleListPage />} />
              <Route path="/explore" element={<ExplorePage />} />
            </Route>
            <Route element={<GuestGuard />}>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
            </Route>
          </Route>
        </Routes>
      </BrowserRouter>
      <Toaster closeButton richColors />
    </Provider>
  </StrictMode>,
);
