import {openPopup, closePopup} from '../components/popup.js';
import {drawAuthorization, drawGreet} from '../components/authorization.js';
import {drawLogin} from '../components/login.js';
import {apiRequest, createRequestOptions} from '../utils/api.js';
import {drawRegister} from '../components/register.js';
import {validateInput, ValidationType} from '../utils/inputValidation.js';
import {authState, clearAuthState, getAuthUser} from '../state/authState.js';
import {drawUserData} from '../components/userData.js';
import {LoginRequest, LoginResponse, RegisterRequest, RegisterResponse, User} from '../types/interfaces.js';
import {resetInputError} from '../components/form.js';
import {hideMessage, showMessage} from '../components/message.js';
import {enableBtnIfComplete} from './form.js';

export async function initAuthorization(): Promise<void> {
    try {
        const isAuthorized = await checkAuthorized();
        const user = getAuthUser();
        if (isAuthorized) drawGreet(user);
    } catch {
        logout();
    }
    const authBtn = document.querySelector<HTMLElement>('.authorization');
    authBtn?.addEventListener('click', showAuthorizationPopup);
}

function showAuthorizationPopup(): void {
    const currUser = getAuthUser();
    if (currUser) {
        openPopup(drawUserData(currUser, {onLogout: logout}));
    } else {
        const container = document.querySelector<HTMLElement>('.popup__content');
        openPopup(
            drawAuthorization({
                onLogin: () => {
                    openPopup(drawLogin());
                    const loginBtn = document.querySelector<HTMLElement>('#loginBtn');
                    if (container && loginBtn) initForm(container, loginBtn);
                    if (loginBtn) initLoginButton(loginBtn);
                },
                onRegister: () => {
                    openPopup(drawRegister());
                    const registerBtn = document.querySelector<HTMLElement>('#registerBtn');
                    if (container && registerBtn) initForm(container, registerBtn);
                    if (registerBtn) initRegisterButton(registerBtn);
                },
            })
        );
    }
}

function initForm(container: HTMLElement, button: HTMLElement): void {
    const inputs = container.querySelectorAll<HTMLInputElement>('input');
    const responseRes = container.querySelector<HTMLElement>('.response-result');

    inputs.forEach((input) => {
        input.addEventListener('focus', () => {
            resetInputError(input);
            if (responseRes) hideMessage(responseRes);
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });

        input.addEventListener('blur', () => {
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });

        input.addEventListener('input', () => {
            resetInputError(input);
            if (responseRes) hideMessage(responseRes);
            checkFormInput(input, inputs);
            enableBtnIfComplete(inputs, button);
        });
    });
}

function checkFormInput(input: HTMLInputElement, inputs: NodeListOf<HTMLInputElement>): void {
    const validationType = input.dataset.validate as ValidationType;

    if (validationType === 'passwordConfirm') {
        const passInput = Array.from(inputs).find((el) => el.id === 'pass');
        validateInput(input, validationType, passInput);
    } else if (validationType === 'password') {
        const passConfirmInput = Array.from(inputs).find((el) => el.id === 'confirm-pass');
        if (passConfirmInput && passConfirmInput?.value) validateInput(passConfirmInput, 'passwordConfirm', input);
        validateInput(input, validationType);
    } else validateInput(input, validationType);
}

function initRegisterButton(btn: HTMLElement): void {
    btn?.addEventListener('click', async () => {
        if (btn.classList.contains('disabled')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;
        const name = document.querySelector<HTMLInputElement>('#name')!.value;
        const email = document.querySelector<HTMLInputElement>('#email')!.value;

        const responseResult = document.querySelector<HTMLParagraphElement>('p.response-result');
        if (responseResult) hideMessage(responseResult);

        try {
            const response = await apiRequest<RegisterResponse>(
                '/auth/register',
                createRequestOptions<RegisterRequest>('POST', {login, password, name, email})
            );
            showMessage(responseResult!, 'Registration successful', 'success');

            setTimeout(() => {
                window.location.href = '../landing/index.html';
            }, 2000);
        } catch (error) {
            showMessage(responseResult!, (error as Error).message, 'error');
        }
    });
}

function initLoginButton(btn: HTMLElement): void {
    btn?.addEventListener('click', async () => {
        if (btn.classList.contains('disabled')) return;

        const login = document.querySelector<HTMLInputElement>('#login')!.value;
        const password = document.querySelector<HTMLInputElement>('#pass')!.value;

        const responseResult = document.querySelector<HTMLParagraphElement>('p.response-result');
        if (responseResult) hideMessage(responseResult);

        try {
            const response = await apiRequest<LoginResponse>(
                '/auth/login',
                createRequestOptions<LoginRequest>('POST', {login, password})
            );

            authState.token = response.access_token;
            authState.user = response.user;
            localStorage.setItem('token', response.access_token);
            showMessage(responseResult!, 'Login successful', 'success');
            setTimeout(() => {
                window.location.href = '../animal/zoo.html';
            }, 2000);
        } catch (error) {
            showMessage(responseResult!, (error as Error).message, 'error');
        }
    });
}

function logout(): void {
    clearAuth();
    drawGreet(null);
    closePopup();
}

async function checkAuthorized(): Promise<boolean> {
    const token = authState.token ?? localStorage.getItem('token');
    if (!token) {
        clearAuth();
        return false;
    }
    try {
        const user = await apiRequest<User>('/auth/profile', createRequestOptions('GET', undefined, token));
        authState.user = user;
        authState.token = token;
        localStorage.setItem('token', token);
        return true;
    } catch (err) {
        clearAuth();
        return false;
    }
}

function clearAuth(): void {
    clearAuthState();
    localStorage.removeItem('token');
}
