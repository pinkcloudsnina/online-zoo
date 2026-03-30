import { drawFavDonations, drawOtherDonations } from '../components/donationStats.js';
import { getPetById } from '../state/animalState.js';
import { getFavs } from './chooseFavs.js';
export function initDonationStats() {
    const currentFavs = getFavs();
    const donationsList = getDonationList();
    const accumulatedFavDonations = getAccDonations(currentFavs, donationsList, 'fav');
    const donationsWithShare = calcRelShare(accumulatedFavDonations);
    const otherDonations = getAccDonations(currentFavs, donationsList, 'other');
    drawFavDonations(donationsWithShare, { getPetData: getPetById });
    drawOtherDonations(otherDonations, { getPetData: getPetById });
}
function getDonationList() {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]');
    return donationList;
}
function getAccDonations(currentFavs, donationsList, setting) {
    const accumulatedDonations = [];
    if (setting === 'fav') {
        for (const favAnimal of currentFavs) {
            calcTotal(favAnimal);
        }
    }
    if (setting === 'other') {
        const otherAnimalList = donationsList.reduce((acc, curr) => {
            if (!acc.includes(curr.petId) && !currentFavs.includes(curr.petId)) {
                acc.push(curr.petId);
            }
            return acc;
        }, []);
        for (const otherAnimal of otherAnimalList) {
            calcTotal(otherAnimal);
        }
    }
    function calcTotal(animalId) {
        const donationsForAnimal = donationsList.filter((donation) => donation.petId === animalId);
        const total = donationsForAnimal.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        accumulatedDonations.push({ petId: animalId, totalDonation: total });
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