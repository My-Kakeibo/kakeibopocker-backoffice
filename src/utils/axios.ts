import Axios, { AxiosError, AxiosResponse } from 'axios';
import { camelizeKeys, decamelizeKeys } from 'humps';
import { getSession, signOut } from 'next-auth/react';

const axios = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

axios.interceptors.response.use(
  (response: AxiosResponse) => {
    if (
      response.data &&
      response.headers['content-type'] === 'application/json; charset=utf-8'
    ) {
      response.data = camelizeKeys(response.data);
    }

    return response;
  },
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      signOut();
    }

    if (
      error.response?.data &&
      error.response?.headers['content-type'] ===
        'application/json; charset=utf-8'
    ) {
      error.response.data = camelizeKeys(error.response.data);
    }

    throw error.response?.data;
  },
);

axios.interceptors.request.use(async (config) => {
  const newConfig = { ...config };

  const session = await getSession();
  if (session?.accessToken) {
    newConfig.headers.Authorization = `Bearer ${session.accessToken}`;
  }

  if (newConfig.headers['Content-Type'] === 'multipart/form-data')
    return newConfig;

  if (config.params) {
    newConfig.params = decamelizeKeys(config.params);
  }

  if (config.data) {
    newConfig.data = decamelizeKeys(config.data);
  }
  return newConfig;
});

export default axios;
