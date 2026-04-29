export function toCamelCase(str: string): string {
    return str
        .split(' ')
        .map((word, i) => (i === 0 ? word.toLowerCase() : word[0]?.toUpperCase() + word.slice(1)))
        .join('');
}
