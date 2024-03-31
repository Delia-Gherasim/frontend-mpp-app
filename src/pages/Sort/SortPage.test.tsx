import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import Sort from './SortPage';

describe('Sort', () => {
    it('should render the Sort page', () => {
        const renderedComp = render(
            <Router>
                <Sort />
            </Router>,
        );
        expect(renderedComp).toMatchSnapshot();
    });
});
