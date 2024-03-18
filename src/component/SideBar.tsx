import React from 'react';
import {Link} from 'react-router-dom';
import './SideBar.style.css';

type Props = {
    isOpen: boolean;
    handleToggle: () => void;
};

const SideBar: React.FC<Props> = ({isOpen, handleToggle}) => {
    return (
        <>
            <div className={`sidebar-container ${isOpen ? 'show' : ''}`}>
                <div className='content'>
                    <hr></hr>
                    <Link to='/'>
                        <img
                            src='src\component\iconHouse.png'
                            className='image'
                            alt='Home'
                        />
                    </Link>
                    <hr></hr>
                    <Link to='/' className='sidebar-item'>
                        See Database
                    </Link>
                    <hr></hr>
                    <Link to='/search' className='sidebar-item'>
                        Search
                    </Link>
                    <hr></hr>
                    <Link to='/sort' className='sidebar-item'>
                        Sort
                    </Link>
                </div>
            </div>
            {/* <div className='button'> */}
            <button className='hide-button' onClick={handleToggle}>
                &#9776;
            </button>
            {/* </div> */}
        </>
    );
};

export default SideBar;
