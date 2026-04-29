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
import { drawAuthorization, drawGreet } from '../components/authorization.js';
import { drawLogin } from '../components/login.js';
import { apiRequest, createRequestOptions } from '../utils/api.js';
import { drawRegister } from '../components/register.js';
import { validateInput } from '../utils/inputValidation.js';
import { authState, clearAuthState, getAuthUser } from '../state/authState.js';
import { drawUserData } from '../components/userData.js';
import { resetInputError } from '../components/form.js';
import { hideMessage, showMessage } from '../components/message.js';
import { enableBtnIfComplete } from './form.js';
export function initAuthorization() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const isAuthorized = yield checkAuthorized();
            const user = getAuthUser();
            if (isAuthorized)
                drawGreet(user);
        }
        catch (_a) {
            logout();
        }
        const authBtn = document.querySelector('.authorization');
        authBtn === null || authBtn === void 0 ? void 0 : authBtn.addEventListener('click', showAuthorizationPopup);
    });
}
function showAuthorizationPopup() {
    const currUser = getAuthUser();
    if (currUser) {
        openPopup(drawUserData(currUser, { onLogout: logout }));
    }
    else {
        const container = document.querySelector('.popup__content');
        openPopup(drawAuthorization({
            onLogin: () => {
                openPopup(drawLogin());
                const loginBtn = document.querySelector('#loginBtn');
                if (container && loginBtn)
                    initForm(container, loginBtn);
                if (loginBtn)
                    initLoginButton(loginBtn);
            },
            onRegister: () => {
                openPopup(drawRegister());
                const registerBtn = document.querySelector('#registerBtn');
                if (container && registerBtn)
                    initForm(container, registerBtn);
                if (registerBtn)
                    initRegisterButton(registerBtn);
            },
        }));
    }
}
function initForm(container, button) {
    const inputs = container.querySelectorAll('input');
    const responseRes = container.querySelector('.response-result');
    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            resetInputError(input);
            if (responseRes)
                hideMessage(responseRes);
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });
        input.addEventListener('blur', () => {
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });
        input.addEventListener('input', () => {
            resetInputError(input);
            if (responseRes)
                hideMessage(responseRes);
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });
    });
}
function checkFormInput(input, inputs) {
    const validationType = input.dataset.validate;
    if (validationType === 'passwordConfirm') {
        const passInput = Array.from(inputs).find((el) => el.id === 'pass');
        validateInput(input, validationType, passInput);
    }
    else if (validationType === 'password') {
        const passConfirmInput = Array.from(inputs).find((el) => el.id === 'confirm-pass');
        if (passConfirmInput && (passConfirmInput === null || passConfirmInput === void 0 ? void 0 : passConfirmInput.value))
            validateInput(passConfirmInput, 'passwordConfirm', input);
        validateInput(input, validationType);
    }
    else
        validateInput(input, validationType);
}
function initRegisterButton(btn) {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (btn.classList.contains('disabled'))
            return;
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#pass').value;
        const name = document.querySelector('#name').value;
        const email = document.querySelector('#email').value;
        const responseResult = document.querySelector('p.response-result');
        if (responseResult)
            hideMessage(responseResult);
        try {
            const response = yield apiRequest('/auth/register', createRequestOptions('POST', { login, password, name, email }));
            showMessage(responseResult, 'Registration successful', 'success');
            setTimeout(() => {
                window.location.href = '../landing/index.html';
            }, 2000);
        }
        catch (error) {
            showMessage(responseResult, error.message, 'error');
        }
    }));
}
function initLoginButton(btn) {
    btn === null || btn === void 0 ? void 0 : btn.addEventListener('click', () => __awaiter(this, void 0, void 0, function* () {
        if (btn.classList.contains('disabled'))
            return;
        const login = document.querySelector('#login').value;
        const password = document.querySelector('#pass').value;
        const responseResult = document.querySelector('p.response-result');
        if (responseResult)
            hideMessage(responseResult);
        try {
            const response = yield apiRequest('/auth/login', createRequestOptions('POST', { login, password }));
            authState.token = response.access_token;
            authState.user = response.user;
            localStorage.setItem('token', response.access_token);
            showMessage(responseResult, 'Login successful', 'success');
            setTimeout(() => {
                window.location.href = '../animal/zoo.html';
            }, 2000);
        }
        catch (error) {
            showMessage(responseResult, error.message, 'error');
        }
    }));
}
function logout() {
    clearAuth();
    drawGreet(null);
    closePopup();
}
function checkAuthorized() {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const token = (_a = authState.token) !== null && _a !== void 0 ? _a : localStorage.getItem('token');
        if (!token) {
            clearAuth();
            return false;
        }
        try {
            const user = yield apiRequest('/auth/profile', createRequestOptions('GET', undefined, token));
            authState.user = user;
            authState.token = token;
            localStorage.setItem('token', token);
            return true;
        }
        catch (err) {
            clearAuth();
            return false;
        }
    });
}
function clearAuth() {
    clearAuthState();
    localStorage.removeItem('token');
}
//# sourceMappingURL=userAuthorization.js.map