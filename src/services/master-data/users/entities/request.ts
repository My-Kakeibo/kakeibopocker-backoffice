import { TDefaultParams } from '@/utils/entities/request';
import { TUserResponse } from './response';

export type TUserParams = TDefaultParams<TUserResponse> & {
  search?: string;
};

export type TUserPayload = {
  email: string;
  password: string;
  fullname: string;
};
