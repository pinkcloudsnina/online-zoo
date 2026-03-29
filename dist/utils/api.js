var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { isSuccess } from '../types/statuses.js';
const server = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';
export function apiRequest(endpoint, options) {
    return __awaiter(this, void 0, void 0, function* () {
        const response = yield fetch(`${server}${endpoint}`, options);
        const json = yield response.json();
        if (isSuccess(response.status)) {
            if (!json.data)
                throw new Error('No data in response');
            return json.data;
        }
        const errMsg = json.error || 'unexpected error';
        throw new Error(errMsg);
    });
}
export function createRequestOptions(method, data, token) {
    const headers = {
        'Content-Type': 'application/json',
    };
    if (token) {
        headers.Authorization = `Bearer ${token}`;
    }
    const requestInit = {
        method,
        headers,
    };
    if (data && method === 'POST') {
        requestInit.body = JSON.stringify(data);
    }
    return requestInit;
}
//# sourceMappingURL=api.js.map