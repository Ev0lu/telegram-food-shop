import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../api';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getUserInfo: builder.query({
      query: (telegramId) => `users/${telegramId}`,
    }),
    getUserOrders: builder.query({
      query: (telegramId) => `users/orders/${telegramId}`,
    }),
  }),
});

export const { useGetUserInfoQuery, useGetUserOrdersQuery } = userApi;
