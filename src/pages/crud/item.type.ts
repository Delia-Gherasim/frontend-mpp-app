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
        date: new Date(2024, 3, 15),
    },
    {
        id: '1112',
        type: 'laptop',
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
