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
import React, {useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IDevice, PageEnum, dummyDeviceList} from '../../model/item.type';
import AddDevice from '../crud/Create';
import DeviceList from '../crud/DeviceList';
import EditDevice from '../crud/Update';

function Home() {
    const [deviceList, setDeviceList] = useState(dummyDeviceList as IDevice[]);
    const [shownPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IDevice);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [nr, setNr] = useState(10);
    const [page, setPage] = useState(1);

    const showListPage = () => {
        setShowPage(PageEnum.list);
    };

    const onAddDeviceHandler = () => {
        setShowPage(PageEnum.add);
    };

    const addDevice = (newItem: IDevice) => {
        setDeviceList([...deviceList, newItem]);
    };

    const deleteDevice = (data: IDevice) => {
        const indexToDelete = deviceList.indexOf(data);
        const tempList = [...deviceList];
        tempList.splice(indexToDelete, 1);
        setDeviceList(tempList);
    };

    const editDeviceData = (data: IDevice) => {
        setShowPage(PageEnum.edit);
        setDataToEdit(data);
    };

    const updateData = (data: IDevice) => {
        const filteredData = deviceList.filter((x) => x.id === data.id)[0];
        const indexOfData = deviceList.indexOf(filteredData);
        const tempData = [...deviceList];
        tempData[indexOfData] = data;
        setDeviceList(tempData);
    };

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

    const displayedDevices = deviceList.slice(
        (page - 1) * nr,
        (page - 1) * nr + nr,
    );

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
                                count={Math.ceil(deviceList.length / nr)}
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
                        <DeviceList
                            list={displayedDevices}
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
