import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';
import API from '../api';

export const createOdooToken = createAsyncThunk(
  'odoo/createOdooToken',
  async (_, thunkAPI) => {
    try {
      const resp = await API.get('odoo/token');
      return resp.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  },
);

const initialState = {
  value: Cookies.get('odoo') ? JSON.parse(Cookies.get('odoo')) : null,
  error: undefined,
  isLoading: false,
};

export const odooSlice = createSlice({
  name: 'odoo',
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(createOdooToken.pending, (state) => {
        state.isLoading = true;
        state.error = false;
      })
      .addCase(createOdooToken.fulfilled, (state, action) => {
        state.isLoading = false;
        state.error = false;
        state.value = action.payload.odooToken;
        Cookies.set('odoo', JSON.stringify(action.payload.odooToken), { expires: 1 / 24 });
      })
      .addCase(createOdooToken.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default odooSlice.reducer;
