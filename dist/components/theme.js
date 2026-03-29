const htmlEl = document.querySelector('html');
export function initTheme() {
    const themeBtn = document.querySelector('.theme');
    const theme = localStorage.getItem('theme') || 'light';
    updateTheme(theme);
    themeBtn === null || themeBtn === void 0 ? void 0 : themeBtn.addEventListener('click', toggleTheme);
}
function toggleTheme() {
    if (htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.contains('dark'))
        updateTheme('light');
    else
        updateTheme('dark');
}
function updateTheme(theme) {
    if (theme === 'dark') {
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.add('dark');
    }
    else {
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}
//# sourceMappingURL=theme.js.map