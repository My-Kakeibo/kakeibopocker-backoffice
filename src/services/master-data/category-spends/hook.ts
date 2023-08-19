import { TExpectMutationResult } from '@/utils/entities/hook';
import {
  createCategorySpend,
  deleteCategorySpend,
  getCategorySpendDetails,
  getCategorySpends,
  updateCategorySpend,
} from './api';
import { MASTERDATA_CATEGORY_SPENDS_HOOKS } from './constant';
import {
  TCategorySpendParams,
  TCategorySpendPayload,
} from './entities/request';
import {
  TCategorySpendDetailResponse,
  TCategorySpendPaginateResponse,
  TCategorySpendResponse,
} from './entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
  TUpdateParams,
} from '@/utils/entities/request';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';

export const useGetCategorySpends = (
  value: TGetListHookParams<
    TCategorySpendParams,
    TCategorySpendPaginateResponse
  >,
) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_SPENDS_HOOKS.getAll, value.params],
    queryFn: () => getCategorySpends(value.params),
    ...value.options,
  });
};

export const hydrateGetCategorySpends = async (
  params?: TCategorySpendParams,
) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [MASTERDATA_CATEGORY_SPENDS_HOOKS.getAll, params],
    () => getCategorySpends(params),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useGetCategorySpendDetails = (
  value: TGetDetailHookParams<
    TCategorySpendResponse['id'],
    TCategorySpendDetailResponse
  >,
) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_SPENDS_HOOKS.getDetail, value.id],
    queryFn: () => getCategorySpendDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const hydrateGetCategorySpendDetails = async (
  id: TCategorySpendResponse['id'],
) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [MASTERDATA_CATEGORY_SPENDS_HOOKS.getDetail, id],
    () => getCategorySpendDetails(id),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useCreateCategorySpend = (): TExpectMutationResult<
  TCategorySpendDetailResponse,
  TCategorySpendPayload
> => {
  return useMutation(createCategorySpend);
};

export const useUpdateCategorySpend = (): TExpectMutationResult<
  TCategorySpendDetailResponse,
  TUpdateParams<TCategorySpendResponse['id'], TCategorySpendPayload>
> => {
  return useMutation(updateCategorySpend);
};

export const useDeleteCategorySpend = (): TExpectMutationResult<
  string,
  TCategorySpendResponse['id']
> => {
  return useMutation(deleteCategorySpend);
};
