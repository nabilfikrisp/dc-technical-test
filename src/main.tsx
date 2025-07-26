import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import ArticleListPage from "./pages/articles/article-list.page";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Layout from "./components/layout";
import LoginPage from "./pages/auth/login.page";
import LandingPage from "./pages/lading.page";
import RegisterPage from "./pages/auth/register.page";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./components/guards/auth-guard";
import GuestGuard from "./components/guards/guest-guard";
import ArticleDetailPage from "./pages/articles/article-detail.page";
import { ThemeProvider } from "./components/theme-provider";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<LandingPage />} />
              <Route element={<AuthGuard />}>
                <Route path="articles">
                  <Route index element={<ArticleListPage />} />
                  <Route path=":id" element={<ArticleDetailPage />} />
                </Route>
              </Route>
              <Route element={<GuestGuard />}>
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Route>
            </Route>
          </Routes>
        </BrowserRouter>
        <Toaster closeButton richColors />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
