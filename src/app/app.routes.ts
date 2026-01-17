import { Routes } from '@angular/router';
import { UserListComponent } from './features/components/user-list/user-list.component';
import { UserFormComponent } from './features/components/user-form/user-form.component';

export const routes: Routes = [
  { path: '', component: UserListComponent },
  { path: 'view', component: UserListComponent },
  { path: 'add', component: UserFormComponent },
];
