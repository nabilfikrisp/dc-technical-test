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

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<LandingPage />} />
            <Route path="/articles" element={<ArticleListPage />} />
            <Route path="/login" element={<LoginPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  </StrictMode>,
);
