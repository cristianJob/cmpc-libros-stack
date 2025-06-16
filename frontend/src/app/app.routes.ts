import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';
import { UserCreateComponent } from './components/user-create/user-create.component';
import { BookCreateComponent } from './components/book-create/book-create.component';

export const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'detail/:id',
    component: BookDetailComponent,
  },
  {
    path: 'user-create',
    component: UserCreateComponent,
  },
  {
    path: 'book-create',
    component: BookCreateComponent,
  },
  {
    path: '**',
    component: LoginComponent,
  },
];
