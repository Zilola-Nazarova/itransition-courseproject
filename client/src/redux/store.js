import { configureStore } from '@reduxjs/toolkit';
import { logger } from 'redux-logger';
import usersReducer from './users/usersSlice';
import collectionsReducer from './collections/collectionsSlice';
import itemsReducer from './items/itemsSlice';
import authReducer from './auth/authSlice';
import likesReducer from './likes/likesSlice';
import commentsReducer from './comments/commentsSlice';
import tagsReducer from './tags/tagsSlice';
import categoriesReducer from './categories/categoriesSlice';
import homeReducer from './home/homeSlice';
import searchReducer from './search/searchSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
    collections: collectionsReducer,
    items: itemsReducer,
    comments: commentsReducer,
    likes: likesReducer,
    tags: tagsReducer,
    categories: categoriesReducer,
    home: homeReducer,
    search: searchReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;
