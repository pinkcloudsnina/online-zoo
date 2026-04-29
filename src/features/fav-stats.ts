import {drawBarDonations, drawFavDonations, drawOtherDonations, drawPieDonations} from '../components/donationStats.js';
import {getPetById} from '../state/animalState.js';
import {AccumulatedDonation, DonationStats} from '../types/interfaces.js';
import {highlightNode} from '../utils/highlightChosen.js';
import {getFavs} from './chooseFavs.js';

export function initDonationStats(): void {
    const selectedChartId = document.querySelector<HTMLElement>('.chart-icon.selected')?.id;
    const accumulatedFavDonations = getAccDonations('fav');
    switch (selectedChartId) {
        case 'main-chart':
            showMainChart(accumulatedFavDonations);
            break;
        case 'bar-chart':
            showBarChart(accumulatedFavDonations);
            break;
        case 'pie-chart':
            showPieChart(accumulatedFavDonations);
            break;
    }

    const otherDonations = getAccDonations('other');
    const otherDonationsWithPetInfo = addPetInfo(otherDonations);
    drawOtherDonations(otherDonationsWithPetInfo);

    const chartList = document.querySelector('.charts');
    chartList?.addEventListener('click', chartHandler);
}

function getDonationList(): DonationStats[] {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]') as DonationStats[];
    return donationList;
}

function getAccDonations(setting: 'fav' | 'other'): AccumulatedDonation[] {
    const currentFavs = getFavs();
    const donationsList: DonationStats[] = getDonationList();

    const accumulatedDonations: AccumulatedDonation[] = [];

    if (setting === 'fav') {
        for (const favAnimal of currentFavs) {
            calcTotal(favAnimal);
        }
    }

    if (setting === 'other') {
        const otherAnimalList = donationsList.reduce((acc: number[], curr) => {
            if (!acc.includes(curr.petId) && !currentFavs.includes(curr.petId)) {
                acc.push(curr.petId);
            }
            return acc;
        }, []);

        for (const otherAnimal of otherAnimalList) {
            calcTotal(otherAnimal);
        }
    }

    function calcTotal(animalId: number): void {
        const donationsForAnimal = donationsList.filter((donation) => donation.petId === animalId);
        const total = donationsForAnimal.reduce((acc, curr) => {
            return acc + curr.amount;
        }, 0);
        accumulatedDonations.push({petId: animalId, totalDonation: total});
    }

    return accumulatedDonations;
}

function addRelShare(donations: AccumulatedDonation[], setting: 'total' | 'biggest'): AccumulatedDonation[] {
    let basis: number = 0;
    if (setting === 'biggest') {
        basis = findBiggestAnimalDonation(donations);
    } else {
        basis = calcTotalDonations(donations);
    }

    return donations.map((el) => ({
        ...el,
        share: basis ? Number(((el.totalDonation / basis) * 100).toFixed(2)) : 0,
    }));
}

function addPetInfo(donations: AccumulatedDonation[]): AccumulatedDonation[] {
    return donations.map((el) => {
        const pet = getPetById(el.petId);
        return {...el, petName: pet?.name, commonName: pet?.commonName};
    }) as AccumulatedDonation[];
}

function chartHandler(e: Event) {
    const clickedBtn = e.target as HTMLElement;
    const chartBtns = document.querySelectorAll<HTMLElement>('.chart-icon');
    highlightNode(chartBtns, clickedBtn, 'selected');
    const accumulatedFavDonations = getAccDonations('fav');
    switch (clickedBtn?.id) {
        case 'main-chart':
            showMainChart(accumulatedFavDonations);
            break;
        case 'bar-chart':
            showBarChart(accumulatedFavDonations);
            break;
        case 'pie-chart':
            showPieChart(accumulatedFavDonations);
            break;
    }
}

function showMainChart(donations: AccumulatedDonation[]): void {
    const donationsWithShare = addRelShare(donations, 'biggest');
    const accDonationsWithNames = addPetInfo(donationsWithShare);
    drawFavDonations(accDonationsWithNames);
}

function calcTotalDonations(donations: AccumulatedDonation[]): number {
    return donations.reduce((acc, curr) => {
        return acc + curr.totalDonation;
    }, 0);
}

function findBiggestAnimalDonation(donations: AccumulatedDonation[]): number {
    return donations.reduce((prev, curr) => {
        return curr.totalDonation > prev ? curr.totalDonation : prev;
    }, 0);
}

function showBarChart(donations: AccumulatedDonation[]): void {
    const donationsWithShare = addRelShare(donations, 'biggest');
    const donationsWithAnimalInfo = addPetInfo(donationsWithShare);
    const topDonation = findBiggestAnimalDonation(donations);
    drawBarDonations(donationsWithAnimalInfo, topDonation);
}

function showPieChart(donations: AccumulatedDonation[]): void {
    const donationsWithShare = addRelShare(donations, 'total');
    const donationsWithAnimalInfo = addPetInfo(donationsWithShare);
    const totalDonation = calcTotalDonations(donations);
    drawPieDonations(donationsWithAnimalInfo, totalDonation);
}
