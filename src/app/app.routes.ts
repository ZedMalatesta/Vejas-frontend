import { Routes } from '@angular/router';
import { Room } from '../screens/room/room';
import { Login } from "./screens/auth/login/login";
import { Register } from "./screens/auth/register/register";
import { HomePage } from "./screens/home-page/home-page";

export const routes: Routes = [
  {
    path: '', 
    redirectTo: 'room',
    pathMatch: 'full'
  },
  {
    path: 'room',
    component: Room,
  },
	{
		path: 'home',
		component: HomePage,
	},
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
  {
    path: '**',
    redirectTo: '',
  }

