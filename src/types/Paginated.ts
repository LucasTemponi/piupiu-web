export type Paginated<T> = {
  data: T[];
  currentPage: number;
  totalPages: number;
  total: number;
};
