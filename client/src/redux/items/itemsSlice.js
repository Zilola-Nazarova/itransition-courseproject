import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const BASE_URL = process.env.REACT_APP_API_ENDPOINT || 'https://itransition-courseproject-tljv.onrender.com';
const ITEMS_URL = `${BASE_URL}/items`;

export const getItems = createAsyncThunk(
  'items/getItems',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(ITEMS_URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postItem = createAsyncThunk(
  'items/postItem',
  async (newItem, thunkAPI) => {
    try {
      const resp = await axios.post(ITEMS_URL, newItem);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async (updatedItem, thunkAPI) => {
    try {
      const resp = await axios.patch(`${ITEMS_URL}/${updatedItem._id}`, updatedItem);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async (id, thunkAPI) => {
    try {
      const resp = await axios.delete(`${ITEMS_URL}/${id}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  value: [],
  isLoading: false,
  error: undefined,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {
    createItem: (state, action) => {
      state.value.push(action.payload);
    },
  },
  extraReducers(builder) {
    builder
      .addCase(getItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(postItem.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value.push(action.payload);
      })
      .addCase(postItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateItem.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.map((item) => (
          item._id === action.payload._id ? action.payload : item
        ));
      })
      .addCase(updateItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteItem.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.filter((item) => (
          item._id !== action.payload._id
        ));
      })
      .addCase(deleteItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { createItem } = itemsSlice.actions;

export default itemsSlice.reducer;
