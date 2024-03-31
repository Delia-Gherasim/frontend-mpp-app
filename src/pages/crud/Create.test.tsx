import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import AddDevice from './Create';

describe('AddDevice component', () => {
    it('renders correctly', () => {
        const {asFragment} = render(
            <AddDevice
                onBackButtonHandle={() => {}}
                onSaveButtonHandler={() => {}}
            />,
        );
        expect(asFragment()).toMatchSnapshot();
    });
});
