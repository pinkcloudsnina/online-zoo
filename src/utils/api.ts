import type {Animal} from '../types/Animal.js';
import {Camera} from '../types/Camera.js';
import {LoginRequest, RegisterRequest, RegStatus, LoginStatus, AuthStatus} from '../types/Auth.js';
import {LoginResponse, User} from '../types/User.js';
import {authState} from '../state/authState.js';

const server = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

export async function getAnimalInfo(id: number): Promise<Animal | null> {
    try {
        const response = await fetch(`${server}/pets/${id}`);

        const json = await response.json();

        return json.data as Animal;
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}

export async function getCamerasInfo(): Promise<Camera[] | null> {
    try {
        const response = await fetch(`${server}/cameras`);

        const json = await response.json();
        return json.data as Camera[];
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}

export async function sendLoginRequest(data: LoginRequest): Promise<LoginResponse> {
    const response: Response = await fetch(`${server}/auth/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === LoginStatus.Success) {
        const result: LoginResponse = await response.json();
        return result;
    } else if (response.status === LoginStatus.InvalidCredentials) throw new Error('Invalid credentials');
    else throw new Error('Unexpected Error');
}

export async function sendRegisterRequest(data: RegisterRequest): Promise<string> {
    const response: Response = await fetch(`${server}/auth/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === RegStatus.Success) {
        return 'User registered successfully';
    } else if (response.status === RegStatus.ValidationError) {
        throw new Error('Validation error');
    } else if (response.status === RegStatus.UserExists) {
        throw new Error('User already exists');
    } else {
        throw new Error('Unexpected error');
    }
}

export async function sendProfileRequest(): Promise<User> {
    const token = authState.token ?? localStorage.getItem('token');
    if (!token) throw new Error('No token');

    const response = await fetch(`${server}/auth/profile`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
        },
    });

    if (response.status === AuthStatus.Success) {
        const result = await response.json();
        return result.data;
    } else if (response.status === AuthStatus.Unauthorized) {
        throw new Error('User Unauthorizedd');
    } else {
        throw new Error('Unexpected error');
    }
}
