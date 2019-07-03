import { GetUser } from '../interfaces/getUser';

export interface ProfileState {
  getUser: GetUser | null;
}

export const profileInitialState = {
  getUser: null,
};
