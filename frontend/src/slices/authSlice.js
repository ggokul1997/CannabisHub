import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { authAPI } from '../utils/api';

export const initAuth = createAsyncThunk(
  'auth/initAuth',
  async (_, { rejectWithValue }) => {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }
    try {
      // Headers adderd with cookie and axios call response
      const response = await authAPI.getProfile();
      return response.data.user;
    } catch (error) {
      // Token may be invalid or expired; clear it
      localStorage.removeItem('token');
      return rejectWithValue(null);
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
  },
  reducers: {
    loginStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    loginFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    registerStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.token = action.payload.token;
      localStorage.setItem('token', action.payload.token);
    },
    registerFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    logout: (state) => {
      state.user = null;
      state.token = null;
      localStorage.removeItem('token');
    },
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(initAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(initAuth.fulfilled, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.user = action.payload;
        }
      })
      .addCase(initAuth.rejected, (state) => {
        state.loading = false;
        state.user = null;
        state.token = null;
      });
  }
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  registerStart,
  registerSuccess,
  registerFailure,
  logout,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;
