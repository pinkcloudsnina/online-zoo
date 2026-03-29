export const authState = {
    token: null,
    user: null,
};
export function getAuthUser() {
    return authState.user;
}
export function clearAuthState() {
    authState.token = null;
    authState.user = null;
}
//# sourceMappingURL=authState.js.map