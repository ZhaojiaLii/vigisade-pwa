import { User } from '../interfaces/user';

export interface ProfileState {
  user: User | null;
  updateUser: User | null;
}

export const initialProfileState = {
  user: null,
  updateUser: null,
};
