import React from 'react';
import css from 'form.module.css';

export default function ContactList({ contacts, onDeleteContact }) {
  return (
    <div>
      <ul>
        {contacts.map(contact => (
          <li className={css.item} key={contact.id}>
            {contact.name}: {contact.number}
            <button onClick={() => onDeleteContact(contact.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
