export function renderMap(containerId, lat, lng) {
    const map = L.map(containerId).setView([lat, lng], 3);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);
    L.marker([lat, lng]).addTo(map);
    setTimeout(() => {
        map.invalidateSize();
    }, 0);
}
//# sourceMappingURL=map.js.map