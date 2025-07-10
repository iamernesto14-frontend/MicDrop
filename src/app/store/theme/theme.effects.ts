import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { loadTheme, setTheme } from './theme.actions';
import { map } from 'rxjs/operators';

@Injectable()
export class ThemeEffects {
  private actions$ = inject(Actions);

  loadTheme$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadTheme),
      map(() => {
        const theme =
          (localStorage.getItem('theme') as 'light' | 'dark') || 'light';
        return setTheme({ theme });
      }),
    ),
  );
}
