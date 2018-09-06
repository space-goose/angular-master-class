import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Contact} from '../models/contact';
import {ContactsService} from '../contacts.service';
import {Observable} from 'rxjs/internal/Observable';
import {EventBusService} from '../event-bus.service';
import {ApplicationState} from '../state/app.state';
import {SelectContactAction} from '../state/contacts/contacts.actions';
import {Store} from '@ngrx/store';

@Component({
  selector: 'trm-contacts-detail-view',
  templateUrl: './contacts-detail-view.component.html',
  styleUrls: ['./contacts-detail-view.component.css']
})
export class ContactsDetailViewComponent implements OnInit {

  contact$: Observable<Contact>;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private contactsService: ContactsService,
              private eventBus: EventBusService,
              private applicationState: Store<ApplicationState>) {
  }

  ngOnInit() {
    this.eventBus.emit('appTitleChange', 'DETAIL');
    const id = this.route.snapshot.params['id'];
    this.contact$ = this.contactsService.getContact(id);

    this.contact$.subscribe(contact =>
      this.applicationState.dispatch(new SelectContactAction(+contact.id)));
  }

  navigateToEditor(contact) {
    this.router.navigate(['/contact', contact.id, 'edit']);
  }

  navigateToList() {
    this.router.navigate(['']);
  }
}
