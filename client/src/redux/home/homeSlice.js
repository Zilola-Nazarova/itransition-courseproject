import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getLargestCollections = createAsyncThunk(
  'home/getLargestCollections',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/home/largest');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getRecentItems = createAsyncThunk(
  'home/getRecentItems',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/home/latest');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getPopularTags = createAsyncThunk(
  'home/getPopularTags',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/home/tags');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  largestCollections: [],
  recentItems: [],
  popularTags: [],
  error: undefined,
  isLoading: false,
};

export const homeSlice = createSlice({
  name: 'home',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLargestCollections.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getLargestCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.largestCollections = action.payload;
      })
      .addCase(getLargestCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.largestCollections = null;
      })
      .addCase(getRecentItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getRecentItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.recentItems = action.payload;
      })
      .addCase(getRecentItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.recentItems = action.null;
      })
      .addCase(getPopularTags.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getPopularTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.popularTags = action.payload;
      })
      .addCase(getPopularTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.popularTags = null;
      });
  },
});

export default homeSlice.reducer;
