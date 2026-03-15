export function parseCoordinate(coord) {
    if (!coord)
        return NaN;
    const value = parseFloat(coord);
    if (coord.includes('S') || coord.includes('W'))
        return -value;
    return value;
}
//# sourceMappingURL=coordinates.js.map