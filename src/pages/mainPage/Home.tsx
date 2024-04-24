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
import AddDevice from '../deviceEntity/Create';
import DeviceList from '../deviceEntity/DeviceList';
import EditDevice from '../deviceEntity/Update';

function Home() {
    const [deviceList, setDeviceList] = useState<IDevice[]>([]);
    const [shownPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IDevice);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [nr, setNr] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [ws, setWs] = useState<WebSocket | null>(null);
    const [serverError, setServerError] = useState(false);
    const [internetError, setInternetError] = useState(false);

    useEffect(() => {
        const socket = new WebSocket('ws://localhost:5000');
        setWs(socket);

        socket.onopen = () => {
            console.log('WebSocket connected');
            syncOfflineData();
            setInternetError(false);
        };

        socket.onerror = () => {
            console.error('WebSocket error');
            setInternetError(true);
        };

        socket.onmessage = (event) => {
            const newData = JSON.parse(event.data);
            setDeviceList((prevList) => [...prevList, newData]);
        };

        return () => {
            socket.close();
        };
    }, []);

    const showListPage = () => {
        setShowPage(PageEnum.list);
    };

    const onAddDeviceHandler = () => {
        setShowPage(PageEnum.add);
    };

    const saveDeviceToLocalStorage = (device: IDevice) => {
        const existingData = localStorage.getItem('offline_devices');
        const offlineDevices = existingData ? JSON.parse(existingData) : [];
        offlineDevices.push(device);
        localStorage.setItem('offline_devices', JSON.stringify(offlineDevices));
    };

    const addDevice = async (newItem: IDevice) => {
        console.log('Adding device...');
        const isOffline = serverError || internetError;
        if (isOffline) {
            saveDeviceToLocalStorage(newItem);
            console.log('Saved to LocalStorage due to offline status');
        } else {
            try {
                const response = await fetch('http://localhost:5000/crud', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(newItem),
                });

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                fetchList();
            } catch (error) {
                console.error('Error:', error);
                setServerError(true);
                saveDeviceToLocalStorage(newItem);
                console.log('Saved to LocalStorage due to server error');
            }
        }
    };

    const syncOfflineData = async () => {
        console.log('Syncing offline data...');
        const isConnected = !(serverError || internetError);

        if (isConnected) {
            const existingData = localStorage.getItem('offline_devices');
            if (existingData) {
                const offlineDevices = JSON.parse(existingData);

                try {
                    for (const device of offlineDevices) {
                        await addDevice(device);
                    }

                    localStorage.removeItem('offline_devices');
                    console.log('Offline data synchronized successfully.');
                } catch (error) {
                    console.error('Error syncing offline data:', error);
                }
            }
        }
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
                console.log(filteredData);
                setDeviceList(filteredData);
                setTotalPages(data.totalPages);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
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
                setServerError(false);
                fetchList();
            })
            .catch((error) => {
                console.error('Error:', error);
                setServerError(true);
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
                setServerError(false);
                fetchList();
            })
            .catch((error) => {
                console.error('Error:', error);
                setServerError(true);
            });
    };
    useEffect(() => {
        fetchList();
    }, [page, nr]);

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const handleChange = (event: SelectChangeEvent<number>) => {
        setNr(event.target.value as number);
    };

    const handleChangePage = (
        event: React.MouseEvent<HTMLButtonElement> | null,
        newPage: number,
    ) => {
        setPage(newPage);
    };

    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <TopBar />
            <SideBar
                isOpen={isSidebarOpen}
                handleToggle={handleSidebarToggle}
            />
            <section className='section-content'>
                {serverError && (
                    <div style={{color: 'red'}}>
                        Server Error. Please try again later.
                    </div>
                )}
                {internetError && (
                    <div style={{color: 'red'}}>
                        Internet Error. Please check your internet connection.
                    </div>
                )}
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
                                }}
                            />
                            <FormControl
                                fullWidth
                                style={{
                                    borderRadius: '10px',
                                    borderColor: 'black',
                                    color: 'black',
                                    width: '100%',
                                }}
                            >
                                <InputLabel>Number of devices</InputLabel>
                                <Select
                                    value={nr}
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
