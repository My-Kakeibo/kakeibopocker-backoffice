import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TCategoryBuyResponse = {
  id: string;
  name: string;
  description: string;
};

export type TCategoryBuyPaginateResponse =
  TPaginateResponse<TCategoryBuyResponse>;

export type TCategoryBuyDetailResponse = TResponseData<TCategoryBuyResponse>;
