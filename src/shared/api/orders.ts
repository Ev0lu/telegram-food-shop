import { apiBaseQuery } from '../api';
import { createApi } from '@reduxjs/toolkit/query/react';

export const orderApi = createApi({
  reducerPath: 'orderApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Orders'],
  endpoints: (builder) => ({
    getOrder: builder.query({
      query: (orderId) => `orders/${orderId}`,
      providesTags: ['Orders'],
    }),
    createOrder: builder.mutation({
      query: (data) => ({
        url: 'orders/create',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Orders'], 
    }),
    deprecateOrder: builder.mutation({
      query: (order_id) => ({
        url: `/orders/${order_id}/deprecate`,
        method: 'POST',
      }),
      invalidatesTags: ['Orders'], 
    }),
  }),
});

export const { 
  useGetOrderQuery, 
  useCreateOrderMutation, 
  useDeprecateOrderMutation 
} = orderApi;
