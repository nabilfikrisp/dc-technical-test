import { articlesSelector, fetchArticles } from "@/redux/slices/articles.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export const useArticles = () => {
  const dispatch = useAppDispatch();

  const { data, status, error } = useAppSelector(articlesSelector);

  const refetch = () => dispatch(fetchArticles());

  useEffect(() => {
    if (status === "idle" && data.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch]);

  return { data, status, error, refetch };
};
