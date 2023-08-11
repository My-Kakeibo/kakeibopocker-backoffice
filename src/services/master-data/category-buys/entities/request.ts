import { TDefaultParams } from '@/utils/entities/request';

export type TCategoryBuyParams = TDefaultParams;

export type TCategoryBuyPayload = {
  name: string;
  email: string;
  password: string;
};
