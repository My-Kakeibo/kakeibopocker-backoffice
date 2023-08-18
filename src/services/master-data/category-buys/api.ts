import axios from '@/utils/axios';
import { MASTERDATA_CATEGORY_BUYS_ENDPOINT } from './constant';
import { TCategoryBuyParams, TCategoryBuyPayload } from './entities/request';
import {
  TCategoryBuyDetailResponse,
  TCategoryBuyPaginateResponse,
  TCategoryBuyResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getCategoryBuys = async (params?: TCategoryBuyParams) => {
  const result = await axios.get<TCategoryBuyPaginateResponse>(
    `${MASTERDATA_CATEGORY_BUYS_ENDPOINT}`,
    { params },
  );
  return result.data;
};

export const getCategoryBuyDetails = async (id: TCategoryBuyResponse['id']) => {
  const result = await axios.get<TCategoryBuyDetailResponse>(
    `${MASTERDATA_CATEGORY_BUYS_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createCategoryBuy = async (payload: TCategoryBuyPayload) => {
  const result = await axios.post<TCategoryBuyDetailResponse>(
    `${MASTERDATA_CATEGORY_BUYS_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateCategoryBuy = async (
  params: TUpdateParams<TCategoryBuyResponse['id'], TCategoryBuyPayload>,
) => {
  const result = await axios.patch<TCategoryBuyDetailResponse>(
    `${MASTERDATA_CATEGORY_BUYS_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteCategoryBuy = async (id: TCategoryBuyResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_CATEGORY_BUYS_ENDPOINT}/${id}`,
  );
  return result.data;
};
