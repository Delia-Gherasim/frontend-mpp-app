import {useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import AddDevice from '../crud/Create';
import DeviceList from '../crud/DeviceList';
import {dummyDeviceList, IDevice, PageEnum} from '../crud/item.type';
import EditDevice from '../crud/Update';

function Home() {
    const [deviceList, setDeviceList] = useState(dummyDeviceList as IDevice[]);
    const [shownPage, setShowPage] = useState(PageEnum.list);
    const [dataToEdit, setDataToEdit] = useState({} as IDevice);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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
                        <div className='title-container'>
                            <h3 className='title'> Device List:</h3>
                            <input
                                type='button'
                                value='Add New Device'
                                onClick={onAddDeviceHandler}
                                className='add-device-button'
                            />
                        </div>
                        <DeviceList
                            list={deviceList}
                            onDeleteClickHandler={deleteDevice}
                            onEditClickHandler={editDeviceData}
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
