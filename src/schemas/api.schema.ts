export type ApiResponse<T, M = undefined> = {
  data: T;
  meta: M extends undefined ? undefined | null : M;
};

export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
