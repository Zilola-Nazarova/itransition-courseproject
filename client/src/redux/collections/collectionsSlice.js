import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const COLLECTIONS_URL = 'http://localhost:5000/collections';

export const getCollections = createAsyncThunk(
  'collections/getCollections',
  async (_, thunkAPI) => {
    try {
      const resp = await axios.get(COLLECTIONS_URL);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

const initialState = {
  value: [
    'Collection #1',
    'Collection #2',
    'Collection #3',
  ],
  isLoading: false,
  error: undefined,
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getCollections.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default collectionsSlice.reducer;
