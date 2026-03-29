import {AccumulatedDonation, Pet} from '../types/interfaces.js';
import {createTag} from '../utils/tagEl.js';

export function drawFavDonations(
    accumulatedDonations: AccumulatedDonation[],
    handlers: {getPetData: (id: number) => Pet | undefined}
): void {
    console.log(accumulatedDonations);

    const donationContainer = document.querySelector<HTMLElement>('.donation-stats');
    if (donationContainer) donationContainer.innerHTML = '';
    for (const donation of accumulatedDonations) {
        const item = createTag('li', ['animal-stats']);
        const animalData = handlers.getPetData(donation.petId);
        if (!animalData) return;

        item.insertAdjacentHTML(
            'afterbegin',
            `
            <div class="fav-animal">
                <img src="../../assets/images/animal-info/about-${donation.petId}.jpg" alt="">
                <div class="fav-name">${animalData.name}</div>
              </div>
              <div class="donation-track">
                <div class="relative-track"><span class="donation-amount">${donation.totalDonation}$</span></div>
              </div>
          `
        );
        const track = item.querySelector<HTMLElement>('.relative-track');
        if (track) track.style.width = `${donation.share}%`;
        donationContainer?.append(item);
    }
}
