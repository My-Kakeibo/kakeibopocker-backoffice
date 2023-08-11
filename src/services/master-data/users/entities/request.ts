import { TDefaultParams } from '@/utils/entities/request';

export type TUserParams = TDefaultParams;

export type TUserPayload = {
  name: string;
  email: string;
  password: string;
};
