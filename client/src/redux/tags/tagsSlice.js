import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getTags = createAsyncThunk(
  'tags/getTags',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/tags');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getTagItems = createAsyncThunk(
  'tags/getTagItems',
  async ({ tagId, page }, thunkAPI) => {
    try {
      const resp = await API.get(`/tags/${tagId}?page=${page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  value: [],
  tag: null,
  tagList: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: false,
  error: undefined,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTagItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getTagItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload.data.items;
        state.tag = action.payload.data.tag;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getTagItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.tagItems = null;
      })
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.tagList = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.tagList = null;
      });
  },
});

export default tagsSlice.reducer;
