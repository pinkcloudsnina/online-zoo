var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { openPopup, closePopup } from '../components/popup.js';
import { drawAuthorization } from '../components/authorization.js';
import { drawLogin } from '../components/login.js';
import { sendLoginRequest, sendRegisterRequest, sendProfileRequest } from '../utils/api.js';
import { drawRegister } from '../components/register.js';
import { validateField } from '../utils/inputValidation.js';
import { authState } from '../state/authState.js';
import { drawUserData } from '../components/userData.js';
export function initAuthorization() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield sendProfileRequest();
            authState.user = response;
        }
        catch (_a) {
            logout();
        }
        const loginBtn = document.querySelector('.authorization');
        loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener('click', showAuthorizationPopup);
    });
}
function showAuthorizationPopup() {
    if (authState.user) {
        openPopup(drawUserData());
        const logoutBtn = document.querySelector('#logoutBtn');
        logoutBtn === null || logoutBtn === void 0 ? void 0 : logoutBtn.addEventListener('click', logout);
    }
    else {
        openPopup(drawAuthorization());
        const login = document.querySelector('.login');
        const register = document.querySelector('.register');
        login === null || login === void 0 ? void 0 : login.addEventListener('click', () => {
            openPopup(drawLogin());
            initInputs();
            initLoginButton();
        });
        register === null || register === void 0 ? void 0 : register.addEventListener('click', () => {
            openPopup(drawRegister());
            initInputs();
            initRegisterButton();
        });
    }
}
function initValidation() {
    const login = document.querySelector('#login');
    const password = document.querySelector('#pass');
    const passwordConfirm = document.querySelector('#confirm-pass');
    const name = document.querySelector('#name');
    const email = document.querySelector('#email');
    login === null || login === void 0 ? void 0 : login.addEventListener('blur', () => {
        if (!login.value)
            return;
        const validationResult = validateField(login.value, 'login');
        applyValidationResult(login, validationResult);
    });
    password === null || password === void 0 ? void 0 : password.addEventListener('blur', () => {
        if (!password.value)
            return;
        const validationResult = validateField(password.value, 'password');
        applyValidationResult(password, validationResult);
    });
    passwordConfirm === null || passwordConfirm === void 0 ? void 0 : passwordConfirm.addEventListener('blur', () => {
        if (!password || !passwordConfirm)
            return;
        const validationResult = validateField(password.value, 'passwordConfirm', passwordConfirm.value);
        applyValidationResult(passwordConfirm, validationResult);
    });
    name === null || name === void 0 ? void 0 : name.addEventListener('blur', () => {
        if (!name.value)
            return;
        const validationResult = validateField(name.value, 'name');
        applyValidationResult(name, validationResult);
    });
    email === null || email === void 0 ? void 0 : email.addEventListener('blur', () => {
        if (!email.value)
            return;
        const validationResult = validateField(email.value, 'email');
        applyValidationResult(email, validationResult);
    });
}
function initInputs() {
    const inputs = document.querySelectorAll('.popup__content input');
    const responseErr = document.querySelector('.response-error');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            input.value = '';
            if (responseErr)
                responseErr.textContent = '';
            const p = input === null || input === void 0 ? void 0 : input.nextElementSibling;
            input.classList.remove('validation-error');
            p.textContent = '';
            checkFormComplete();
        });
        input.addEventListener('blur', () => {
            checkFormComplete();
        });
    });
    initValidation();
}
function applyValidationResult(input, msg) {
    const p = input === null || input === void 0 ? void 0 : input.nextElementSibling;
    if (msg !== null) {
        input.classList.add('validation-error');
        p.textContent = msg;
    }
    else {
        input.classList.remove('validation-error');
        p.textContent = '';
    }
}
function checkFormComplete() {
    const inputs = document.querySelectorAll('.popup__content input');
    const registerBtn = document.querySelector('#registerBtn');
    const loginBtn = document.querySelector('#loginBtn');
    let correctInput = 0;
    inputs.forEach((input) => {
        if (input.value && !input.classList.contains('validation-error'))
            correctInput++;
    });
    if (inputs.length === correctInput) {
        registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.classList.remove('disabled');
        loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.classList.remove('disabled');
    }
    else {
        registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.classList.add('disabled');
        loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.classList.add('disabled');
    }
}
function initRegisterButton() {
    const registerBtn = document.querySelector('#registerBtn');
    registerBtn === null || registerBtn === void 0 ? void 0 : registerBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (registerBtn.classList.contains('disabled'))
            return;
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#pass').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const responseError = document.querySelector('p.response-error');
        try {
            yield sendRegisterRequest({ login, password, name, email });
            window.location.href = '../landing/index.html';
        }
        catch (error) {
            responseError.textContent = error.message;
        }
    }));
}
function initLoginButton() {
    const loginBtn = document.querySelector('#loginBtn');
    loginBtn === null || loginBtn === void 0 ? void 0 : loginBtn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (loginBtn.classList.contains('disabled'))
            return;
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#pass').value;
        const responseError = document.querySelector('p.response-error');
        try {
            const response = yield sendLoginRequest({ login, password });
            authState.token = response.data.access_token;
            authState.user = response.data.user;
            localStorage.setItem('token', response.data.access_token);
            localStorage.setItem('user', JSON.stringify(response.data.user));
            window.location.href = '../animal/zoo.html';
        }
        catch (error) {
            responseError.textContent = error.message;
        }
    }));
}
export function initLogged() {
    return __awaiter(this, void 0, void 0, function* () {
        const userGreet = document.querySelector('.authorization .user');
        const token = localStorage.getItem('token');
        if (!token) {
            if (userGreet)
                userGreet.textContent = '';
            return;
        }
        authState.token = token;
        try {
            const user = yield sendProfileRequest();
            authState.user = user;
            localStorage.setItem('user', JSON.stringify(user));
            if (userGreet)
                userGreet.textContent = user.name;
        }
        catch (error) {
            console.error('Auth check failed:', error);
            authState.token = null;
            authState.user = null;
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            if (userGreet)
                userGreet.textContent = '';
        }
    });
}
function logout() {
    authState.token = null;
    authState.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    closePopup();
    initLogged();
}
//# sourceMappingURL=userAuthorization.js.map