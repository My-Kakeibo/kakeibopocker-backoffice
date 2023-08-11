import { createCategoryBuy, deleteCategoryBuy, getCategoryBuyDetails, getCategoryBuys, updateCategoryBuy } from './api';
import { MASTERDATA_CATEGORY_BUYS_HOOKS } from './constant';
import { TCategoryBuyParams, TCategoryBuyPayload } from './entities/request';
import { TCategoryBuyDetailResponse, TCategoryBuyPaginateResponse, TCategoryBuyResponse } from './entities/response';
import { TGetDetailHookParams, TGetListHookParams, TUpdateHookParams } from '@/utils/entities/request';
import getQueryClient from '@/utils/getQueryClient';
import { dehydrate, useMutation, useQuery } from '@tanstack/react-query';

export const useGetCategoryBuys = (value: TGetListHookParams<TCategoryBuyParams, TCategoryBuyPaginateResponse>) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_BUYS_HOOKS.getAll],
    queryFn: () => getCategoryBuys(value.params),
    ...value.options,
  });
};

export const useHydrateGetCategoryBuys = async (params?: TCategoryBuyParams) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([MASTERDATA_CATEGORY_BUYS_HOOKS.getAll], () => getCategoryBuys(params));
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useGetCategoryBuyDetails = (
  value: TGetDetailHookParams<TCategoryBuyResponse['id'], TCategoryBuyDetailResponse>,
) => {
  return useQuery({
    queryKey: [MASTERDATA_CATEGORY_BUYS_HOOKS.getDetail, value.id],
    queryFn: () => getCategoryBuyDetails(value.id),
    enabled: !!value.id,
    ...value.options,
  });
};

export const useHydrateGetCategoryBuyDetails = async (id: TCategoryBuyResponse['id']) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery([MASTERDATA_CATEGORY_BUYS_HOOKS.getDetail], () => getCategoryBuyDetails(id));
  const dehydratedState = dehydrate(queryClient);

  return {
    dehydratedState,
  };
};

export const useCreateCategoryBuy = () => {
  return useMutation(createCategoryBuy);
};

export const useUpdateCategoryBuy = (value: TUpdateHookParams<TCategoryBuyResponse['id'], TCategoryBuyPayload>) => {
  return useMutation(() => updateCategoryBuy(value.id, value.payload));
};

export const useDeleteCategoryBuy = (id: TCategoryBuyResponse['id']) => {
  return useMutation(() => deleteCategoryBuy(id));
};
