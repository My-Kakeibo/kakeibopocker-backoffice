import { TDefaultParams } from '@/utils/entities/request';
import { TCategoryBuyResponse } from './response';
import { TCategorySpendResponse } from '../../category-spends/entities/response';
import { TUserResponse } from '../../users/entities/response';

export type TCategoryBuyParams = TDefaultParams<TCategoryBuyResponse>;

export type TCategoryBuyPayload = {
  name: string;
  description: string;
  haveUserId: TUserResponse['id'];
  categorySpendId: TCategorySpendResponse['id'];
};
