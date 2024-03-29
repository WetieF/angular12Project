import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddUserComponent } from './users/add-user/add-user.component';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { ViewUserComponent } from './users/view-user/view-user.component';
import { DeleteUserComponent } from './users/delete-user/delete-user.component';
import { EditUserComponent } from './users/edit-user/edit-user.component';

const routes: Routes = [
  
  {
    path : 'users',
    children: [
      { path: '', component: ListUsersComponent },
      { path: 'list', component: ListUsersComponent },
      { path: 'view/:id', component: ViewUserComponent },
      { path: 'delete/:id', component: DeleteUserComponent },
      { path: 'edit/:id', component: EditUserComponent },
      { path: 'create', component: AddUserComponent },
    ]
  },
  
  { path: 'roles', loadChildren: () => import('./roles/roles.module').then(m => m.RolesModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
