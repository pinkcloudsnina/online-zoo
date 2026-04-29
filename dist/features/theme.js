import { updateTheme } from '../components/theme.js';
const htmlEl = document.querySelector('html');
export function initTheme() {
    const themeBtn = document.querySelector('.theme');
    const theme = localStorage.getItem('theme') || 'light';
    updateTheme(htmlEl, theme);
    localStorage.setItem('theme', theme);
    themeBtn === null || themeBtn === void 0 ? void 0 : themeBtn.addEventListener('click', toggleTheme);
    window.addEventListener('storage', synchronizeTheme);
}
function toggleTheme() {
    if (htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.contains('dark')) {
        updateTheme(htmlEl, 'light');
        localStorage.setItem('theme', 'light');
    }
    else {
        updateTheme(htmlEl, 'dark');
        localStorage.setItem('theme', 'dark');
    }
}
function synchronizeTheme() {
    const theme = localStorage.getItem('theme');
    if (theme)
        updateTheme(htmlEl, theme);
}
//# sourceMappingURL=theme.js.map