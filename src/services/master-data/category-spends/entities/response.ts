import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TCategorySpendResponse = {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
};

export type TCategorySpendPaginateResponse =
  TPaginateResponse<TCategorySpendResponse>;

export type TCategorySpendDetailResponse =
  TResponseData<TCategorySpendResponse>;
