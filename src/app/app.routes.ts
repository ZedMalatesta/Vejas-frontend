import { Routes } from '@angular/router';
import {Login} from "./screens/auth/login/login";
import {Register} from "./screens/auth/register/register";

export const routes: Routes = [
	{
		path: '',
		loadComponent: () =>
			import('./pages/home-page/home-page').then((m) => m.HomePage),
	},
  {
    path: 'login',
    component: Login,
  },
  {
    path: 'register',
    component: Register,
  },
];
