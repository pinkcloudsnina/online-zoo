import {User} from '../types/User';

export interface AuthState {
    token: string | null;
    user: User | null;
}

export const authState: AuthState = {
    token: null,
    user: null,
};
