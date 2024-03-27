import {render} from '@testing-library/react';
import {describe, expect, it} from 'vitest';
import Home from './Home';

describe('Home', () => {
    it('should render the Home component', () => {
        const renderedComp = render(<Home />);
        expect(renderedComp).toMatchSnapshot();
    });
});
