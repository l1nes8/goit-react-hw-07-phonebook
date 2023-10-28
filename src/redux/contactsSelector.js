export const selectContacts = state => state.contactsFilter.contacts.items;
export const selectIsLoading = state => state.contactsFilter.contacts.isLoading;
export const selectError = state => state.contactsFilter.contacts.error;
export const selectFilter = state => state.contactsFilter.filter;
