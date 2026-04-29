import { createTag } from '../utils/tagEl.js';
export function drawDonationStep1(pets, handlers) {
    const container = createTag('div', ['content-1']);
    container.insertAdjacentHTML('afterbegin', `<h2 class="topper">
            Make your donation
          </h2>
          <h3>Donation information:</h3>
          <div class="line"></div>
          <fieldset class="choose-amount">
            <legend><span>*</span>Choose your donation amount</legend>
            <div class="btn btn--turquoise" data-donation-amount = '10'>$10
            </div>
            <div class="btn btn--turquoise" data-donation-amount = '20'>$20</div>
            <div class="btn btn--turquoise" data-donation-amount = '30'>
              $30
            </div>
            <div class="btn btn--turquoise" data-donation-amount = '50'>
             $50
            </div>
            <div class="btn btn--turquoise" data-donation-amount = '80'>
              $80
            </div>
            <div class="btn btn--turquoise" data-donation-amount = '100'>
              $100
            </div>
            <div class="btn btn--turquoise custom-amount-btn"> other <span>amount</span>
            </div>
            <div class="custom-amount"><input type="text" placeholder="" id="other-amount-input" data-validate='amount'>
            <p class="validation-error"></p></div>
            
          </fieldset>

          <fieldset class="choose-pet">
            <div class="btn btn--turquoise">
              <input type="checkbox" name="for-pet" id="pet">
              for special pet
            </div>
            <div class="dropdown pet-select">
              <div class="dropdown__toggle">
                <span class="dropdown__label">Choose your favourite </span>
                <div class="dropdown__arrow"><span class="dropdown__icon"></span></div>
              </div>

              <ul class="dropdown__list">

              </ul>
              <input id="for-pet" type="hidden" name="pet" value="">
            </div>
            <p class="error"></p></div>
          </fieldset>

          <label class="checkbox recurrent">
            <input type="checkbox" name="recurrent" value="no">
            <span class="checkbox__box"></span>
            Make this a monthly recurring gift
          </label>
          <div class="bottom-steps">
            <div class="steps">
              <div class="step step--full"></div>
              <div class="step"></div>
              <div class="step"></div>
            </div>
            <div class="btn btn--turquoise next-step disabled">
              <div class="btn__text">next</div>
            </div>
          </div>`);
    const list = container.querySelector('.dropdown__list');
    const p = container.querySelector('.choose-pet .error');
    if (pets.length === 0) {
        if (p)
            p.textContent = 'Error getting pet data. Please refresh page';
    }
    if (list)
        drawListItems(pets, list);
    handlers.initDropdowns(container);
    return container;
}
function drawListItems(pets, list) {
    pets.forEach((pet) => {
        const el = createTag('li', ['dropdown__item']);
        el.textContent = `${pet.name} the ${pet.commonName}`;
        el.dataset.value = pet.id.toString();
        list === null || list === void 0 ? void 0 : list.append(el);
    });
}
//# sourceMappingURL=donationStep1.js.map