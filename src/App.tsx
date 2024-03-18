import {useState} from 'react';
import {Outlet} from 'react-router';
import './App.css';
import SideBar from './component/SideBar';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleToggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <SideBar
                isOpen={isSidebarOpen}
                handleToggle={handleToggleSidebar}
            />
            <Outlet />
        </>
    );
}

export default App;
