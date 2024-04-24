import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import {IDevice} from '../../model/item.type';
import EditDevice from './Update';

const mockDevice: IDevice = {
    id: 1,
    category: 'Electronics',
    type: 'Type',
    brand: 'Brand',
    owner: 'Owner',
    accessories: true,
    warranty: false,
    date: new Date('2024-03-31'),
};

describe('EditDevice', () => {
    it('should match snapshot', () => {
        const {container} = render(
            <EditDevice
                data={mockDevice}
                onBackButtonHandle={() => {}}
                onSaveButtonHandler={() => {}}
            />,
        );

        expect(container).toMatchSnapshot();
    });
});
