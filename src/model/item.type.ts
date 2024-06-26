export interface IDevice {
    id: number;
    category: string;
    type: string;
    brand: string;
    owner: string;
    accessories: boolean;
    warranty: boolean;
    date: Date;
}

export interface IClient {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    owedSum: number;
    extras: string;
}

// export const dummyDeviceList: IDevice[] = [
//     {
//         id: '1111',
//         category: 'pl',
//         type: 'laptop',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 1),
//     },
//     {
//         id: '1112',
//         category: 'pl',
//         type: 'laptop',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 16),
//     },
//     {
//         id: '1113',
//         category: 'pl',
//         type: 'laptop',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 7),
//     },
//     {
//         id: '1114',
//         category: 'pl',
//         type: 'laptop3',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 18),
//     },
//     {
//         id: '1115',
//         category: 'pl',
//         type: 'laptop4',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 9),
//     },
//     {
//         id: '1116',
//         category: 'pl',
//         type: 'laptop5',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 20),
//     },
//     {
//         id: '1117',
//         category: 'pl',
//         type: 'laptop6',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 21),
//     },
//     {
//         id: '1118',
//         category: 'pl',
//         type: 'laptop7',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 2),
//     },
//     {
//         id: '1119',
//         category: 'pl',
//         type: 'laptop8',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 1),
//     },
//     {
//         id: '1120',
//         category: 'pl',
//         type: 'laptop9',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 15),
//     },
//     {
//         id: '1121',
//         category: 'pl',
//         type: 'laptop10',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 15),
//     },
//     {
//         id: '1122',
//         category: 'pl',
//         type: 'laptop11',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 15),
//     },
//     {
//         id: '1123',
//         category: 'pl',
//         type: 'laptop12',
//         brand: 'Asus',
//         owner: 'eu',
//         accessories: true,
//         warranty: true,
//         date: new Date(2024, 3, 15),
//     },
//     {
//         id: '1124',
//         category: 'pl',
//         type: 'laptop13',
//         brand: 'Asus',
//         owner: 'tu',
//         accessories: false,
//         warranty: false,
//         date: new Date(2024, 3, 15),
//     },
// ];

export enum PageEnum {
    list,
    add,
    edit,
}
