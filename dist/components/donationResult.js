import { createTag } from '../utils/tagEl.js';
export function drawDonationResult(result, message) {
    const container = createTag('div', ['content-1']);
    container.insertAdjacentHTML('afterbegin', `
          <h2 class="topper">
            Donation ${result === 'success' ? 'successful' : 'failed'}
          </h2>
            <p class='donation-result'>
${message}
          </p>`);
    return container;
}
//# sourceMappingURL=donationResult.js.map