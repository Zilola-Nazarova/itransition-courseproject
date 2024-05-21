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

const initialState = {
  value: [],
  isLoading: false,
  error: undefined,
};

export const tagsSlice = createSlice({
  name: 'tags',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(getTags.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(getTags.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload;
      })
      .addCase(getTags.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.value = null;
      });
  },
});

export default tagsSlice.reducer;
