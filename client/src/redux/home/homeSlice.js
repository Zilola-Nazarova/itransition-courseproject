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

export const getLatestItems = createAsyncThunk(
  'home/getLatestItems',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/home/latest');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getTagsCloud = createAsyncThunk(
  'home/getTagsCloud',
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
  latestItems: [],
  tagsCloud: [],
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
      .addCase(getLatestItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getLatestItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.latestItems = action.payload;
      })
      .addCase(getLatestItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.latestItems = action.null;
      })
      .addCase(getTagsCloud.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getTagsCloud.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.tagsCloud = action.payload;
      })
      .addCase(getTagsCloud.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.tagsCloud = null;
      });
  },
});

export default homeSlice.reducer;
