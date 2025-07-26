import { articlesSelector, fetchArticles } from "@/redux/slices/articles.slice";
import { useAppDispatch, useAppSelector } from "@/redux/store";
import { useEffect } from "react";

const DEFAULT_PAGE_SIZE = 9;
const DEFAULT_PAGE = 1;

export default function useArticles() {
  const dispatch = useAppDispatch();

  const { data, status, error } = useAppSelector(articlesSelector);

  function refetch() {
    return dispatch(
      fetchArticles({
        pageSize: DEFAULT_PAGE_SIZE,
        page: DEFAULT_PAGE,
      }),
    );
  }

  useEffect(() => {
    if (status === "idle" && data.length === 0) {
      dispatch(
        fetchArticles({
          pageSize: DEFAULT_PAGE_SIZE,
          page: DEFAULT_PAGE,
        }),
      );
    }
  }, [dispatch, data.length, status]);

  return { data, status, error, refetch };
}
