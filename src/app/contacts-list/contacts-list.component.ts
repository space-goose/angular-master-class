import {Component, Injectable, OnInit} from '@angular/core';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {Subject} from 'rxjs/internal/Subject';
import {Observable} from 'rxjs/internal/Observable';
import {debounceTime, distinctUntilChanged, startWith, switchMap} from 'rxjs/operators';
import {EventBusService} from '../event-bus.service';
import {ApplicationState} from '../state/app.state';
import {select, Store} from '@ngrx/store';
import {LoadContactsSuccessAction} from '../state/contacts/contacts.actions';

@Component({
  selector: 'trm-contacts-list',
  templateUrl: './contacts-list.component.html',
  styleUrls: ['./contacts-list.component.css']
})
@Injectable()
export class ContactsListComponent implements OnInit {

  contacts$: Observable<Contact[]>;
  terms$ = new Subject<string>();

  constructor(private eventBus: EventBusService,
              private contactsService: ContactsService,
              private applicationState: Store<ApplicationState>) {
  }

  ngOnInit(): void {
    this.eventBus.emit('appTitleChange', 'LIST');
    const query = (state) => state.contacts.list;

    this.contacts$ = this.applicationState.pipe(select(query));

    this.terms$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      startWith(''),
      switchMap(term => this.contactsService.search(term))).subscribe(contacts =>
      this.applicationState.dispatch(new LoadContactsSuccessAction(contacts))
    );
  }

  trackByFn(index: number, contact: Contact) {
    return contact.id;
  }
}
