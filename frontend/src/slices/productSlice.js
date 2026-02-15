import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
  name: 'products',
  initialState: {
    products: [],
    product: null,
    loading: false,
    error: null,
    filters: {
      category: null,
      minTHC: 0,
      maxTHC: 100,
      search: '',
    },
  },
  reducers: {
    fetchProductsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductsSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload;
    },
    fetchProductsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchProductStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchProductSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload;
    },
    fetchProductFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        category: null,
        minTHC: 0,
        maxTHC: 100,
        search: '',
      };
    },
  },
});

export const {
  fetchProductsStart,
  fetchProductsSuccess,
  fetchProductsFailure,
  fetchProductStart,
  fetchProductSuccess,
  fetchProductFailure,
  setFilters,
  clearFilters,
} = productSlice.actions;

export default productSlice.reducer;
