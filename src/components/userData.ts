import {createTag} from '../utils/tagEl.js';
import {authState} from '../state/authState.js';

export function drawUserData(): HTMLElement {
    const container = createTag('div');
    container.insertAdjacentHTML(
        'afterbegin',
        `
        <h2 class="topper">
            You are signed in
          </h2>
          <h3>Your information:</h3>
          <div class="line"></div>
          <div>${authState.user?.name}</div>
          <div>${authState.user?.email}</div>
          <div id="logoutBtn" class="btn btn--turquoise" inactive>
              <div class="btn__text">Logout</div>
            </div>
      `
    );
    return container;
}
