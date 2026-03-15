import type {Animal, ApiResponse, DonationRequest, DonationResponse, Pet, Testimonial} from '../types/interfaces.js';
import {RegStatus, LoginStatus, AuthStatus, ResponseStatus} from '../types/statuses.js';
import {LoginResponse, User, LoginRequest, RegisterRequest, Camera} from '../types/interfaces.js';
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

export async function getPets(): Promise<Pet[] | null> {
    try {
        const response = await fetch(`${server}/pets`);
        const json = await response.json();
        return json.data as Pet[];
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}

export async function getTestimonials(): Promise<Testimonial[] | null> {
    try {
        const response = await fetch(`${server}/feedback`);
        const json = await response.json();
        return json.data as Testimonial[];
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

export async function sendDonationRequest(data: DonationRequest): Promise<DonationResponse> {
    const response = await fetch(`${server}/donations`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    if (response.status === ResponseStatus.Success || response.status === ResponseStatus.Ok) {
        console.log(response);
        const result: ApiResponse<DonationResponse> = await response.json();
        return result.data;
    } else if (response.status === ResponseStatus.ValidationError) {
        throw new Error('Validation Error');
    } else if (response.status === ResponseStatus.InternalServerError) {
        throw new Error('Internal Server Error');
    } else {
        throw new Error('Unexpected error');
    }
}
