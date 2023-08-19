import axios from '@/utils/axios';
import { MASTERDATA_CATEGORY_SPENDS_ENDPOINT } from './constant';
import {
  TCategorySpendParams,
  TCategorySpendPayload,
} from './entities/request';
import {
  TCategorySpendDetailResponse,
  TCategorySpendPaginateResponse,
  TCategorySpendResponse,
} from './entities/response';
import { TUpdateParams } from '@/utils/entities/request';

export const getCategorySpends = async (params?: TCategorySpendParams) => {
  params = params || {};
  const result = await axios.get<TCategorySpendPaginateResponse>(
    `${MASTERDATA_CATEGORY_SPENDS_ENDPOINT}`,
    { params: params || {} },
  );
  return result.data;
};

export const getCategorySpendDetails = async (
  id: TCategorySpendResponse['id'],
) => {
  const result = await axios.get<TCategorySpendDetailResponse>(
    `${MASTERDATA_CATEGORY_SPENDS_ENDPOINT}/${id}`,
  );
  return result.data;
};

export const createCategorySpend = async (payload: TCategorySpendPayload) => {
  const result = await axios.post<TCategorySpendDetailResponse>(
    `${MASTERDATA_CATEGORY_SPENDS_ENDPOINT}`,
    payload,
  );
  return result.data;
};

export const updateCategorySpend = async (
  params: TUpdateParams<TCategorySpendResponse['id'], TCategorySpendPayload>,
) => {
  const result = await axios.patch<TCategorySpendDetailResponse>(
    `${MASTERDATA_CATEGORY_SPENDS_ENDPOINT}/${params.id}`,
    params.payload,
  );
  return result.data;
};

export const deleteCategorySpend = async (id: TCategorySpendResponse['id']) => {
  const result = await axios.delete<string>(
    `${MASTERDATA_CATEGORY_SPENDS_ENDPOINT}/${id}`,
  );
  return result.data;
};
