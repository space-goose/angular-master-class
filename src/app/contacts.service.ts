import {Injectable} from '@angular/core';
import {Contact} from './models/contact';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

interface ContactResponse {
  item: Contact;
}

interface ContactsResponse {
  items: Contact[];
}

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  private API_ENDPOINT = 'http://localhost:4201/api';

  constructor(private httpClient: HttpClient) {
  }

  getContacts(): Observable<Contact[]> {
    console.log('GOT DATA FROM SERVICE');
    return this.httpClient.get<ContactsResponse>(`${this.API_ENDPOINT}/contacts`).pipe(map((x) => x.items));
  }

  getContact(id: String): Observable<Contact> {
    return this.httpClient.get<ContactResponse>(`${this.API_ENDPOINT}/contacts/${id}`).pipe(map((x) => x.item));
  }

  updateContact(contact: Contact): Observable<Contact> {
    return this.httpClient.put<ContactResponse>(`${this.API_ENDPOINT}/contacts/${contact.id}`, contact).pipe(map((x) => x.item));
  }

  search(term: String): Observable<Contact[]> {
    return this.httpClient.get<ContactsResponse>(`${this.API_ENDPOINT}/search?text=${term}`).pipe(map((x) => x.items));
  }
}
