export enum APIStatus {
    Success = 200,
    Created = 201,

    ValidationError = 400,
    Unauthorized = 401,
    NotFound = 404,
    UserExists = 409,
    InternalServerError = 500,
}

export const isSuccess = (status: APIStatus) => {
    return status === APIStatus.Success || status === APIStatus.Created;
};
