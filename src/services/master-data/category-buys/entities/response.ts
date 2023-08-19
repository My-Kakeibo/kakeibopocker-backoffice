import { TPaginateResponse, TResponseData } from '@/utils/entities/response';
import { TUserResponse } from '../../users/entities/response';
import { TCategorySpendResponse } from '../../category-spends/entities/response';

export type TCategoryBuyResponse = {
  id: string;
  name: string;
  description: string;
  haveUser?: TUserResponse;
  categorySpend: TCategorySpendResponse;
};

export type TCategoryBuyPaginateResponse =
  TPaginateResponse<TCategoryBuyResponse>;

export type TCategoryBuyDetailResponse = TResponseData<TCategoryBuyResponse>;
