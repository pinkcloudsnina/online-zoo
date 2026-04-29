export function parseCoordinate(coord: string): number {
    if (!coord) return NaN;
    const value = parseFloat(coord);
    if (coord.includes('S') || coord.includes('W')) return -value;
    return value;
}
