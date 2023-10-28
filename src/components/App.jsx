import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { RotatingLines } from 'react-loader-spinner';

import {
  fetchContacts,
  addContacthContacts,
  deleteContacts,
  setFilter,
} from 'redux/contacts';
import {
  selectContacts,
  selectIsLoading,
  selectEerror,
  selectFilter,
} from 'redux/contactsSelector';
import ContactForm from './ContactForm';
import Filter from './Filter';
import ContactList from './ContactList';

export function App() {
  const dispatch = useDispatch();
  const contacts = useSelector(selectContacts);
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectEerror);
  const filter = useSelector(selectFilter);

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const habdleAddContact = (name, number) => {
    const newContact = {
      name,
      number,
    };

    dispatch(addContacthContacts(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContacts(contactId));
  };

  const handleFilterTerm = ({ target: { value } }) => {
    dispatch(setFilter(value));
  };

  const getFilteredContacts = () => {
    const normalizedFilter = filter.toLowerCase();
    contacts !== undefined &&
      contacts.filter(contact =>
        contact.name.toLowerCase().includes(normalizedFilter)
      );
  };

  const filteredContacts = getFilteredContacts();

  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onAddContact={habdleAddContact} contacts={contacts} />
      <h2>Contacts</h2>
      {isLoading && (
        <RotatingLines
          strokeColor="grey"
          strokeWidth="5"
          animationDuration="0.75"
          width="96"
          visible={true}
        />
      )}
      {error && <h1>{error}</h1>}
      <Filter filter={filter} onFilterChange={handleFilterTerm} />
      <ContactList
        contacts={filteredContacts}
        onDeleteContact={handleDeleteContact}
      />
    </div>
  );
}
