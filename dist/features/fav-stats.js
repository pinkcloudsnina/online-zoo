import { drawBarDonations, drawFavDonations, drawOtherDonations, drawPieDonations } from '../components/donationStats.js';
import { getPetById } from '../state/animalState.js';
import { highlightNode } from '../utils/highlightChosen.js';
import { getFavs } from './chooseFavs.js';
export function initDonationStats() {
    var _a;
    const selectedChartId = (_a = document.querySelector('.chart-icon.selected')) === null || _a === void 0 ? void 0 : _a.id;
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
    chartList === null || chartList === void 0 ? void 0 : chartList.addEventListener('click', chartHandler);
}
function getDonationList() {
    const donationList = JSON.parse(localStorage.getItem('donations') || '[]');
    return donationList;
}
function getAccDonations(setting) {
    const currentFavs = getFavs();
    const donationsList = getDonationList();
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
function addRelShare(donations, setting) {
    let basis = 0;
    if (setting === 'biggest') {
        basis = findBiggestAnimalDonation(donations);
    }
    else {
        basis = calcTotalDonations(donations);
    }
    return donations.map((el) => (Object.assign(Object.assign({}, el), { share: basis ? Number(((el.totalDonation / basis) * 100).toFixed(2)) : 0 })));
}
function addPetInfo(donations) {
    return donations.map((el) => {
        const pet = getPetById(el.petId);
        return Object.assign(Object.assign({}, el), { petName: pet === null || pet === void 0 ? void 0 : pet.name, commonName: pet === null || pet === void 0 ? void 0 : pet.commonName });
    });
}
function chartHandler(e) {
    const clickedBtn = e.target;
    const chartBtns = document.querySelectorAll('.chart-icon');
    highlightNode(chartBtns, clickedBtn, 'selected');
    const accumulatedFavDonations = getAccDonations('fav');
    switch (clickedBtn === null || clickedBtn === void 0 ? void 0 : clickedBtn.id) {
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
function showMainChart(donations) {
    const donationsWithShare = addRelShare(donations, 'biggest');
    const accDonationsWithNames = addPetInfo(donationsWithShare);
    drawFavDonations(accDonationsWithNames);
}
function calcTotalDonations(donations) {
    return donations.reduce((acc, curr) => {
        return acc + curr.totalDonation;
    }, 0);
}
function findBiggestAnimalDonation(donations) {
    return donations.reduce((prev, curr) => {
        return curr.totalDonation > prev ? curr.totalDonation : prev;
    }, 0);
}
function showBarChart(donations) {
    const donationsWithShare = addRelShare(donations, 'biggest');
    const donationsWithAnimalInfo = addPetInfo(donationsWithShare);
    const topDonation = findBiggestAnimalDonation(donations);
    drawBarDonations(donationsWithAnimalInfo, topDonation);
}
function showPieChart(donations) {
    const donationsWithShare = addRelShare(donations, 'total');
    const donationsWithAnimalInfo = addPetInfo(donationsWithShare);
    const totalDonation = calcTotalDonations(donations);
    drawPieDonations(donationsWithAnimalInfo, totalDonation);
}
//# sourceMappingURL=fav-stats.js.map