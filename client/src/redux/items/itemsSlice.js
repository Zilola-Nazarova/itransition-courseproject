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
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  value: [
    {
      id: 1,
      name: 'Item #1',
    },
    {
      id: 2,
      name: 'Item #2',
    },
    {
      id: 3,
      name: 'Item #3',
    },
  ],
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
      });
  },
});

export const { createItem } = itemsSlice.actions;

export default itemsSlice.reducer;
