import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { IDevice } from '../../model/item.type';
import DeviceModel from './DeviceModel';

const mockDevice: IDevice = {
    id: 1,
    category: 'Category',
    type: 'Type',
    brand: 'Brand',
    owner: 'Owner',
    accessories: true,
    warranty: false,
    date: new Date('2024-03-31'),
};

describe('DeviceModel', () => {
    it('should match snapshot', () => {
        const {container} = render(
            <DeviceModel onClose={() => {}} data={mockDevice} />,
        );
        expect(container).toMatchSnapshot();
    });
});
