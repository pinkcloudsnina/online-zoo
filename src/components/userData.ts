import {createTag} from '../utils/tagEl.js';
import {User} from '../types/interfaces.js';

export function drawUserData(user: User, handlers: {onLogout: () => void}): HTMLElement {
    const container = createTag('div', ['content-1']);
    container.insertAdjacentHTML(
        'afterbegin',
        `
        <h2 class="topper">
            You are signed in
          </h2>
          <h3>Your information:</h3>
          <div class="line"></div>
          <div class="container">
            <ul class="user-info">
              <li><span>Name:</span>${user.name}</li>
              <li><span>Email:</span>${user.email}</li>
            </ul>
            <div id="logoutBtn" class="btn btn--turquoise" inactive>
              <div class="btn__text">Logout</div>
            </div>
          </div>
      `
    );
    const logoutBtn = container.querySelector<HTMLElement>('#logoutBtn');
    logoutBtn?.addEventListener('click', handlers.onLogout);
    return container;
}
