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
                    <br></br>
                    <Link
                        to='/'
                        className='sidebar-item'
                        style={{color: '#E6E6E6'}}
                    >
                        See Database
                    </Link>
                    <hr></hr>
                    <Link
                        to='/search'
                        className='sidebar-item'
                        style={{color: '#E6E6E6'}}
                    >
                        Search
                    </Link>
                    <hr></hr>
                    <Link
                        to='/sort'
                        className='sidebar-item'
                        style={{color: '#E6E6E6'}}
                    >
                        Sort
                    </Link>
                    <hr></hr>
                    <Link
                        to='/chart'
                        className='sidebar-item'
                        style={{color: '#E6E6E6'}}
                    >
                        Chart
                    </Link>
                    <hr></hr>
                </div>
            </div>
            <button
                className='hide-button'
                onClick={handleToggle}
                style={{
                    backgroundColor: '#DAA520',
                    borderRadius: '5px',
                    color: 'black',
                }}
            >
                &#9776;
            </button>
        </>
    );
};

export default SideBar;
