import { createAction } from '@ngrx/store';

export const toggleMenu = createAction('[Layout] Toggle Menu');
export const toggleTutorial = createAction('[Layout] Open Tutorial');
export const closeMenu = createAction('[Layout] Close Menu');
