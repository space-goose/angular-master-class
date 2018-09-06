import {Component, OnInit} from '@angular/core';
import {EventBusService} from './event-bus.service';

@Component({
  selector: 'trm-contacts-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class ContactsAppComponent implements OnInit {
  title: string;

  constructor(private eventBusService: EventBusService) {
  }

  ngOnInit(): void {
    this.eventBusService.observe('appTitleChange')
      .subscribe(title => this.title = title);
  }
}

