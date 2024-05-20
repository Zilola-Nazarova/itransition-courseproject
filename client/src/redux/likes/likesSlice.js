import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API from '../api';

export const getLikes = createAsyncThunk(
  'likes/getLikes',
  async ({ userId, collId, itemId }, thunkAPI) => {
    try {
      const resp = await API.get(
        `/users/${userId}/collections/${collId}/items/${itemId}/likes`,
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const postLike = createAsyncThunk(
  'likes/postLike',
  async ({ userId, collId, itemId }, thunkAPI) => {
    try {
      const resp = await API.post(
        `/users/${userId}/collections/${collId}/items/${itemId}/likes`,
      );
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

export const deleteLike = createAsyncThunk(
  'likes/deleteLike',
  async ({
    userId, collId, itemId, likeId,
  }, thunkAPI) => {
    try {
      const resp = await API.delete(
        `/users/${userId}/collections/${collId}/items/${itemId}/likes/${likeId}`,
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

export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getLikes.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getLikes.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getLikes.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = null;
      })
      .addCase(postLike.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(postLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value.push(action.payload);
      })
      .addCase(postLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(deleteLike.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(deleteLike.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = state.value.filter((like) => (
          like._id !== action.payload._id
        ));
      })
      .addCase(deleteLike.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default likesSlice.reducer;
