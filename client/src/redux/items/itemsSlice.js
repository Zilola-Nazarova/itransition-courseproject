import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    'Item #1',
    'Item #2',
    'Item #3',
  ],
  isLoading: false,
  error: undefined,
};

export const itemsSlice = createSlice({
  name: 'items',
  initialState,
  reducers: {},
});

export default itemsSlice.reducer;
