import React from 'react';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <div>
      {contacts !== undefined && (
        <ul>
          {contacts.map(contact => (
            <li key={contact.id}>
              {contact.name}: {contact.phone}
              <button onClick={() => onDeleteContact(contact.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
