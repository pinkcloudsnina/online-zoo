import {initDonationStep1} from './donationStep1.js';

export function initDonateBtns() {
    const donateBtns = document.querySelectorAll<HTMLDivElement>('.donate-btn');
    donateBtns.forEach((btn) => {
        btn.addEventListener('click', initDonationStep1);
    });
}

export function initNextStepBtn(nextHandler: () => void): void {
    const nextStepBtn = document.querySelector<HTMLElement>('.next-step');
    nextStepBtn?.addEventListener('click', () => {
        if (nextStepBtn?.classList.contains('disabled')) return;
        nextHandler();
    });
}

export function initPrevStepBtn(prevHandler: () => void) {
    const prevStepBtn = document.querySelector<HTMLElement>('.prev-step');
    prevStepBtn?.addEventListener('click', prevHandler);
}
