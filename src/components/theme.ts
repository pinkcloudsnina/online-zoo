export type Theme = 'dark' | 'light';

export function updateTheme(htmlEl: HTMLElement, theme: Theme): void {
    if (theme === 'dark') {
        htmlEl?.classList.add('dark');
    } else {
        htmlEl?.classList.remove('dark');
    }
}
