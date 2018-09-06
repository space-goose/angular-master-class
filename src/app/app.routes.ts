import { ContactsListComponent } from './contacts-list/contacts-list.component';
import { ContactsDetailComponent } from './contacts-detail/contacts-detail.component';
import { ContactsEditorComponent } from './contacts-editor/contacts-editor.component';
import {ContactsDetailViewComponent} from './contacts-detail-view/contacts-detail-view.component';

export const APP_ROUTES = [
    { path: '', component: ContactsListComponent },
    { path: 'contacts/:id', component: ContactsDetailViewComponent},
    { path: 'contact/:id/edit', component: ContactsEditorComponent}
]
