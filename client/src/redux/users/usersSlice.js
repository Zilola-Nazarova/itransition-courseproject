import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';
const USERS_URL = `${BASE_URL}/users`;

export const getUsers = createAsyncThunk(
  'users/getUsers',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(USERS_URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const postUser = createAsyncThunk(
  'users/postUser',
  async (newUser, thunkAPI) => {
    try {
      const resp = await axios.post(USERS_URL, newUser);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const updateUser = createAsyncThunk(
  'users/updateUser',
  async (updatedUser, thunkAPI) => {
    try {
      const resp = await axios.patch(`${USERS_URL}/${updatedUser._id}`, updatedUser);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const deleteUser = createAsyncThunk(
  'users/deleteUser',
  async (id, thunkAPI) => {
    try {
      const resp = await axios.patch(`${USERS_URL}/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  value: [],
  isLoading: false,
  error: undefined,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.value.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getUsers.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value.push(action.payload);
      })
      .addCase(postUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.map((user) => (
          user._id === action.payload._id ? action.payload : user
        ));
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteUser.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.filter((user) => (
          user._id !== action.payload._id
        ));
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { createUser } = usersSlice.actions;

export default usersSlice.reducer;
