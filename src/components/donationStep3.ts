import {Pet, User} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

type DropdownItem = {
    label: string;
    value: string;
};

const months = [
    {label: 'January', value: '1'},
    {label: 'February', value: '2'},
    {label: 'March', value: '3'},
    {label: 'April', value: '4'},
    {label: 'May', value: '5'},
    {label: 'June', value: '6'},
    {label: 'July', value: '7'},
    {label: 'August', value: '8'},
    {label: 'September', value: '9'},
    {label: 'October', value: '10'},
    {label: 'November', value: '11'},
    {label: 'December', value: '12'},
];

export function drawDonationStep3(handlers: {
    initDropdowns: (container: HTMLElement) => void;
    onInput: (inputField: HTMLInputElement) => void;
}): HTMLElement {
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
              <input id="card-num" type="text" class="form__input" placeholder="" data-validate='card'>
              <p class="validation-error"></p>
            </div>

            <div class="form__field form__field--short">
              <label for="cvv" class="form__label"><span>*</span>CVV Number</label>
              <input id="cvv" type="text" class="form__input" placeholder="" data-validate='cvv'>
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
    const monthDropdown = container.querySelector<HTMLElement>('.month-select');
    const yearDropdown = container.querySelector<HTMLElement>('.year-select');
    if (monthDropdown) drawDropdownItems(monthDropdown, months);
    if (yearDropdown) drawDropdownItems(yearDropdown, generateYears(20));

    handlers.initDropdowns(container);

    const inputCard = container.querySelector<HTMLInputElement>('#card-num');
    const inputCVV = container.querySelector<HTMLInputElement>('#cvv');

    inputCard?.addEventListener('input', () => handlers.onInput(inputCard));
    inputCVV?.addEventListener('input', () => handlers.onInput(inputCVV));

    return container;
}

export function drawDropdownItems(dropdown: HTMLElement, elements: DropdownItem[]): void {
    const list = dropdown.querySelector<HTMLUListElement>('.dropdown__list');
    elements.forEach((item) => {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = item.label;
        el.dataset.value = item.value.toString();
        list?.append(el);
    });
}

export function generateYears(yearsAmount: number): DropdownItem[] {
    const currYear = new Date().getFullYear();
    const years: DropdownItem[] = [];

    for (let year = currYear; year <= currYear + yearsAmount; year++) {
        years.push({label: year.toString(), value: year.toString()});
    }
    return years;
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

export function highlightDateErr(hasError: boolean) {
    const p = document.querySelector<HTMLParagraphElement>('.date-error');
    const yearEl = document.querySelector<HTMLInputElement>('#year');
    const monthEl = document.querySelector<HTMLInputElement>('#month');
    if (hasError) {
        if (p) p.textContent = 'Date expired';
        if (monthEl) monthEl.classList.add('validation-error');
        if (yearEl) yearEl.classList.add('validation-error');
    } else {
        if (p) p.textContent = '';
        if (monthEl) monthEl.classList.remove('validation-error');
        if (yearEl) yearEl.classList.remove('validation-error');
    }
}
