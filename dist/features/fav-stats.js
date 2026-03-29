import { drawFavDonations } from '../components/donationStats.js';
import { getPetById } from '../state/animalState.js';
import { getFavs } from './chooseFavs.js';
export function initDonationStats() {
    const currentFavs = getFavs();
    const donationsList = getDonationList();
    const accumulatedDonations = getAccumulatedDonations(currentFavs, donationsList);
    const donationsWithShare = calcRelShare(accumulatedDonations);
    drawFavDonations(donationsWithShare, { getPetData: getPetById });
}
function getDonationList() {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]');
    return donationList;
}
function getAccumulatedDonations(currentFavs, donationsList) {
    const accumulatedDonations = [];
    for (const favAnimal of currentFavs) {
        const donationsForAnimal = donationsList.filter((donation) => donation.petId === favAnimal);
        const total = donationsForAnimal.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        accumulatedDonations.push({ petId: favAnimal, totalDonation: total });
    }
    return accumulatedDonations;
}
function calcRelShare(donations) {
    const maxDonation = donations.reduce((prev, curr) => {
        return curr.totalDonation > prev ? curr.totalDonation : prev;
    }, 0);
    return donations.map((el) => (Object.assign(Object.assign({}, el), { share: maxDonation ? Math.floor((el.totalDonation / maxDonation) * 100) : 0 })));
}
//# sourceMappingURL=fav-stats.js.map