import React from 'react';
import ReactDOM from 'react-dom/client';
import {RouterProvider} from 'react-router-dom';
import router from './Routes/Routes';
import './index.css';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement,
);
ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <RouterProvider router={router} />
    </React.StrictMode>,
);
