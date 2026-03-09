export function renderMap(containerId: string, lat: number, lng: number): void {
    const map = L.map(containerId).setView([lat, lng], 2);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
    }).addTo(map);

    L.marker([lat, lng]).addTo(map);

    setTimeout(() => {
        map.invalidateSize();
    }, 0);
}
