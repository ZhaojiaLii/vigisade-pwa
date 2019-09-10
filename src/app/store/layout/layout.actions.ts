import { createAction } from '@ngrx/store';

export const toggleMenu = createAction('[Layout] Toggle Menu');
export const closeMenu = createAction('[Layout] Close Menu');
export const redirectToHomepage = createAction('[Layout] Redirect to Homepage from Menu');
