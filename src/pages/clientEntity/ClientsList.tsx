import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import {useEffect, useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IClient, PageEnum} from '../../model/item.type';
import '../deviceEntity/DeviceList.style.css';
import ClientModel from './ClientModel';
import ConfirmationModel from './ConfirmationModel';
import AddClient from './Create';
import EditClient from './EditClient';

const ClientsList = () => {
    const [clientList, setClientList] = useState<IClient[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [shownPage, setShownPage] = useState(PageEnum.list); // Fixed 'setShowPage' to 'setShownPage'
    const [dataToEdit, setDataToEdit] = useState<IClient | null>(null);
    const [showModel, setShowModel] = useState(false);
    const [confirmationModel, setConfirmationModel] = useState(false);
    const [dataToShow, setDataToShow] = useState<IClient | null>(null);

    const fetchClients = async () => {
        try {
            const response = await fetch('http://localhost:5000/clients');
            if (!response.ok) {
                throw new Error('Failed to fetch clients');
            }
            const data = await response.json();
            const clientsArray = data.map((item: any) => ({
                id: item.id,
                name: item.name,
                surname: item.surname,
                phone: item.phone,
                email: item.email,
                owedSum: item.owedSum,
                extras: item.extras,
            }));
            setClientList(clientsArray);
        } catch (error) {
            console.error('Error fetching clients:', error);
            setServerError(true);
        }
    };

    useEffect(() => {
        fetchClients();
    }, []);

    const handleAddClient = () => {
        setShownPage(PageEnum.add);
    };

    const addClient = async (newClient: IClient) => {
        try {
            const response = await fetch('http://localhost:5000/clients', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newClient),
            });
            if (!response.ok) {
                throw new Error('Failed to add client');
            }
            setServerError(false);
            await fetchClients();
        } catch (error) {
            console.error('Error adding client:', error);
            setServerError(true);
        }
    };

    const deleteClient = async (client: IClient) => {
        try {
            const response = await fetch(
                `http://localhost:5000/clients/${client.id}`,
                {
                    method: 'DELETE',
                },
            );
            if (!response.ok) {
                throw new Error('Failed to delete client');
            }
            setServerError(false);
            await fetchClients();
        } catch (error) {
            console.error('Error deleting client:', error);
            setServerError(true);
        }
    };

    const editClientData = (client: IClient) => {
        setShownPage(PageEnum.edit);
        setDataToEdit(client);
    };

    const updateClient = async (client: IClient) => {
        try {
            const response = await fetch(
                `http://localhost:5000/clients/${client.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(client),
                },
            );
            if (!response.ok) {
                throw new Error('Failed to update client');
            }
            setServerError(false);
            await fetchClients();
        } catch (error) {
            console.error('Error updating client:', error);
            setServerError(true);
        }
    };

    const viewItem = (client: IClient) => {
        setShowModel(true);
        setDataToShow(client);
    };

    const openConfirmationHandler = (client: IClient) => {
        setConfirmationModel(true);
        setDataToShow(client);
    };

    const handleDeleteConfirmation = (result: boolean) => {
        if (result && dataToShow) {
            deleteClient(dataToShow);
        }
        setConfirmationModel(false);
    };

    const onCloseModel = () => {
        setShowModel(false);
        setConfirmationModel(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const showListPage = () => {
        setShownPage(PageEnum.list);
    };

    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <TopBar />
            <SideBar isOpen={isSidebarOpen} handleToggle={toggleSidebar} />
            <section className='section-content'>
                {serverError && (
                    <div style={{color: 'red'}}>
                        Server Error. Please try again later.
                    </div>
                )}

                {shownPage === PageEnum.list && !serverError && (
                    <>
                        <div
                            className='title-container'
                            style={{display: 'flex', alignItems: 'center'}}
                        >
                            <h3 className='title' style={{marginRight: '20px'}}>
                                Clients List
                            </h3>
                            <IconButton
                                onClick={handleAddClient}
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
                        </div>

                        <table>
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Surname</th>
                                    <th>Phone Number</th>
                                    <th>Email</th>
                                    <th>Owed Sum</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {clientList.map((client) => (
                                    <tr key={client.id}>
                                        <td>{client.name}</td>
                                        <td>{client.surname}</td>
                                        <td>{client.phone}</td>
                                        <td>{client.email}</td>
                                        <td>{client.owedSum}</td>
                                        <td>
                                            <div className='buttons'>
                                                <IconButton
                                                    onClick={() =>
                                                        viewItem(client)
                                                    }
                                                    style={{color: '#DAA520'}}
                                                >
                                                    <VisibilityIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        editClientData(client)
                                                    }
                                                    style={{color: '#DAA520'}}
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                                <IconButton
                                                    onClick={() =>
                                                        openConfirmationHandler(
                                                            client,
                                                        )
                                                    }
                                                    style={{color: '#DAA520'}}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </>
                )}

                {showModel && dataToShow && (
                    <ClientModel onClose={onCloseModel} data={dataToShow} />
                )}

                {confirmationModel && dataToShow && (
                    <ConfirmationModel
                        onClose={onCloseModel}
                        data={dataToShow}
                        handleConfirmation={handleDeleteConfirmation}
                    />
                )}

                {shownPage === PageEnum.add && (
                    <AddClient
                        onBackButtonHandle={showListPage}
                        onSaveButtonHandler={addClient}
                    />
                )}

                {shownPage === PageEnum.edit && dataToEdit && (
                    <EditClient
                        data={dataToEdit}
                        onBackButtonHandle={showListPage}
                        onSaveButtonHandler={updateClient}
                    />
                )}
            </section>
        </div>
    );
};

export default ClientsList;
