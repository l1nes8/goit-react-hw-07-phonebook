import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  requestFetch,
  requestAddContact,
  requestDeleteContact,
} from 'services/api';

export const fetchContacts = createAsyncThunk(
  `contacts/getAll`,
  async (_, thunkAPI) => {
    try {
      const contacts = await requestFetch();

      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

export const addContacthContacts = createAsyncThunk(
  `contacts/addContact`,
  async (newContact, thunkAPI) => {
    try {
      const contacts = await requestAddContact(newContact);

      return contacts;
    } catch (error) {
      return thunkAPI.requestDeleteContact(error.message);
    }
  }
);

export const deleteContacts = createAsyncThunk(
  `contacts/deleteContact`,
  async (contactId, thunkAPI) => {
    try {
      const contacts = await requestDeleteContact(contactId);

      return contacts;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const INITIAL_STATE = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
};

const contactsSlice = createSlice({
  name: 'contacts',
  initialState: INITIAL_STATE,
  reducers: {
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

      .addCase(addContacthContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContacthContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = [action.payload, ...state.contacts.items];
      })
      .addCase(addContacthContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })

      .addCase(deleteContacts.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContacts.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = state.contacts.items.filter(
          contact => contact.id !== action.payload.id
        );
      })
      .addCase(deleteContacts.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      }),
});

export const { setFilter } = contactsSlice.actions;
export const contactsReducer = contactsSlice.reducer;
