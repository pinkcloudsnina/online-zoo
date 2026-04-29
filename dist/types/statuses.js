export var APIStatus;
(function (APIStatus) {
    APIStatus[APIStatus["Success"] = 200] = "Success";
    APIStatus[APIStatus["Created"] = 201] = "Created";
    APIStatus[APIStatus["ValidationError"] = 400] = "ValidationError";
    APIStatus[APIStatus["Unauthorized"] = 401] = "Unauthorized";
    APIStatus[APIStatus["NotFound"] = 404] = "NotFound";
    APIStatus[APIStatus["UserExists"] = 409] = "UserExists";
    APIStatus[APIStatus["InternalServerError"] = 500] = "InternalServerError";
})(APIStatus || (APIStatus = {}));
export const isSuccess = (status) => {
    return status === APIStatus.Success || status === APIStatus.Created;
};
//# sourceMappingURL=statuses.js.map