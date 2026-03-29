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
        item.insertAdjacentHTML('afterbegin', `
            <div class="fav-animal">
                <img src="../../assets/images/animal-info/about-${donation.petId}.jpg" alt="">
                <div class="fav-name">${animalData.name}</div>
              </div>
              <div class="donation-track">
                <div class="relative-track"><span class="donation-amount">${donation.totalDonation}$</span></div>
              </div>
          `);
        const track = item.querySelector('.relative-track');
        setTimeout(() => {
            if (track && donation.share)
                track.style.width = `${donation.share}%`;
        }, 1000);
        donationContainer === null || donationContainer === void 0 ? void 0 : donationContainer.append(item);
    }
}
//# sourceMappingURL=donationStats.js.map