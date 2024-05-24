import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getUserCollections = createAsyncThunk(
  'collections/getUserCollections',
  async ({ userId, page }, thunkAPI) => {
    try {
      const resp = await API.get(`users/${userId}/collections?page=${page}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const getCollection = createAsyncThunk(
  'collections/getCollection',
  async ({ userId, collId }, thunkAPI) => {
    try {
      const resp = await API.get(`users/${userId}/collections/${collId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postCollection = createAsyncThunk(
  'collections/postCollection',
  async ({ userId, newCollection }, thunkAPI) => {
    try {
      const resp = await API.post(`users/${userId}/collections`, newCollection);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateCollection = createAsyncThunk(
  'collections/updateCollection',
  async ({ userId, collId, updatedCollection }, thunkAPI) => {
    try {
      const resp = await API.patch(`users/${userId}/collections/${collId}`, updatedCollection);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteCollection = createAsyncThunk(
  'collections/deleteCollection',
  async ({ userId, collId }, thunkAPI) => {
    try {
      const resp = await API.delete(`users/${userId}/collections/${collId}`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  collection: null,
  value: [],
  currentPage: 1,
  numberOfPages: 1,
  isLoading: false,
  error: undefined,
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getUserCollections.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getUserCollections.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload.data;
        state.currentPage = action.payload.currentPage;
        state.numberOfPages = action.payload.numberOfPages;
      })
      .addCase(getUserCollections.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = null;
      })
      .addCase(getCollection.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.collection = action.payload;
      })
      .addCase(getCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.collection = null;
      })
      .addCase(postCollection.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value.push(action.payload);
      })
      .addCase(postCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateCollection.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.map((collection) => (
          collection._id === action.payload._id ? action.payload : collection
        ));
      })
      .addCase(updateCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteCollection.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteCollection.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.filter((collection) => (
          collection._id !== action.payload._id
        ));
      })
      .addCase(deleteCollection.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export const { createCollection } = collectionsSlice.actions;

export default collectionsSlice.reducer;
