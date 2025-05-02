import { apiBaseQuery } from '../api';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from '@/app/store';
// cartApi.ts
import { createApi } from '@reduxjs/toolkit/query/react';
import { useEffect } from 'react';
import { addToCart, clearCart, decreaseItem, fetchCart } from '@/app/store/reducers/cartReducer';

export const cartApi = createApi({
  reducerPath: 'cartApi',
  baseQuery: apiBaseQuery,
  tagTypes: ['Cart'],
  endpoints: (builder) => ({
    getCart: builder.query({
      query: () => 'cart/get',
      providesTags: ['Cart'],
    }),
    appendCart: builder.mutation({
      query: (data) => ({
        url: 'cart/products/append',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    removeCart: builder.mutation({
      query: (data) => ({
        url: 'cart/products/remove',
        method: 'PATCH',
        body: data,
      }),
      invalidatesTags: ['Cart'],
    }),
    clearCart: builder.mutation({
      query: () => ({
        url: 'cart/clear',
        method: 'DELETE',
      }),
      invalidatesTags: ['Cart'],
    }),
  }),
});

export const { useGetCartQuery, useAppendCartMutation, useRemoveCartMutation, useClearCartMutation } = cartApi;


export const useCart = () => {
  const dispatch = useDispatch<AppDispatch>();
  const cart = useSelector((state: RootState) => state.cart.items);
  const maxPoints = useSelector((state: RootState) => state.cart.max_points);
  const minPoints = useSelector((state: RootState) => state.cart.min_points);
  const cartStatus = useSelector((state: RootState) => state.cart.status);

  useEffect(() => {
    dispatch(fetchCart());
  }, [dispatch]);

  const handleAddToCart = (item_id: string) => {
    dispatch(addToCart({ item_id, count: 1 }));
  };

  const handleDecreaseItem = (item_id: string) => {
    dispatch(decreaseItem({ item_id, count: 1 }));
  };

  const handleClearCart = () => {
    dispatch(clearCart()); 
  }

  return {
    cart,
    cartStatus,
    handleAddToCart,
    handleDecreaseItem,
    handleClearCart,
    maxPoints,
    minPoints
  };
};
