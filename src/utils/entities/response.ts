export type TResponseData<Response> = {
  statusCode: 200;
  message: string;
  data: Response;
};

export type TPaginateResponse<Response> = Omit<TResponseData<Response>, 'data'> & {
  meta: {
    currentPage: number;
    lastPage: number;
    next: string;
    perPage: number;
    prev: string;
    total: number;
  };
  items: Response[];
};

export type TResponseError = {
  statusCode: number;
  message: {
    field: string;
    error: string[];
  }[];
  errors?: string;
};
