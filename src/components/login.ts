import {createTag} from '../utils/tagEl.js';

export function drawLogin(): HTMLElement {
    const content = createTag('div', ['content-2']);
    content.insertAdjacentHTML(
        'afterbegin',
        `<h2 class="topper">
            Login
          </h2>
          <h3>Login information:</h3>
          <div class="line"></div>
          <fieldset class="login-details form">
            <div class="form__field">
              <label for="login" class="form__label"><span>*</span>login</label>
              <input id="login" type="text" class="form__input" data-validate='login' placeholder="Enter your login">
              <p class="validation-error"></p>
            </div>
            <div class="form__field">
              <label for="pass" class="form__label"><span>*</span>Your Password</label>
              <input id="pass" type="password" class="form__input" data-validate='password' placeholder="Enter your password">
              <p class="validation-error"></p>
            </div>
            <p class="response-result"></p>
            <div id="loginBtn" class="btn btn--turquoise disabled">
              <div class="btn__text">next</div>
            </div>
          </fieldset>`
    );

    return content;
}
