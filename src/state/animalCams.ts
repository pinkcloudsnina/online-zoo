export interface animalCams {
    animalId: number;
    cameras: {
        link: string;
        img: string;
    }[];
}

export const animalCamsData: animalCams[] = [
    {
        animalId: 1,
        cameras: [
            {
                link: '',
                img: '../../assets/images/1/cam-1.jpg',
            },
            {
                link: 'https://site.com/camera2',
                img: 'https://site.com/camera2.jpg',
            },
            {
                link: 'https://site.com/camera3',
                img: 'https://site.com/camera3.jpg',
            },
        ],
    },
];
