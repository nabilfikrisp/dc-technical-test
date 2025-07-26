import { articlesSelector, fetchArticles } from "@/redux/slices/articles.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

export default function useArticles() {
  const dispatch = useAppDispatch();

  const { data, status, error } = useAppSelector(articlesSelector);

  const refetch = () => dispatch(fetchArticles());

  useEffect(() => {
    if (status === "idle" && data.length === 0) {
      dispatch(fetchArticles());
    }
  }, [dispatch, data.length, status]);

  return { data, status, error, refetch };
}
