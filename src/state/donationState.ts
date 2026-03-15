export interface DonationState {
    name: string | null;
    email: string | null;
    amount: number | null;
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

export function setDonationAmount(amount: number | null): void {
    donationState.amount = amount;
}

export function setDonationAnimal(id: number | null): void {
    donationState.petId = id;
}

export function getDonationState(): DonationState {
    return donationState;
}

export function getDonationAmount(): number | null {
    return donationState.amount;
}

export function clearDonationState(): void {
    donationState.name = null;
    donationState.email = null;
    donationState.amount = null;
    donationState.petId = null;
}
