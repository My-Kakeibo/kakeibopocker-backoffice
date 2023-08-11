import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TCategoryBuyResponse = {
  id: number;
};

export type TCategoryBuyPaginateResponse =
  TPaginateResponse<TCategoryBuyResponse>;

export type TCategoryBuyDetailResponse = TResponseData<TCategoryBuyResponse>;
