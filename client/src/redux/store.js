import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import usersReducer from './users/usersSlice';
import collectionsReducer from './collections/collectionsSlice';
import itemsReducer from './items/itemsSlice';
import authReducer from './auth/authSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    collections: collectionsReducer,
    items: itemsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
