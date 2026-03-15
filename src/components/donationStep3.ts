import {Pet, User} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawDonationStep3(): HTMLElement {
    const container = createTag('div', ['content-3']);
    container.insertAdjacentHTML(
        'afterbegin',
        `
          <h2 class="topper">
            Make your donation
          </h2>
          <h3>Payment information:</h3>
          <div class="line"></div>
          <fieldset class="payer-details form">
            <div id="card-input" class="form__field">
              <label for="card-num" class="form__label"><span>*</span>Credit Card Number</label>
              <input id="card-num" type="text" class="form__input" placeholder="">
              <p class="validation-error"></p>
            </div>

            <div class="form__field form__field--short">
              <label for="cvv" class="form__label"><span>*</span>CVV Number</label>
              <input id="cvv" type="text" class="form__input" placeholder="">
              <p class="validation-error"></p>
            </div>

          </fieldset>

          <fieldset class="choose-date">
            <legend><span>*</span>Expiration Date</legend>
            <div class="dropdown month-select">
              <div class="dropdown__toggle">
                <span class="dropdown__label"> Month </span>
                <div class="dropdown__arrow"><span class="dropdown__icon"></span></div>
              </div>
              <ul class="dropdown__list">
              </ul>
              <input id="month" type="hidden" name="month" value="">
            </div>
            <div class="dropdown year-select">
              <div class="dropdown__toggle">
                <span class="dropdown__label"> Year </span>
                <div class="dropdown__arrow"><span class="dropdown__icon"></span></div>
              </div>
              <ul class="dropdown__list">
              </ul>
              <input id="year" type="hidden" name="year" value="">
            </div>
            <p class="date-error"></p>
          </fieldset>

          <div class="bottom-steps">
            <div class="steps">
              <div class="step step--full"></div>
              <div class="step step--full"></div>
              <div class="step step--full"></div>
            </div>

            <div class="prev-step">Back</div>

            <div class="btn btn--orange complete-btn disabled">
              <div class="btn__text">Complete donation</div>
            </div>
          </div>`
    );
    return container;
}

export function drawMonthItems(): void {
    const months: string[] = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const list = document.querySelector<HTMLUListElement>('.month-select .dropdown__list');
    months.forEach((month, idx) => {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = month;
        el.dataset.value = (idx + 1).toString();
        list?.append(el);
    });
}
export function drawYearItems(): void {
    const list = document.querySelector<HTMLUListElement>('.year-select .dropdown__list');
    const currYear = new Date().getFullYear();

    for (let year = currYear; year <= currYear + 20; year++) {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = year.toString();
        el.dataset.value = year.toString();
        list?.append(el);
    }
}

export function drawCardItems(savedCards: string[]): void {
    const cardInput = document.querySelector<HTMLElement>('#card-input');

    const cardDropdown = createTag('div');
    cardDropdown.insertAdjacentHTML(
        'afterbegin',
        `
    <legend>Saved cards</legend>
            <div class="dropdown card-select">
              <div class="dropdown__toggle">
                <span class="dropdown__label">Card</span>
                <div class="dropdown__arrow"><span class="dropdown__icon"></span></div>
              </div>
              <ul class="dropdown__list">
              </ul>
              <input id="dropdownSelectedCard" type="hidden" name="savedCardChosen" value="">
            </div>`
    );
    cardInput?.prepend(cardDropdown);

    const list = document.querySelector('.card-select .dropdown__list');
    savedCards.forEach((card) => {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = `${card.slice(0, 4)} **** **** ${card.slice(-4)}`;
        el.dataset.value = card;
        list?.append(el);
    });
}

export function showSaveCardCheck(): void {
    const cardInput = document.querySelector<HTMLElement>('#card-input');
    const saveCardChk = createTag('label', ['checkbox', 'save-card-chk']);
    saveCardChk.insertAdjacentHTML(
        'afterbegin',
        `
      <input id="save-card" type="checkbox" value="no">
            <span class="checkbox__box"></span>
            Save card for later payments
      `
    );
    cardInput?.append(saveCardChk);
}
