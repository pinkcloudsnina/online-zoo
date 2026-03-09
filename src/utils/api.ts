import type {Animal} from '../types/Animal.js';
import {Camera} from '../types/Camera.js';

const server = 'https://vsqsnqnxkh.execute-api.eu-central-1.amazonaws.com/prod';

export async function getAnimalInfo(id: number): Promise<Animal | null> {
    try {
        const response = await fetch(`${server}/pets/${id}`);

        const json = await response.json();

        return json.data as Animal;
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}

export async function getCamerasInfo(): Promise<Camera[] | null> {
    try {
        const response = await fetch(`${server}/cameras`);

        const json = await response.json();
        return json.data as Camera[];
    } catch (err) {
        console.error('Fetch error:', err);
        return null;
    }
}
