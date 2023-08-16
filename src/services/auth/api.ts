import axios from '@/utils/axios';
import { AUTH_SIGNIN_ENDPOINT } from './constant';
import { TAuthSigninResponse } from './entities/response';
import { TAuthSigninPayload } from './entities/request';

export const authSignin = async (payload: TAuthSigninPayload) => {
  const result = await axios.post<TAuthSigninResponse>(
    `${AUTH_SIGNIN_ENDPOINT}`,
    payload,
  );
  return result.data;
};
