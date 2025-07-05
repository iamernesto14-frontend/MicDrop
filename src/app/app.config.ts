import { ApplicationConfig, provideZoneChangeDetection, isDevMode } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { themeReducer } from './store/theme/theme.reducer';
import { ThemeEffects } from './store/theme/theme.effects';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideStore(
    {
      theme: themeReducer
    }
  ), provideEffects([ThemeEffects]), provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() })]
};
