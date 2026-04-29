import { createTag } from '../utils/tagEl.js';
export function drawRegister() {
    const container = createTag('div', ['content-2']);
    container.insertAdjacentHTML('afterbegin', `
        <h2 class="topper">
            Register new user
          </h2>
          <h3>Registration information:</h3>
          <div class="line"></div>
          <form>
          <fieldset class="register-details form">

            <div class="form__field">
              <label for="login" class="form__label"><span>*</span>Your Login</label>
              <input id="login" type="text" class="form__input" data-validate='login' placeholder="Enter your login" required>
              <p class="validation-error"></p>
            </div>

            <div class="form__field">
              <label for="pass" class="form__label"><span>*</span>Your Password</label>
              <input id="pass" type="text" class="form__input" data-validate='password' placeholder="Enter your password" required>
              <p class="validation-error"></p>
            </div>

            <div class="form__field">
              <label for="confirm-pass" class="form__label"><span>*</span>Confirm Password</label>
              <input id="confirm-pass" type="text" class="form__input" data-validate='passwordConfirm' placeholder="Confirm your password" required>
              <p class="validation-error"></p>
            </div>

            <div class="form__field">
              <label for="name" class="form__label"><span>*</span>Your Name</label>
              <input id="name" type="text" class="form__input" data-validate='name' placeholder="Enter your name" required>
              <p class="validation-error"></p>
            </div>

            <div class="form__field">
              <label for="email" class="form__label"><span>*</span>Your Email Address</label>
              <input id="email" type="text" class="form__input" placeholder="Enter your email" data-validate='email' required>
              <p class="validation-error"></p>
            </div>

            <p class="response-result"></p>

            <div id="registerBtn" class="btn btn--turquoise disabled">
              <div class="btn__text">Register</div>
            </div>
          </fieldset>
          </form>
      `);
    return container;
}
//# sourceMappingURL=register.js.map