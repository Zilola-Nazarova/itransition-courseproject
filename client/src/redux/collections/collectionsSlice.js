import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getCollections = createAsyncThunk(
  'collections/getCollections',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('/collections');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postCollection = createAsyncThunk(
  'collections/postCollection',
  async (newCollection, thunkAPI) => {
    try {
      const resp = await API.post('/collections', newCollection);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateCollection = createAsyncThunk(
  'collections/updateCollection',
  async (updatedCollection, thunkAPI) => {
    try {
      const resp = await API.patch(`/collections/${updatedCollection._id}`, updatedCollection);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteCollection = createAsyncThunk(
  'collections/deleteCollection',
  async (id, thunkAPI) => {
    try {
      const resp = await API.delete(`/collections/${id}`);
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

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {
    createCollection: (state, action) => {
      state.value.push(action.payload);
    },
  },
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
