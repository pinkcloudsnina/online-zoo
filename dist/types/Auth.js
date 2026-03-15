export var RegStatus;
(function (RegStatus) {
    RegStatus[RegStatus["Success"] = 201] = "Success";
    RegStatus[RegStatus["ValidationError"] = 400] = "ValidationError";
    RegStatus[RegStatus["UserExists"] = 409] = "UserExists";
})(RegStatus || (RegStatus = {}));
export var LoginStatus;
(function (LoginStatus) {
    LoginStatus[LoginStatus["Success"] = 200] = "Success";
    LoginStatus[LoginStatus["InvalidCredentials"] = 401] = "InvalidCredentials";
})(LoginStatus || (LoginStatus = {}));
export var AuthStatus;
(function (AuthStatus) {
    AuthStatus[AuthStatus["Success"] = 200] = "Success";
    AuthStatus[AuthStatus["Unauthorized"] = 401] = "Unauthorized";
})(AuthStatus || (AuthStatus = {}));
//# sourceMappingURL=Auth.js.map