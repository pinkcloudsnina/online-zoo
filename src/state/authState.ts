import {User} from '../types/interfaces';

export interface AuthState {
    token: string | null;
    user: User | null;
}

export const authState: AuthState = {
    token: null,
    user: null,
};

export function getAuthUser(): User | null {
    return authState.user;
}
