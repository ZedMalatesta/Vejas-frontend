import { Routes } from '@angular/router';
import { Room } from '../screens/room/room';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home-page/home-page').then((m) => m.HomePage),
  },
  { path: 'room', component: Room },
];
