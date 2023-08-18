import {
  createCategoryBuy,
  deleteCategoryBuy,
  getCategoryBuyDetails,
  getCategoryBuys,
  updateCategoryBuy,
} from './api';
import { MASTERDATA_CATEGORY_BUYS_HOOKS } from './constant';
import { TCategoryBuyParams } from './entities/request';
import {
  TCategoryBuyDetailResponse,
  TCategoryBuyPaginateResponse,
  TCategoryBuyResponse,
} from './entities/response';
import {
  TGetDetailHookParams,
  TGetListHookParams,
} from '@/utils/entities/request';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';

export const useGetCategoryBuys = (
  value: TGetListHookParams<TCategoryBuyParams, TCategoryBuyPaginateResponse>,
) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_BUYS_HOOKS.getAll, value.params],
    queryFn: () => getCategoryBuys(value.params),
    ...value.options,
  });
};

export const hydrateGetCategoryBuys = async (params?: TCategoryBuyParams) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [MASTERDATA_CATEGORY_BUYS_HOOKS.getAll, params],
    () => getCategoryBuys(params),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useGetCategoryBuyDetails = (
  value: TGetDetailHookParams<
    TCategoryBuyResponse['id'],
    TCategoryBuyDetailResponse
  >,
) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_BUYS_HOOKS.getDetail, value.id],
    queryFn: () => getCategoryBuyDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const hydrateGetCategoryBuyDetails = async (
  id: TCategoryBuyResponse['id'],
) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(
    [MASTERDATA_CATEGORY_BUYS_HOOKS.getDetail, id],
    () => getCategoryBuyDetails(id),
  );
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useCreateCategoryBuy = () => {
  return useMutation(createCategoryBuy);
};

export const useUpdateCategoryBuy = () => {
  return useMutation(updateCategoryBuy);
};

export const useDeleteCategoryBuy = () => {
  return useMutation(deleteCategoryBuy);
};
