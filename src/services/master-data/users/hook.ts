import { useQuery, useMutation } from '@tanstack/react-query';
import { createUser, deleteUser, getUserDetails, getUsers, updateUser } from './api';
import { TUserParams, TUserPayload } from './entities/request';
import { TUserDetailResponse, TUserPaginateResponse, TUserResponse } from './entities/response';
import { TGetDetailHookParams, TGetListHookParams, TUpdateHookParams } from '@/utils/entities/request';

export const useGetUsers = (value: TGetListHookParams<TUserParams, TUserPaginateResponse>) => {
  return useQuery({
    queryKey: ['get-masterdata-users', value.params],
    queryFn: () => getUsers(value.params || {}),
    ...value.options,
  });
};

export const useGetUserDetails = (value: TGetDetailHookParams<TUserResponse['id'], TUserDetailResponse>) => {
  return useQuery({
    queryKey: ['get-masterdata-user-details', value.id],
    queryFn: () => getUserDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useCreateUser = () => {
  return useMutation(createUser);
};

export const useUpdateUser = (value: TUpdateHookParams<TUserResponse['id'], TUserPayload>) => {
  return useMutation(() => updateUser(value.id, value.payload));
};

export const useDeleteUser = (id: TUserResponse['id']) => {
  return useMutation(() => deleteUser(id));
};
