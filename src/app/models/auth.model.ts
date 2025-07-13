import { User } from './user.model';

export interface Auth {}

export interface LoginResponse {
  status: string;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
