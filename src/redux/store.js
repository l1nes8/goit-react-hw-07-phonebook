import { configureStore } from '@reduxjs/toolkit';
import { contactsReducer } from './contacts.js';

export const store = configureStore({
  reducer: {
    contactsFilter: contactsReducer,
  },
});
