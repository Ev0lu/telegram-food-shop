// cartSlice.ts
import { cartApi } from '@/shared/api/cart';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

// Получение корзины
export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { dispatch }) => {
    const response = await dispatch(cartApi.endpoints.getCart.initiate({}));
    return response.data.cart.items; // Возвращаем товары в корзине
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ item_id }: { item_id: string; count: number }, { dispatch }) => {
    const response = await dispatch(
      cartApi.endpoints.appendCart.initiate({"products": [{ item_id, count: 1 }]})
    );
    return response.data.cart.items;  // Возвращаем обновленную корзину
  }
);

export const decreaseItem = createAsyncThunk(
  'cart/decreaseItem',
  async ({ item_id }: { item_id: string; count: number }, { dispatch }) => {
    const response = await dispatch(
      cartApi.endpoints.removeCart.initiate({"products": [{ item_id, count: -1 }]})
    );
    return response.data.cart.items;
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    const response = await dispatch(cartApi.endpoints.clearCart.initiate({}));
    return response.data.cart.items;
  }
)

interface CartItem {
  item: {
    entry_id: string;
    title: string;
    price: number;
    picture_url: string;
    product_quantity: string;
  };
  count: number;
}

interface CartState {
  items: CartItem[] | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  items: null,
  status: 'idle',
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.status = 'succeeded';
        state.items = action.payload;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(decreaseItem.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      })
      .addCase(clearCart.fulfilled, (state, action: PayloadAction<CartItem[]>) => {
        state.items = action.payload;
      });
  },
});

export default cartSlice.reducer;
