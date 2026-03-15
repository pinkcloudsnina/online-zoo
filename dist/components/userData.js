import { createTag } from '../utils/tagEl.js';
import { authState } from '../state/authState.js';
export function drawUserData() {
    var _a, _b;
    const container = createTag('div', ['content-1']);
    container.insertAdjacentHTML('afterbegin', `
        <h2 class="topper">
            You are signed in
          </h2>
          <h3>Your information:</h3>
          <div class="line"></div>
          <div class="container">
            <ul class="user-info">
              <li><span>Name:</span>${(_a = authState.user) === null || _a === void 0 ? void 0 : _a.name}</li>
              <li><span>Email:</span>${(_b = authState.user) === null || _b === void 0 ? void 0 : _b.email}</li>
          </ul>
          <div id="logoutBtn" class="btn btn--turquoise" inactive>
              <div class="btn__text">Logout</div>
            </div>
          </div>

      `);
    return container;
}
//# sourceMappingURL=userData.js.map