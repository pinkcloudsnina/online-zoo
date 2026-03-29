import {drawFavDonations} from '../components/donationStats.js';
import {getPetById} from '../state/animalState.js';
import {AccumulatedDonation, DonationStats} from '../types/interfaces.js';
import {getFavs} from './chooseFavs.js';

export function initDonationStats(): void {
    const currentFavs = getFavs();
    const donationsList: DonationStats[] = getDonationList();

    const accumulatedDonations = getAccumulatedDonations(currentFavs, donationsList);

    const donationsWithShare = calcRelShare(accumulatedDonations);

    drawFavDonations(donationsWithShare, {getPetData: getPetById});
}

function getDonationList(): DonationStats[] {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]') as DonationStats[];
    return donationList;
}

function getAccumulatedDonations(currentFavs: number[], donationsList: DonationStats[]) {
    const accumulatedDonations: AccumulatedDonation[] = [];
    for (const favAnimal of currentFavs) {
        const donationsForAnimal = donationsList.filter((donation) => donation.petId === favAnimal);
        const total = donationsForAnimal.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        accumulatedDonations.push({petId: favAnimal, totalDonation: total});
    }
    return accumulatedDonations;
}

function calcRelShare(donations: AccumulatedDonation[]): AccumulatedDonation[] {
    const maxDonation = donations.reduce((prev, curr) => {
        return curr.totalDonation > prev ? curr.totalDonation : prev;
    }, 0);

    return donations.map((el) => ({
        ...el,
        share: maxDonation ? Math.floor((el.totalDonation / maxDonation) * 100) : 0,
    }));
}
