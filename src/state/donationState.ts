export interface DonationState {
    name: string | null;
    email: string | null;
    amount: string | null;
    petId: number | null;
}

const donationState: DonationState = {
    name: null,
    email: null,
    amount: null,
    petId: null,
};

export function setDonationUserName(name: string | null): void {
    donationState.name = name;
}

export function setDonationUserEmail(email: string | null): void {
    donationState.email = email;
}

export function setDonationAmount(amount: string | null): void {
    donationState.amount = amount;
}

export function setDonationPet(id: number | null): void {
    donationState.petId = id;
}

export function getDonationState(): DonationState {
    return donationState;
}

export function getDonationAmount(): string | null {
    return donationState.amount;
}

export function getDonationPet(): number | null {
    return donationState.petId;
}

export function getDonationEmail(): string | null {
    return donationState.email;
}

export function getDonationName(): string | null {
    return donationState.name;
}

export function clearDonationState(): void {
    donationState.name = null;
    donationState.email = null;
    donationState.amount = null;
    donationState.petId = null;
}

export interface CardState {
    cardNum: string | null;
    cvv: string | null;
    date: {
        month: number | null;
        year: number | null;
    };
}

const cardState: CardState = {
    cardNum: null,
    cvv: null,
    date: {
        month: null,
        year: null,
    },
};

export function setCardNum(num: string | null) {
    cardState.cardNum = num;
}

export function setCVV(cvv: string | null) {
    cardState.cvv = cvv;
}

export function setCardDate(key: 'month' | 'year', value: number | null) {
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
