import type {Animal, ApiResponse, DonationRequest, DonationResponse, Pet, Testimonial} from '../types/interfaces.js';
import {APIStatus, isSuccess} from '../types/statuses.js';
import {LoginResponse, User, LoginRequest, RegisterRequest, Camera} from '../types/interfaces.js';
import {authState} from '../state/authState.js';

const server = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

export async function apiRequest<T>(endpoint: string, options?: RequestInit): Promise<T> {
    const response = await fetch(`${server}${endpoint}`, options);
    const json: ApiResponse<T> = await response.json();
    if (isSuccess(response.status)) {
        if (!json.data) throw new Error('No data in response');
        return json.data;
    }
    const errMsg = json.error || 'unexpected error';
    throw new Error(errMsg);
}

export function createRequestOptions<T>(method: 'GET' | 'POST', data?: T, token?: string): RequestInit {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const requestInit: RequestInit = {
        method,
        headers,
    };
    if (data && method === 'POST') {
        requestInit.body = JSON.stringify(data);
    }

    return requestInit;
}
