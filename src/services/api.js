import axios from 'axios';

const contactsInstance = axios.create({
  baseURL: `https://653a3233e3b530c8d9e94c37.mockapi.io/contacts/`,
});

export const requestFetch = async () => {
  const { data } = await contactsInstance.get('/contacts');
  return data;
};

export const requestAddContact = async newProduct => {
  const { data } = await contactsInstance.post('/contacts', newProduct);
  return data;
};

export const requestDeleteContact = async productId => {
  const { data } = await contactsInstance.delete(`/contacts${productId}`);
  return data;
};
