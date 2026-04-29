export function updateTheme(htmlEl, theme) {
    if (theme === 'dark') {
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.add('dark');
    }
    else {
        htmlEl === null || htmlEl === void 0 ? void 0 : htmlEl.classList.remove('dark');
    }
}
//# sourceMappingURL=theme.js.map