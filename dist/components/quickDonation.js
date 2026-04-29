import { createTag } from '../utils/tagEl.js';
const main = document.querySelector('main');
export function drawQuickDonation() {
    let container = document.querySelector('.quick-donation');
    if (!container) {
        container = createTag('section', ['quick-donation']);
        main.append(container);
    }
    else
        container.innerHTML = '';
    container.insertAdjacentHTML('afterbegin', `<div class="container">
          <div class="donation__descr">
            <h2 class="header--white">make the Bamboo Donation!</h2>
            <p class="paragraph--white">
              Our process for bamboo donations first starts with a site evaluation. It is important that our team sees
              where the bamboo is growing, then determining if the bamboo is a species that our animals are currently
              eating. Thank you for your interest in donating bamboo for our pandas.
            </p>
          </div>
          <div class="donation__btn">
            <h3 class="header--white">Quick Donate</h3>
            <div class="btn btn--double"><input type="text" class="btn__input" name="donation_custom"
                placeholder="$ donation amount">
              <div class="btn__submit"></div>
            </div>
          </div>

        </div>`);
}
//# sourceMappingURL=quickDonation.js.map