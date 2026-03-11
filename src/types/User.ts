export interface User {
    login: string;
    name: string;
    email: string;
}

export interface LoginResponse {
    data: {
        access_token: string;
        user: User;
    };
    message: string;
}
