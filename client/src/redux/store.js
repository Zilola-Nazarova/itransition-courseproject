import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import collectionsReducer from './collections/collectionsSlice';
import itemsReducer from './items/itemsSlice';

const store = configureStore({
  reducer: {
    collections: collectionsReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
