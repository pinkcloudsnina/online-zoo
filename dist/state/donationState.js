const donationState = {
    name: null,
    email: null,
    amount: null,
    petId: null,
};
export function setDonationUserName(name) {
    donationState.name = name;
}
export function setDonationUserEmail(email) {
    donationState.email = email;
}
export function setDonationAmount(amount) {
    donationState.amount = amount;
}
export function setDonationPet(id) {
    donationState.petId = id;
}
export function getDonationState() {
    return donationState;
}
export function getDonationAmount() {
    return donationState.amount;
}
export function getDonationPet() {
    return donationState.petId;
}
export function getDonationEmail() {
    return donationState.email;
}
export function getDonationName() {
    return donationState.name;
}
export function clearDonationState() {
    donationState.name = null;
    donationState.email = null;
    donationState.amount = null;
    donationState.petId = null;
}
const cardState = {
    cardNum: null,
    cvv: null,
    date: {
        month: null,
        year: null,
    },
};
export function setCardNum(num) {
    cardState.cardNum = num;
}
export function setCVV(cvv) {
    cardState.cvv = cvv;
}
export function setCardDate(key, value) {
    cardState.date[key] = value;
}
export function getCardMonth() {
    return cardState.date.month;
}
export function getCardYear() {
    return cardState.date.year;
}
export function getCardState() {
    return cardState;
}
//# sourceMappingURL=donationState.js.map