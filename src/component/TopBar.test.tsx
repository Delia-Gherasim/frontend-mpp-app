import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import TopBar from './TopBar';
describe('TopBar', () => {
    it('should render the top bar', () => {
        const renderedComp = render(<TopBar />);
        expect(renderedComp).toMatchSnapshot();
    });
});
