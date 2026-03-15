var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { RegStatus, LoginStatus, AuthStatus, ResponseStatus } from '../types/statuses.js';
import { authState } from '../state/authState.js';
const server = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';
export function getAnimalInfo(id) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${server}/pets/${id}`);
            const json = yield response.json();
            return json.data;
        }
        catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    });
}
export function getCamerasInfo() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${server}/cameras`);
            const json = yield response.json();
            return json.data;
        }
        catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    });
}
export function getPets() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${server}/pets`);
            const json = yield response.json();
            return json.data;
        }
        catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    });
}
export function getTestimonials() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch(`${server}/feedback`);
            const json = yield response.json();
            return json.data;
        }
        catch (err) {
            console.error('Fetch error:', err);
            return null;
        }
    });
}
export function sendLoginRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${server}/auth/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === LoginStatus.Success) {
            const result = yield response.json();
            return result;
        }
        else if (response.status === LoginStatus.InvalidCredentials)
            throw new Error('Invalid credentials');
        else
            throw new Error('Unexpected Error');
    });
}
export function sendRegisterRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${server}/auth/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === RegStatus.Success) {
            return 'User registered successfully';
        }
        else if (response.status === RegStatus.ValidationError) {
            throw new Error('Validation error');
        }
        else if (response.status === RegStatus.UserExists) {
            throw new Error('User already exists');
        }
        else {
            throw new Error('Unexpected error');
        }
    });
}
export function sendProfileRequest() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = authState.token) !== null && _a !== void 0 ? _a : localStorage.getItem('token');
        if (!token)
            throw new Error('No token');
        const response = yield fetch(`${server}/auth/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${token}`,
            },
        });
        if (response.status === AuthStatus.Success) {
            const result = yield response.json();
            return result.data;
        }
        else if (response.status === AuthStatus.Unauthorized) {
            throw new Error('User Unauthorizedd');
        }
        else {
            throw new Error('Unexpected error');
        }
    });
}
export function sendDonationRequest(data) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${server}/donations`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (response.status === ResponseStatus.Success || response.status === ResponseStatus.Ok) {
            console.log(response);
            const result = yield response.json();
            return result.data;
        }
        else if (response.status === ResponseStatus.ValidationError) {
            throw new Error('Validation Error');
        }
        else if (response.status === ResponseStatus.InternalServerError) {
            throw new Error('Internal Server Error');
        }
        else {
            throw new Error('Unexpected error');
        }
    });
}
//# sourceMappingURL=api.js.map