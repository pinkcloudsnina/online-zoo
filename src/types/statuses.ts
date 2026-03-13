export enum RegStatus {
    Success = 201,
    ValidationError = 400,
    UserExists = 409,
}

export enum LoginStatus {
    Success = 200,
    InvalidCredentials = 401,
}

export enum AuthStatus {
    Success = 200,
    Unauthorized = 401,
}
