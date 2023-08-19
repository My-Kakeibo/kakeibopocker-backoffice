import { useQuery, useMutation, dehydrate } from '@tanstack/react-query';
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUsers,
  updateUser,
} from './api';
import { TUserParams, TUserPayload } from './entities/request';
import {
  TUserDetailResponse,
  TUserPaginateResponse,
  TUserResponse,
} from './entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import { MASTERDATA_USER_HOOKS } from './constant';
import getQueryClient from '@/utils/getQueryClient';
import { TExpectMutationResult } from '@/utils/entities/hook';

export const useGetUsers = (
  value: TGetListHookParams<TUserParams, TUserPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-users', value.params],
    queryFn: () => getUsers(value.params),
    ...value.options,
  });
};

export const hydrateGetUsers = async (params?: TUserParams) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([MASTERDATA_USER_HOOKS.getAll, params], () =>
    getUsers(params),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useGetUserDetails = (
  value: TGetDetailHookParams<TUserResponse['id'], TUserDetailResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-user-details', value.id],
    queryFn: () => getUserDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const hydrateGetUserDetails = async (id: TUserResponse['id']) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([MASTERDATA_USER_HOOKS.getDetail, id], () =>
    getUserDetails(id),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useCreateUser = (): TExpectMutationResult<
  TUserDetailResponse,
  TUserPayload
> => {
  return useMutation(createUser);
};

export const useUpdateUser = (): TExpectMutationResult<
  TUserDetailResponse,
  TUpdateParams<TUserResponse['id'], TUserPayload>
> => {
  return useMutation(updateUser);
};

export const useDeleteUser = (): TExpectMutationResult<
  string,
  TUserResponse['id']
> => {
  return useMutation(deleteUser);
};
