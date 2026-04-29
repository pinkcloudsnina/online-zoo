import {Theme, updateTheme} from '../components/theme.js';

const htmlEl = document.querySelector<HTMLElement>('html');

export function initTheme(): void {
    const themeBtn = document.querySelector<HTMLElement>('.theme');
    const theme: Theme = (localStorage.getItem('theme') as Theme) || 'light';
    updateTheme(htmlEl!, theme);
    localStorage.setItem('theme', theme);
    themeBtn?.addEventListener('click', toggleTheme);

    window.addEventListener('storage', synchronizeTheme);
}

function toggleTheme(): void {
    if (htmlEl?.classList.contains('dark')) {
        updateTheme(htmlEl, 'light');
        localStorage.setItem('theme', 'light');
    } else {
        updateTheme(htmlEl!, 'dark');
        localStorage.setItem('theme', 'dark');
    }
}

function synchronizeTheme(): void {
    const theme: Theme | null = localStorage.getItem('theme') as Theme;
    if (theme) updateTheme(htmlEl!, theme);
}
