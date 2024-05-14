import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const GOOGLE_API_URL = 'https://www.googleapis.com/oauth2/v3/userinfo';

export const getUser = createAsyncThunk(
  'auth/getUser',
  async (token, thunkAPI) => {
    try {
      const user = await axios.get(GOOGLE_API_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return user.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  currentUser: JSON.parse(localStorage.getItem('profile')) || null,
  error: undefined,
  isAuthorizing: false,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.clear();
      state.currentUser = null;
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUser.pending, (state) => {
        state.isAuthorizing = true;
        state.error = false;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.isAuthorizing = false;
        state.error = false;
        localStorage.setItem('profile', JSON.stringify({ ...action.payload }));
        state.currentUser = action.payload;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.isAuthorizing = false;
        state.error = action.payload;
      });
  },
});

export const { logout } = authSlice.actions;

export default authSlice.reducer;
