import {createBrowserRouter} from 'react-router-dom';
import {describe, expect, test} from 'vitest';
describe('Router configuration snapshot', () => {
    test('Snapshot test', () => {
        expect(createBrowserRouter).toMatchSnapshot();
    });
});
