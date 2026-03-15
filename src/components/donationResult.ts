import {createTag} from '../utils/tagEl.js';
export function drawDonationResult(result: 'success' | 'error', message: string): HTMLElement {
    const container = createTag('div', ['content-1']);
    container.insertAdjacentHTML(
        'afterbegin',
        `
          <h2 class="topper">
            Donation result
          </h2>
            <p>
${message}
          </p>`
    );
    return container;
}
