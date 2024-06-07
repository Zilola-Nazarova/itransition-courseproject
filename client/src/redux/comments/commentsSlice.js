import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getComments = createAsyncThunk(
  'comments/getComments',
  async ({ userId, collId, itemId }, thunkAPI) => {
    try {
      const resp = await API.get(
        `/users/${userId}/collections/${collId}/items/${itemId}/comments`,
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postComment = createAsyncThunk(
  'comments/postComment',
  async ({
    userId, collId, itemId, newComment,
  }, thunkAPI) => {
    try {
      const resp = await API.post(
        `/users/${userId}/collections/${collId}/items/${itemId}/comments`,
        newComment,
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const updateComment = createAsyncThunk(
  'comments/updateComment',
  async ({
    userId, collId, itemId, commentId, updatedComment,
  }, thunkAPI) => {
    try {
      const resp = await API.patch(
        `/users/${userId}/collections/${collId}/items/${itemId}/comments/${commentId}`,
        updatedComment,
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteComment = createAsyncThunk(
  'comments/deleteComment',
  async ({
    userId, collId, itemId, commentId,
  }, thunkAPI) => {
    try {
      const resp = await API.delete(
        `/users/${userId}/collections/${collId}/items/${itemId}/comments/${commentId}`,
      );
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

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getComments.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getComments.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getComments.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = null;
      })
      .addCase(postComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value.push(action.payload);
      })
      .addCase(postComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(updateComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.map((comment) => (
          comment._id === action.payload._id ? action.payload : comment
        ));
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteComment.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.filter((comment) => (
          comment._id !== action.payload._id
        ));
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default commentsSlice.reducer;
