import { configureStore } from '@reduxjs/toolkit';
import { cartApi } from '@/shared/api/cart';
import cartReducer from './reducers/cartReducer';
import { productsApi } from '@/shared/api/products';
import { userApi } from '@/shared/api/buyer-info';
import { orderApi } from '@/shared/api/orders';
import { staffOrdersApi } from '@/shared/api/staff-order';
import { paymentsApi } from '@/shared/api/points';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
    [staffOrdersApi.reducerPath]: staffOrdersApi.reducer,
    [paymentsApi.reducerPath]: paymentsApi.reducer

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(cartApi.middleware).concat(productsApi.middleware).concat(userApi.middleware).concat(orderApi.middleware).concat(staffOrdersApi.middleware).concat(paymentsApi.middleware),
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;