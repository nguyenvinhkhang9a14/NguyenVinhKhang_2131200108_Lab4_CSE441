import { createSlice, configureStore } from '@reduxjs/toolkit';

// Thay thế v4 bằng hàm tạo id đơn giản
const simpleId = () => Math.random().toString(36).substr(2, 9);

export const mapContacts = (contact) => {
  const { name, picture, phone, cell, email } = contact;
  return {
    id: simpleId(),
    name: name.first + ' ' + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    favorite: Math.random() < 0.1 ? true : false,
  };
};

const contactsSlice = createSlice({
  name: 'contacts', // Change 'counter' to 'contacts' for the slice name
  initialState: {
    contacts: [],
  },
  reducers: {
    fetchContactsSuccess: (state, action) => {
      state.contacts = action.payload;
    },
    toggleFavorite: (state, action) => {
      const id = action.payload;
      const contact = state.contacts.find(c => c.id === id);
      if (contact) {
        contact.favorite = !contact.favorite;
      }
    },
  },
});

export const { fetchContactsSuccess, toggleFavorite } = contactsSlice.actions;

const store = configureStore({
  reducer: {
    contacts: contactsSlice.reducer,
  },
});

export default store;
