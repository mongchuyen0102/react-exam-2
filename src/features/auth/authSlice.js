import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import authService from '../../services/auth.service';

export const loginUser = createAsyncThunk(
  'auth/login',
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.login({ email, password });
      let data = response.data.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/register',
  async ({ username, email, password }, { rejectWithValue }) => {
    try {
      const response = await authService.register({
        username,
        email,
        password,
      });
      let data = response.data;

      return data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  isLogged: false,
  user: null,
  token: null,
  isSuccess: false,
  isError: false,
  errorMessage: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState: initialState,
  reducers: {
    logout: (state) => {
      state.isLogged = false;
      state.user = null;
      state.token = null;
    },
    clear: (state) => {
      state.isSuccess = false;
      state.isError = false;
      state.errorMessage = null;
    },
  },
  extraReducers: {
    [loginUser.fulfilled]: (state, { payload: { payload, token } }) => {
      state.isLogged = true;
      state.user = payload;
      state.token = token;
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [loginUser.rejected]: (state, { payload: { message } }) => {
      state.errorMessage = message;
      state.isError = true;
    },
    [registerUser.fulfilled]: (state, { payload }) => {
      state.isSuccess = true;
      state.isError = false;
      state.errorMessage = null;
    },
    [registerUser.rejected]: (state, { payload: { message } }) => {
      state.errorMessage = message.message;
      state.isError = true;
    },
  },
});

export const { logout, clear } = authSlice.actions;
export const authSelector = (state) => state.auth;
