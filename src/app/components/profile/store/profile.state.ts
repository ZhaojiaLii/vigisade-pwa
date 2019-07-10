import { User } from '../interfaces/user';

export interface ProfileState {
  user: User | null;
}

export const initialProfileState = {
  user: null,
};
