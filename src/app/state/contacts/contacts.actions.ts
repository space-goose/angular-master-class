import {Action} from '@ngrx/store';
import {Contact} from '../../models/contact';

export enum ContactsActionTypes {
  LOAD_CONTACTS_SUCCESS = '[Contacts] Load success',
  SELECT_CONTACT = '[Contact] Select',
  UPDATE_CONTACT = '[Contact] Update'
}

/** Implement LoadContactsSuccessAction class here */
export class LoadContactsSuccessAction implements Action {
  readonly type = ContactsActionTypes.LOAD_CONTACTS_SUCCESS;

  constructor(public payload: Array<Contact>) {
  }
}

export class SelectContactAction implements Action {
  readonly type = ContactsActionTypes.SELECT_CONTACT;

  constructor(public payload: number) {
  }
}

export class UpdateContactAction implements Action {
  readonly type = ContactsActionTypes.UPDATE_CONTACT;

  constructor(public payload: Contact) {
  }
}

export type ContactsActions = LoadContactsSuccessAction | SelectContactAction | UpdateContactAction;


