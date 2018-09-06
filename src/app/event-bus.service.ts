import {Injectable} from '@angular/core';
import {Subject} from 'rxjs/internal/Subject';
import {filter, map} from 'rxjs/operators';

export interface EventBusArgs {
  type: string;
  data: any;
}

@Injectable({
  providedIn: 'root'
})
export class EventBusService {

  _messages$: Subject<EventBusArgs> = new Subject<EventBusArgs>();

  emit(eventType: string, data: any) {
    this._messages$.next({type: eventType, data: data});
  }

  observe(eventType: string) {
    return this._messages$.pipe(
      filter(args => args.type === eventType),
      map(args => args.data)
    );
  }

  constructor() {
  }
}
