import { createTag } from '../utils/tagEl.js';
const months = [
    { label: 'January', value: '1' },
    { label: 'February', value: '2' },
    { label: 'March', value: '3' },
    { label: 'April', value: '4' },
    { label: 'May', value: '5' },
    { label: 'June', value: '6' },
    { label: 'July', value: '7' },
    { label: 'August', value: '8' },
    { label: 'September', value: '9' },
    { label: 'October', value: '10' },
    { label: 'November', value: '11' },
    { label: 'December', value: '12' },
];
export function drawDonationStep3(handlers) {
    const container = createTag('div', ['content-3']);
    container.insertAdjacentHTML('afterbegin', `
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
          </div>`);
    const monthDropdown = container.querySelector('.month-select');
    const yearDropdown = container.querySelector('.year-select');
    if (monthDropdown)
        drawDropdownItems(monthDropdown, months);
    if (yearDropdown)
        drawDropdownItems(yearDropdown, generateYears(20));
    const inputCard = container.querySelector('#card-num');
    const inputCVV = container.querySelector('#cvv');
    inputCard === null || inputCard === void 0 ? void 0 : inputCard.addEventListener('input', () => handlers.onInput(inputCard));
    inputCVV === null || inputCVV === void 0 ? void 0 : inputCVV.addEventListener('input', () => handlers.onInput(inputCVV));
    return container;
}
export function drawDropdownItems(dropdown, elements) {
    const list = dropdown.querySelector('.dropdown__list');
    elements.forEach((item) => {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = item.label;
        el.dataset.value = item.value.toString();
        list === null || list === void 0 ? void 0 : list.append(el);
    });
}
export function generateYears(yearsAmount) {
    const currYear = new Date().getFullYear();
    const years = [];
    for (let year = currYear; year <= currYear + yearsAmount; year++) {
        years.push({ label: year.toString(), value: year.toString() });
    }
    return years;
}
export function drawCardsDropdownContainer() {
    const cardInput = document.querySelector('#card-input');
    const cardDropdown = createTag('div');
    cardDropdown.insertAdjacentHTML('afterbegin', `
    <legend>Saved cards</legend>
            <div class="dropdown card-select">
              <div class="dropdown__toggle">
                <span class="dropdown__label">Card</span>
                <div class="dropdown__arrow"><span class="dropdown__icon"></span></div>
              </div>
              <ul class="dropdown__list">
              </ul>
              <input id="dropdownSelectedCard" type="hidden" name="savedCardChosen" value="">
            </div>`);
    cardInput === null || cardInput === void 0 ? void 0 : cardInput.prepend(cardDropdown);
}
export function showSaveCardCheck() {
    const cardInput = document.querySelector('#card-input');
    const saveCardChk = createTag('label', ['checkbox', 'save-card-chk']);
    saveCardChk.insertAdjacentHTML('afterbegin', `
      <input id="save-card" type="checkbox" value="no">
            <span class="checkbox__box"></span>
            Save card for later payments
      `);
    cardInput === null || cardInput === void 0 ? void 0 : cardInput.append(saveCardChk);
}
export function highlightDateErr(hasError) {
    const p = document.querySelector('.date-error');
    const yearEl = document.querySelector('#year');
    const monthEl = document.querySelector('#month');
    if (hasError) {
        if (p)
            p.textContent = 'Date expired';
        if (monthEl)
            monthEl.classList.add('validation-error');
        if (yearEl)
            yearEl.classList.add('validation-error');
    }
    else {
        if (p)
            p.textContent = '';
        if (monthEl)
            monthEl.classList.remove('validation-error');
        if (yearEl)
            yearEl.classList.remove('validation-error');
    }
}
//# sourceMappingURL=donationStep3.js.map