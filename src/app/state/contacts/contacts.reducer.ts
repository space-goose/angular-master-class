import { Contact } from '../../models/contact';
import {ContactsActions, ContactsActionTypes} from './contacts.actions';
import {find} from 'rxjs/operators';

export interface ContactsState {
  list: Array<Contact>;
  number;
}

const INITIAL_STATE: ContactsState = {
  list: [],
  number: null
};

export function contactsReducer(state: ContactsState = INITIAL_STATE, action: ContactsActions) {
  switch (action.type) {
    case ContactsActionTypes.LOAD_CONTACTS_SUCCESS:
      return {
        ...state, list: action.payload
      };
    case ContactsActionTypes.SELECT_CONTACT:
      return {
        ...state, number: action.payload
      };
    case ContactsActionTypes.UPDATE_CONTACT:
      const updatedList = state.list.map(contact => {
        return contact.id === action.payload.id
          ? { ...contact, ...action.payload }
          : contact;
      });

      return { ...state, list: updatedList };
  }

  return state;
}
