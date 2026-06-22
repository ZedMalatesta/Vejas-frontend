import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { DEFAULT_THEME_CONFIG, THEME_CONFIG } from './core/services/theme/theme.config';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    { provide: THEME_CONFIG, useValue: DEFAULT_THEME_CONFIG },
  ],
};
