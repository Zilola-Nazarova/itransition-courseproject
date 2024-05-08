import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const ITEMS_URL = 'http://localhost:5000/items';

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
    'Item #1',
    'Item #2',
    'Item #3',
  ],
  isLoading: false,
  error: undefined,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
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

export default itemsSlice.reducer;
