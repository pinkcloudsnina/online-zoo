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

export enum ResponseStatus {
    Success = 200,
    Ok = 201,
    ValidationError = 400,
    InternalServerError = 500,
}
