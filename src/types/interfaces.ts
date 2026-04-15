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

export interface LoginRequest {
    login: string;
    password: string;
}

export interface LoginResponse {
    access_token: string;
    user: User;
}

export interface RegisterRequest {
    login: string;
    password: string;
    name: string;
    email: string;
}

export interface RegisterResponse {
    access_token: string;
    user: User;
}

export interface DonationRequest {
    name: string;
    email: string;
    amount: number;
    petId: number;
}

export interface DonationResponse {
    message: string;
    donationId: string;
}

export interface ApiResponse<T> {
    data?: T;
    error?: string;
}

export interface DonationStats {
    time: Date;
    petId: number;
    amount: number;
}

export interface AccumulatedDonation {
    petId: number;
    totalDonation: number;
    petName?: string;
    commonName?: string;
    share?: number;
}
