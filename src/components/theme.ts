const htmlEl = document.querySelector<HTMLElement>('html');

type Theme = 'dark' | 'light';

export function initTheme(): void {
    const themeBtn = document.querySelector<HTMLElement>('.theme');
    const theme: Theme = (localStorage.getItem('theme') as Theme) || 'light';
    updateTheme(theme);
    themeBtn?.addEventListener('click', toggleTheme);
}

function toggleTheme(): void {
    if (htmlEl?.classList.contains('dark')) updateTheme('light');
    else updateTheme('dark');
}

function updateTheme(theme: Theme): void {
    if (theme === 'dark') {
        htmlEl?.classList.add('dark');
    } else {
        htmlEl?.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
}
