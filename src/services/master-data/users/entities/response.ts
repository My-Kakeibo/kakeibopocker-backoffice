import { TPaginateResponse, TResponseData } from '@/utils/entities/response';

export type TUserResponse = {
  id: number;
  email: string;
  name: string;
};

export type TUserPaginateResponse = TPaginateResponse<TUserResponse>;

export type TUserDetailResponse = TResponseData<TUserResponse>;
