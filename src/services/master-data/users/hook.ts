import { useQuery, useMutation, dehydrate } from '@tanstack/react-query';
import {
  createUser,
  deleteUser,
  getUserDetails,
  getUsers,
  updateUser,
} from './api';
import { TUserParams } from './entities/request';
import {
  TUserDetailResponse,
  TUserPaginateResponse,
  TUserResponse,
} from './entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
} from '@/utils/entities/request';
import { MASTERDATA_USER_HOOKS } from './constant';
import getQueryClient from '@/utils/getQueryClient';

export const useGetUsers = (
  value: TGetListHookParams<TUserParams, TUserPaginateResponse>,
) => {
  return useQuery({
    queryKey: ['get-masterdata-users', value.params],
    queryFn: () => getUsers(value.params || {}),
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

export const useCreateUser = () => {
  return useMutation(createUser);
};

export const useUpdateUser = () => {
  return useMutation(updateUser);
};

export const useDeleteUser = () => {
  return useMutation(deleteUser);
};
