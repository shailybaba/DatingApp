export interface Pagination {
  pageSize: number;
  currentPage: number;
  totalCount: number;
  totalPages: number;
}

export class PaginatedResult<T> {
  result: T;
  pagination: Pagination;
}
