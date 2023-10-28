import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts.js';
import { persistStore } from 'redux-persist';

export const store = configureStore({
  reducer: {
    contactsFilter: contactsReducer,
  },
});
