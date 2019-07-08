import { GetUser } from '../interfaces/getUser';

export interface ProfileState {
  user: GetUser | null;
}

export const profileInitialState = {
  user: null,
};
