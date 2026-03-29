import { initDonationStep1 } from './donationStep1.js';
export function initDonateBtns() {
    const donateBtns = document.querySelectorAll('.donate-btn');
    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}
export function initNextStepBtn(nextHandler) {
    const nextStepBtn = document.querySelector('.next-step');
    nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.addEventListener('click', () => {
        if (nextStepBtn === null || nextStepBtn === void 0 ? void 0 : nextStepBtn.classList.contains('disabled'))
            return;
        nextHandler();
    });
}
export function initPrevStepBtn(prevHandler) {
    const prevStepBtn = document.querySelector('.prev-step');
    prevStepBtn === null || prevStepBtn === void 0 ? void 0 : prevStepBtn.addEventListener('click', prevHandler);
}
//# sourceMappingURL=donation.js.map