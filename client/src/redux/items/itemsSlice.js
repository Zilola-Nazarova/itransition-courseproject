import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getCollectionItems = createAsyncThunk(
  'items/getCollectionItems',
  async ({ userId, collId }, thunkAPI) => {
    try {
      const resp = await API.get(`users/${userId}/collections/${collId}/items`);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postItem = createAsyncThunk(
  'items/postItem',
  async ({ userId, collId, newItem }, thunkAPI) => {
    try {
      const resp = await API.post(`users/${userId}/collections/${collId}/items`, newItem);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateItem = createAsyncThunk(
  'items/updateItem',
  async ({ userId, collId, itemId, updatedItem }, thunkAPI) => {
    try {
      const resp = await API.patch(`users/${userId}/collections/${collId}/items/${itemId}`, updatedItem);
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteItem = createAsyncThunk(
  'items/deleteItem',
  async ({ userId, collId, itemId }, thunkAPI) => {
    try {
      const resp = await API.delete(`users/${userId}/collections/${collId}/items/${itemId}`);
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
      .addCase(getCollectionItems.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getCollectionItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getCollectionItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = null;
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
