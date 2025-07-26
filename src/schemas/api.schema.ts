export type ApiResponse<T> = {
  data: T;
  meta: Meta;
};

export type Meta = {
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
};
