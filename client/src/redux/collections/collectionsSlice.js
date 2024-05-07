import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  value: [
    'Collection #1',
    'Collection #2',
    'Collection #3',
  ],
  isLoading: false,
  error: undefined,
};

export const collectionsSlice = createSlice({
  name: 'collections',
  initialState,
  reducers: {},
});

export default collectionsSlice.reducer;
