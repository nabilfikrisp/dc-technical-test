import { useCallback } from "react";
import { useNavigate, useLocation } from "react-router";

export function useGoBack(fallback: string = "/") {
  const navigate = useNavigate();
  const location = useLocation();

  const goBack = useCallback(() => {
    const canGoBack =
      (window.history.state?.idx ?? 0) > 0 && location.key !== "default";

    if (canGoBack) {
      navigate(-1);
    } else {
      navigate(fallback, { replace: true });
    }
  }, [location.key, navigate, fallback]);

  return goBack;
}
