import {createTag} from '../utils/tagEl.js';

export function drawDonationStep2(handlers: {onInput: (field: HTMLInputElement) => void}): HTMLElement {
    const container = createTag('div', ['content-2']);
    container.insertAdjacentHTML(
        'afterbegin',
        `
          <h2 class="topper">
            Make your donation
          </h2>
          <h3>Billing information:</h3>
          <div class="line"></div>
          <fieldset class="payer-details form">
            <div class="form__field">
              <label for="billingName" class="form__label"><span>*</span>Your Name</label>
              <input id="billingName" type="text" class="form__input" data-validate='name' placeholder="First and last name">
              <p class="validation-error"></p>
            </div>
            <div class="form__field">
              <label for="billingEmail" class="form__label"><span>*</span>Your Email Address</label>
              <input id="billingEmail" type="text" class="form__input" data-validate='email' placeholder="Enter your email">
              <p class="validation-error"></p>
            </div>
            <p>You will receive emails from the Online Zoo, including updates and news on the latest discoveries and
              translations. You can unsubscribe at any time.</p>
          </fieldset>



          <div class="bottom-steps">
            <div class="steps">
              <div class="step step--full"></div>
              <div class="step step--full"></div>
              <div class="step"></div>
            </div>

            <div class="prev-step">Back</div>

            <div class="btn btn--turquoise next-step disabled">
              <div class="btn__text">next</div>
            </div>
          </div>`
    );

    const nameInput = container.querySelector<HTMLInputElement>('#billingName');
    const emailInput = container.querySelector<HTMLInputElement>('#billingEmail');

    nameInput?.addEventListener('input', () => handlers.onInput(nameInput));
    emailInput?.addEventListener('input', () => handlers.onInput(emailInput));

    return container;
}
