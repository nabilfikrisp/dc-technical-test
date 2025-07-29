import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./index.css";
import ArticleListPage from "./pages/articles/article-list.page";
import Layout from "./components/layout";
import LoginPage from "./pages/auth/login.page";
import LandingPage from "./pages/lading.page";
import RegisterPage from "./pages/auth/register.page";
import { Toaster } from "./components/ui/sonner";
import AuthGuard from "./components/guards/auth-guard";
import GuestGuard from "./components/guards/guest-guard";
import ArticleDetailPage from "./pages/articles/article-detail.page";
import { ThemeProvider } from "./components/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { QUERY_STALE_TIME, REFETCH_ON_WINDOW_FOCUS } from "./lib/consts";
import { NuqsAdapter } from "nuqs/adapters/react-router/v7";
import ArticleCreatePage from "./pages/articles/article-create.page";
import ArticleEditPage from "./pages/articles/article-edit.page";
import MePage from "./pages/auth/me.page";
import NotFoundPage from "./pages/not-found.page";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: REFETCH_ON_WINDOW_FOCUS,
      retry: 1,
      staleTime: QUERY_STALE_TIME,
    },
    mutations: {
      retry: 1,
    },
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <NuqsAdapter>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <BrowserRouter>
            <Routes>
              <Route element={<Layout />}>
                <Route index element={<LandingPage />} />
                <Route element={<AuthGuard />}>
                  <Route path="articles">
                    <Route index element={<ArticleListPage />} />
                    <Route path="create" element={<ArticleCreatePage />} />
                    <Route path=":id" element={<ArticleDetailPage />} />
                    <Route path=":id/edit" element={<ArticleEditPage />} />
                  </Route>
                  <Route path="me" element={<MePage />} />
                </Route>
                <Route element={<GuestGuard />}>
                  <Route path="login" element={<LoginPage />} />
                  <Route path="register" element={<RegisterPage />} />
                </Route>

                <Route path="*" element={<NotFoundPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
          <Toaster closeButton richColors />
        </ThemeProvider>
      </NuqsAdapter>
    </QueryClientProvider>
  </StrictMode>,
);
