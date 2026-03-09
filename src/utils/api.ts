import type {Animal} from '../types/Animal.js';

export async function getAnimalInfo(id: number): Promise<Animal | null> {
    try {
        const response = await fetch(`https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod/pets/${id}`);

        const json = await response.json();
        return json.data as Animal;
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}
