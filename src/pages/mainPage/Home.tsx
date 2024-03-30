import AddIcon from '@mui/icons-material/Add';
import {
    FormControl,
    InputLabel,
    MenuItem,
    Pagination,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import IconButton from '@mui/material/IconButton';
import React, {useEffect, useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IDevice, PageEnum} from '../../model/item.type';
import AddDevice from '../crud/Create';
import DeviceList from '../crud/DeviceList';
import EditDevice from '../crud/Update';

function Home() {
    const [deviceList, setDeviceList] = useState<IDevice[]>([]);
    const [shownPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IDevice);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [nr, setNr] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const showListPage = () => {
        setShowPage(PageEnum.list);
    };

    const onAddDeviceHandler = () => {
        setShowPage(PageEnum.add);
    };

    const addDevice = (newItem: IDevice) => {
        fetch('http://localhost:5000/crud', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newItem),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const deleteDevice = (data: IDevice) => {
        const url = `http://localhost:5000/crud/${data.id}`;
        fetch(url, {
            method: 'DELETE',
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const editDeviceData = (data: IDevice) => {
        setShowPage(PageEnum.edit);
        setDataToEdit(data);
    };

    const updateData = (data: IDevice) => {
        const url = `http://localhost:5000/crud/${data.id}`;
        fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                fetchList();
            })
            .catch((error) => {
                console.error('Error:', error);
            });
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        setNr(event.target.value as number);
        setPage(1); // Reset page when number of items per page changes
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    const fetchList = () => {
        fetch(`http://localhost:5000/pagination?page=${page}&nr=${nr}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const filteredData = data.items.map(
                    (item: {
                        id: any;
                        category: any;
                        type: any;
                        brand: any;
                        owner: any;
                        accessories: any;
                        warranty: any;
                        date: string | number | Date;
                    }) => ({
                        id: item.id,
                        category: item.category,
                        type: item.type,
                        brand: item.brand,
                        owner: item.owner,
                        accessories: item.accessories,
                        warranty: item.warranty,
                        date: new Date(item.date),
                    }),
                );
                setDeviceList(filteredData);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    useEffect(() => {
        fetchList();
    }, [page, nr]);

    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <TopBar />
            <SideBar
                isOpen={isSidebarOpen}
                handleToggle={handleSidebarToggle}
            />
            <section className='section-content'>
                {shownPage === PageEnum.list && (
                    <>
                        <div
                            className='title-container'
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            <h3 className='title' style={{marginRight: '20px'}}>
                                Device List:
                            </h3>
                            <IconButton
                                onClick={onAddDeviceHandler}
                                className='add-device-button'
                                style={{
                                    backgroundColor: '#DAA520',
                                    borderRadius: '5px',
                                    color: 'black',
                                    marginRight: '200px',
                                }}
                            >
                                <AddIcon />
                            </IconButton>
                            <Pagination
                                count={totalPages}
                                page={page}
                                onChange={
                                    handleChangePage as (
                                        event: React.ChangeEvent<unknown>,
                                        page: number,
                                    ) => void
                                }
                                style={{
                                    marginTop: '0px',
                                    width: '100%',
                                    // marginRight: '10px',
                                }}
                            />
                            <FormControl
                                fullWidth
                                style={{
                                    borderRadius: '10px',
                                    borderColor: 'black',
                                    color: 'black',
                                    width: '100%',
                                    marginLeft: '0px',
                                }}
                            >
                                <InputLabel id='demo-simple-select-label'>
                                    Number of devices
                                </InputLabel>
                                <Select
                                    labelId='demo-simple-select-label'
                                    id='demo-simple-select'
                                    value={nr}
                                    label='Number of devices to display'
                                    onChange={handleChange}
                                    style={{
                                        borderRadius: '15px',
                                        borderColor: 'black',
                                        color: 'black',
                                    }}
                                >
                                    <MenuItem value={10}>10</MenuItem>
                                    <MenuItem value={20}>20</MenuItem>
                                    <MenuItem value={30}>30</MenuItem>
                                </Select>
                            </FormControl>
                        </div>
                        <div></div>
                        <DeviceList
                            list={deviceList}
                            onDeleteClickHandler={deleteDevice}
                            onEditClickHandler={editDeviceData}
                            numberOfItems={nr}
                        />
                    </>
                )}
                {shownPage === PageEnum.add && (
                    <AddDevice
                        onBackButtonHandle={showListPage}
                        onSaveButtonHandler={addDevice}
                    />
                )}
                {shownPage === PageEnum.edit && dataToEdit && (
                    <EditDevice
                        data={dataToEdit}
                        onBackButtonHandle={showListPage}
                        onSaveButtonHandler={updateData}
                    />
                )}
            </section>
        </div>
    );
}

export default Home;
