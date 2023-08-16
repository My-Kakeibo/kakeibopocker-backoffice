import { TUserResponse } from '@/services/master-data/users/entities/response';
import { TResponseData } from '@/utils/entities/response';

export type TAuthResponse = {
  user?: TUserResponse;
  accessToken: string;
};

export type TAuthSigninResponse = TResponseData<TAuthResponse>;
