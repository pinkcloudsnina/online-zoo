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
export function setDonationAnimal(id) {
    donationState.petId = id;
}
export function getDonationState() {
    return donationState;
}
export function getDonationAmount() {
    return donationState.amount;
}
export function clearDonationState() {
    donationState.name = null;
    donationState.email = null;
    donationState.amount = null;
    donationState.petId = null;
}
//# sourceMappingURL=donationState.js.map