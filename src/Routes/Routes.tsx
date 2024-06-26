import {createBrowserRouter} from 'react-router-dom';
import App from '../App';
import Search from '../pages/Search/SearchPage';
import Sort from '../pages/Sort/SortPage';
import ClientsList from '../pages/clientEntity/ClientsList';
import Home from '../pages/mainPage/Home';
import Chart from '../pages/statistics/Chart';

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
            {
                path: 'chart',
                element: <Chart />,
            },
            {
                path: 'client',
                element: <ClientsList />,
            },
        ],
    },
]);
