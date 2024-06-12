import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import Cookies from 'js-cookie';

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';
const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';
const SIGNIN_URL = `${BASE_URL}/auth/signin`;
const SIGNUP_URL = `${BASE_URL}/auth/signup`;

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token, thunkAPI) => {
    try {
      const user = await axios.get(GOOGLE_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return { user: user.data, token: { token, type: 'oauth/google' } };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const signin = createAsyncThunk(
  'auth/signin',
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const user = await axios.post(SIGNIN_URL, formData);
      navigate('/');
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const signup = createAsyncThunk(
  'auth/signup',
  async ({ formData, navigate }, thunkAPI) => {
    try {
      const user = await axios.post(SIGNUP_URL, formData);
      navigate('/');
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  user: Cookies.get('profile') ? JSON.parse(Cookies.get('profile')) : null,
  error: undefined,
  isAuthenticating: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      Cookies.remove('profile');
      Cookies.remove('odoo');
      state.user = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthenticating = true;
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.error = false;
        state.user = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.payload;
      })
      .addCase(signin.pending, (state) => {
        state.isAuthenticating = true;
        state.error = false;
      })
      .addCase(signin.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.error = false;
        Cookies.set('profile', JSON.stringify(action.payload), { expires: 1 / 24 });
        state.user = action.payload;
      })
      .addCase(signin.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.payload;
      })
      .addCase(signup.pending, (state) => {
        state.isAuthenticating = true;
        state.error = false;
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.isAuthenticating = false;
        state.error = false;
        Cookies.set('profile', JSON.stringify(action.payload), { expires: 1 / 24 });
        state.user = action.payload;
      })
      .addCase(signup.rejected, (state, action) => {
        state.isAuthenticating = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
