// Mock ResizeObserver
global.ResizeObserver = class {
    observe() {}
    unobserve() {}
    disconnect() {}
};

// Your test code
import {render} from '@testing-library/react';
import {BrowserRouter as Router} from 'react-router-dom';
import {describe, expect, it} from 'vitest';
import ChartPage from './Chart';

describe('ChartPage', () => {
    it('should render the Chart Page component', () => {
        const {container} = render(
            <Router>
                <ChartPage />
            </Router>,
        );
        const snapshot = container.innerHTML;
        expect(snapshot).toMatchSnapshot();
    });
});
