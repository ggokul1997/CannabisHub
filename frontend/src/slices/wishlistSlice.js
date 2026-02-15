import { createSlice } from '@reduxjs/toolkit';

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    wishlists: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchWishlistStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchWishlistSuccess: (state, action) => {
      state.loading = false;
      state.wishlists = action.payload;
    },
    fetchWishlistFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    addToWishlistSuccess: (state, action) => {
      state.wishlists.push(action.payload);
    },
    removeFromWishlistSuccess: (state, action) => {
      state.wishlists = state.wishlists.filter(
        (item) => item.productId._id !== action.payload
      );
    },
  },
});

export const {
  fetchWishlistStart,
  fetchWishlistSuccess,
  fetchWishlistFailure,
  addToWishlistSuccess,
  removeFromWishlistSuccess,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;
