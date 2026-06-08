import { Routes } from '@angular/router';
import { Login } from './screens/auth/login/login';
import { Register } from './screens/auth/register/register';
import { HomePage } from './screens/home-page/home-page';
import { ForgotPassword } from './screens/auth/forgot-password/forgot-password';
import { ChangePassword } from './screens/auth/change-password/change-password';

export const routes: Routes = [
  { path: '', component: HomePage },
  { path: 'room', loadComponent: () => import('./screens/room/room').then(m => m.Room) },
  { path: 'auth/login', component: Login },
  { path: 'auth/register', component: Register },
  {
    path: 'auth/forgot-password',
    component: ForgotPassword,
  },
  {
    path: 'auth/change-password',
    component: ChangePassword,
  },
  { path: '**', redirectTo: '' },
];
