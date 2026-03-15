export function toCamelCase(str) {
    return str
        .split(' ')
        .map((word, i) => { var _a; return (i === 0 ? word.toLowerCase() : ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.slice(1)); })
        .join('');
}
//# sourceMappingURL=toCamelCase.js.map