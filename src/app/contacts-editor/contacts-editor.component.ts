import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ContactsService} from '../contacts.service';
import {Contact} from '../models/contact';
import {EventBusService} from '../event-bus.service';
import {select, Store} from '@ngrx/store';
import {ApplicationState} from '../state/app.state';
import {SelectContactAction, UpdateContactAction} from '../state/contacts/contacts.actions';
import {Observable} from 'rxjs/internal/Observable';
import {map} from 'rxjs/operators';

@Component({
  selector: 'trm-contacts-editor',
  templateUrl: './contacts-editor.component.html',
  styleUrls: ['./contacts-editor.component.css']
})
export class ContactsEditorComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private eventBus: EventBusService,
              private contactService: ContactsService,
              private activatedRoute: ActivatedRoute,
              private route: Router,
              private applicationState: Store<ApplicationState>) {
  }

  ngOnInit() {
    const contactId = this.activatedRoute.snapshot.params['id'];
    this.applicationState.dispatch(new SelectContactAction(+contactId));

    this.contact$ = this.applicationState.pipe(select(state => {
        const selectedId = state.contacts.number;
        return state.contacts.list.find(contact => contact.id === selectedId);
      }),
      map(contact => ({...contact}))
    );
  }

///    this.eventBus.emit('appTitleChange', `EDIT - ${this.contact.name}`)'

  cancel(contact: Contact) {
    this.route.navigate(['/contacts/', contact.id]);
  }

  save(contact: Contact) {
    this.contactService.updateContact(contact).subscribe(() => {
      this.route.navigate(['/contacts/', contact.id]);
      this.applicationState.dispatch(new UpdateContactAction(contact));
    });
  }

}
