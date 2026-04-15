import {drawBarDonations, drawFavDonations, drawOtherDonations} from '../components/donationStats.js';
import {getPetById} from '../state/animalState.js';
import {AccumulatedDonation, DonationStats} from '../types/interfaces.js';
import {highlightNode} from '../utils/highlightChosen.js';
import {getFavs} from './chooseFavs.js';

export function initDonationStats(): void {
    const selectedChartId = document.querySelector<HTMLElement>('.chart-icon.selected')?.id;
    switch (selectedChartId) {
        case 'main-chart':
            showMainChart();
            break;
        case 'bar-chart':
            showBarChart();
            break;
        case 'pie-chart':
            showPieChart();
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

function getAccDonations(setting: 'fav' | 'other') {
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
        share: basis ? Math.floor((el.totalDonation / basis) * 100) : 0,
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

    switch (clickedBtn?.id) {
        case 'main-chart':
            showMainChart();
            break;
        case 'bar-chart':
            showBarChart();
            break;
        case 'pie-chart':
            showPieChart();
            break;
    }
}

function showMainChart(): void {
    const accumulatedFavDonations = getAccDonations('fav');
    const donationsWithShare = addRelShare(accumulatedFavDonations, 'biggest');

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

function showBarChart(): void {
    const accumulatedFavDonations = getAccDonations('fav');
    const donationsWithShare = addRelShare(accumulatedFavDonations, 'biggest');
    const donationsWithAnimalInfo = addPetInfo(donationsWithShare);
    const topDonation = findBiggestAnimalDonation(accumulatedFavDonations);
    drawBarDonations(donationsWithAnimalInfo, topDonation);
}

function showPieChart(): void {}
