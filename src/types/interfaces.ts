export interface Animal {
    id: number;
    commonName: string;
    scientificName: string;
    type: string;
    size: string;
    diet: string;
    habitat: string;
    range: string;
    latitude: string;
    longitude: string;
    description: string;
    detailedDescription: string;
}

export interface Pet {
    id: number;
    name: string;
    commonName: string;
    description: string;
}

export interface Testimonial {
    id: number;
    city: string;
    month: string;
    year: string;
    text: string;
    name: string;
}

export interface Camera {
    id: number;
    petId: number;
    text: string;
}

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

export interface LoginRequest {
    login: string;
    password: string;
}

export interface RegisterRequest {
    login: string;
    password: string;
    name: string;
    email: string;
}
