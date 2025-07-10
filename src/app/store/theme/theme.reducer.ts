import { createReducer, on } from '@ngrx/store';
import { setTheme, toggleTheme } from './theme.actions';
import { initialState, ThemeState } from './theme.state';

export const themeReducer = createReducer(
  initialState,
  on(setTheme, (state, { theme }) => {
    localStorage.setItem('theme', theme);
    return { ...state, theme };
  }),
  on(toggleTheme, (state) => {
    const newTheme = (state.theme === 'light' ? 'dark' : 'light') as
      | 'light'
      | 'dark';
    localStorage.setItem('theme', newTheme);
    return { ...state, theme: newTheme };
  }),
);
