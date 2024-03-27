export interface IDevice {
    id: string;
    type: string;
    brand: string;
    owner: string;
    accessories: boolean;
    warranty: boolean;
    date: Date;
}

export const dummyDeviceList: IDevice[] = [
    {
        id: '1111',
        type: 'laptop',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 1),
    },
    {
        id: '1112',
        type: 'laptop',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 16),
    },
    {
        id: '1113',
        type: 'laptop',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 7),
    },
    {
        id: '1114',
        type: 'laptop3',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 18),
    },
    {
        id: '1115',
        type: 'laptop4',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 9),
    },
    {
        id: '1116',
        type: 'laptop5',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 20),
    },
    {
        id: '1117',
        type: 'laptop6',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 21),
    },
    {
        id: '1118',
        type: 'laptop7',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 2),
    },
    {
        id: '1119',
        type: 'laptop8',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 1),
    },
    {
        id: '1120',
        type: 'laptop9',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 15),
    },
    {
        id: '1121',
        type: 'laptop10',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 15),
    },
    {
        id: '1122',
        type: 'laptop11',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 15),
    },
    {
        id: '1123',
        type: 'laptop12',
        brand: 'Asus',
        owner: 'eu',
        accessories: true,
        warranty: true,
        date: new Date(2024, 3, 15),
    },
    {
        id: '1124',
        type: 'laptop13',
        brand: 'Asus',
        owner: 'tu',
        accessories: false,
        warranty: false,
        date: new Date(2024, 3, 15),
    },
];

export enum PageEnum {
    list,
    add,
    edit,
}
