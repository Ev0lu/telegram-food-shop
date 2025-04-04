import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { cartApi } from '@/shared/api/cart';

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

interface CartResponse {
  items: CartItem[];
  max_points: number;
  min_points: number;
}

interface CartState {
  items: CartItem[] | null;
  max_points: number;
  min_points: number;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}

const initialState: CartState = {
  items: null,
  status: 'idle',
  max_points: 0,
  min_points: 0
};

export const fetchCart = createAsyncThunk(
  'cart/fetchCart',
  async (_, { dispatch }) => {
    const response = await dispatch(cartApi.endpoints.getCart.initiate({}));
    return response.data.cart;
  }
);

export const addToCart = createAsyncThunk(
  'cart/addToCart',
  async ({ item_id }: { item_id: string; count: number }, { dispatch }) => {
    const response = await dispatch(
      cartApi.endpoints.appendCart.initiate({ products: [{ item_id, count: 1 }] })
    );
    return response.data.cart;
  }
);

export const decreaseItem = createAsyncThunk(
  'cart/decreaseItem',
  async ({ item_id }: { item_id: string; count: number }, { dispatch }) => {
    const response = await dispatch(
      cartApi.endpoints.removeCart.initiate({ products: [{ item_id, count: -1 }] })
    );
    return response.data.cart;
  }
);

export const clearCart = createAsyncThunk(
  'cart/clearCart',
  async (_, { dispatch }) => {
    const response = await dispatch(cartApi.endpoints.clearCart.initiate({}));
    return response.data.cart;
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.status = 'succeeded';
        state.items = action.payload.items;
        state.max_points = action.payload.max_points;
        state.min_points = action.payload.min_points;
      })
      .addCase(fetchCart.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(addToCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.max_points = action.payload.max_points;
        state.min_points = action.payload.min_points;
      })
      .addCase(decreaseItem.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.max_points = action.payload.max_points;
        state.min_points = action.payload.min_points;
      })
      .addCase(clearCart.fulfilled, (state, action: PayloadAction<CartResponse>) => {
        state.items = action.payload.items;
        state.max_points = action.payload.max_points;
        state.min_points = action.payload.min_points;
      });
  },
});

export default cartSlice.reducer;
