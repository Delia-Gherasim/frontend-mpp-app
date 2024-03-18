import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Search from '../pages/Search/SearchPage';
import Sort from '../pages/Sort/SortPage';
import Home from '../pages/mainPage/Home';

export default createBrowserRouter([
    {
        path: '/',
        element: <App />,
        children: [
            {
                path: '',
                element: <Home />,
            },
            {
                path: 'search',
                element: <Search />,
            },
            {
                path: 'sort',
                element: <Sort />,
            },
        ],
    },
]);
