export interface PaginationOptions {
  page: number;
  pageSize: number;
}

export interface PaginationResult<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    totalItems: number;
    totalPages: number;
  };
}

export class PaginationHelper {
  page: number;
  pageSize: number;
  totalItems: number;

  constructor(options: PaginationOptions, totalItems: number) {
    this.page = Math.max(options.page, 1);
    this.pageSize = Math.max(Math.min(options.pageSize, 100), 1);
    this.totalItems = totalItems;
  }

  get skip(): number {
    return (this.page - 1) * this.pageSize;
  }

  get take(): number {
    return this.pageSize;
  }

  get totalPages(): number {
    return Math.ceil(this.totalItems / this.take);
  }

  static validateOptions(options: PaginationOptions): void {
    if (options.page < 1) throw new Error("Page must be >= 1");
    if (options.pageSize < 1) throw new Error("PageSize must be >= 1");
  }
}
