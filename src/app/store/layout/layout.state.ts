export interface LayoutState {
  menuOpen: boolean;
  redirectHome: boolean;
}

export const layoutInitialState: LayoutState = {
  menuOpen: false,
  redirectHome: false,
};
