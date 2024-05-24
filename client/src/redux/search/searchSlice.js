import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getItemsBySearch = createAsyncThunk(
  'search/getItemsBySearch',
  async (searchQuery, thunkAPI) => {
    try {
      const resp = await API.get(`search?searchQuery=${searchQuery.search}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  searchResults: null,
  error: undefined,
  isLoading: false,
};

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getItemsBySearch.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getItemsBySearch.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.searchResults = action.payload;
      })
      .addCase(getItemsBySearch.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.searchResults = null;
      });
  },
});

export default searchSlice.reducer;
