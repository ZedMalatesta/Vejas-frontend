import { Routes } from '@angular/router';
import { Room } from '../screens/room/room';

export const routes: Routes = [
  { path: '', redirectTo: 'room', pathMatch: 'full' },
  { path: 'room', component: Room },
];
