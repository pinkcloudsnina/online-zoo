import { createTag } from '../utils/tagEl.js';
export function drawFavDonations(accumulatedDonations, handlers) {
    const donationContainer = document.querySelector('.donation-stats');
    if (donationContainer)
        donationContainer.innerHTML = '';
    for (const donation of accumulatedDonations) {
        const item = createTag('li', ['animal-stats']);
        const animalData = handlers.getPetData(donation.petId);
        if (!animalData)
            return;
        item.insertAdjacentHTML('afterbegin', `<div class="fav-animal">
                <img src="../../assets/images/animal-info/about-${donation.petId}.jpg" alt="${animalData.commonName}">
                <div class="fav-name">${animalData.name}</div>
                <div class="like filled"></div>
            </div>
            <div class="donation-track">
              <div class="relative-track">
               <span class="donation-amount">${donation.totalDonation}$</span>
              </div>
            </div>`);
        const track = item.querySelector('.relative-track');
        setTimeout(() => {
            if (track && donation.share)
                track.style.width = `${donation.share}%`;
        }, 1000);
        donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(item);
    }
}
export function drawOtherDonations(accumulatedDonations, handlers) {
    const donationContainer = document.querySelector('.other-donation-list');
    if (donationContainer)
        donationContainer.innerHTML = '';
    for (const donation of accumulatedDonations) {
        const item = createTag('li', ['other-donation-item']);
        const animalData = handlers.getPetData(donation.petId);
        if (!animalData)
            return;
        item.insertAdjacentHTML('afterbegin', `
              <div class="animal-logo">
                <img src="../../assets/images/animal-info/about-${animalData.id}.jpg" alt="${animalData.commonName}">
              </div>
              <div class="fav-name">${animalData.name}</div>
              <div class="donation-amount">${donation.totalDonation}$</div>
          `);
        donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(item);
    }
}
//# sourceMappingURL=donationStats.js.map