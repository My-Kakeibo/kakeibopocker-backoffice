import { TDefaultParams } from '@/utils/entities/request';
import { TCategorySpendResponse } from './response';

export type TCategorySpendParams = TDefaultParams<TCategorySpendResponse> & {
  search?: string;
};

export type TCategorySpendPayload = {
  name: string;
  description: string;
};
