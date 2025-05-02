import { createApi } from '@reduxjs/toolkit/query/react';
import { apiBaseQuery } from '../api';

export const paymentsApi = createApi({
  reducerPath: 'paymentsApi',
  baseQuery: apiBaseQuery,
  endpoints: (builder) => ({
    getPointsPrice: builder.query({
      query: () => '/points/price',
    }),
    createPayment: builder.mutation({
      query: (body) => ({
        url: '/payments/create/points',
        method: 'POST',
        body,
      }),
    }),
  }),
});

export const { useGetPointsPriceQuery, useCreatePaymentMutation } = paymentsApi;
