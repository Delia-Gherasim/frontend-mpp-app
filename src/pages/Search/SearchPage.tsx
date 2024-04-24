import {Button} from '@mui/material';
import {useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IClient, IDevice} from '../../model/item.type';

const Search = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [formVisible, setFormVisible] = useState(true);
    const [tableVisible, setTableVisible] = useState(false);
    const [deviceList, setDeviceList] = useState<IDevice[]>([]);
    const [nr, setNr] = useState(10);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [owedSum, setOwedSum] = useState(0);
    const [extras, setExtras] = useState('');

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    const onSaveButtonClicked = async (e: React.FormEvent) => {
        e.preventDefault();
        setFormVisible(false);
        const newClient: IClient = {
            id: new Date().getTime(),
            name,
            surname,
            phone,
            email,
            owedSum,
            extras,
        };
        await getDevicesOfClient(newClient);
        setTableVisible(true);
    };

    const getDevicesOfClient = async (client: IClient) => {
        setNr(50);
        try {
            const response = await fetch(
                `http://localhost:5000/client/getDevicesOfClient`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name: client.name,
                        surname: client.surname,
                        phoneNumber: client.phone,
                        email: client.email,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            // console.log('Received data:', data);
            const filteredData = data.map((item: any) => ({
                id: item.id,
                category: item.category,
                type: item.type,
                brand: item.brand,
                owner: item.owner,
                accessories: item.accessories,
                warranty: item.warranty,
                date: new Date(item.date),
            }));
            setDeviceList(filteredData);
            // console.log('DUPA FETCH', deviceList);
            setDeviceList(filteredData);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={`container ${isSidebarOpen ? 'sidebar-open' : ''}`}>
            <TopBar />
            <SideBar
                isOpen={isSidebarOpen}
                handleToggle={handleSidebarToggle}
            />
            <section className='section-content-form'>
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <Button
                        onClick={() => {
                            setFormVisible(!formVisible);
                            setTableVisible(!tableVisible);
                        }}
                    >
                        <h2 style={{textAlign: 'center'}}>
                            Search for a client:
                        </h2>
                    </Button>
                    <form
                        className='form-container'
                        onSubmit={onSaveButtonClicked}
                        style={{
                            // visibility: formVisible
                            //     ? 'visible'
                            //     : 'collapse',
                            display: formVisible ? 'block' : 'none',
                        }}
                    >
                        <div>
                            <label>Name:</label>
                            <input
                                type='text'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Surname:</label>
                            <input
                                type='text'
                                value={surname}
                                onChange={(e) => setSurname(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Phone:</label>
                            <input
                                type='text'
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                            />
                        </div>
                        <div>
                            <label>Email:</label>
                            <input
                                type='text'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        <div className='buttons'>
                            <input type='submit' value='Save' />
                        </div>
                    </form>
                    <section
                        style={{
                            // visibility: tableVisible
                            //     ? 'visible'
                            //     : 'collapse',
                            display: tableVisible ? 'block' : 'none',
                        }}
                    >
                        {tableVisible && deviceList.length > 0 ? (
                            <table>
                                <thead>
                                    <tr>
                                        <th>Category</th>
                                        <th>Type</th>
                                        <th>Brand</th>
                                        <th>Owner</th>
                                        <th>Accessories</th>
                                        <th>Warranty</th>
                                        <th>Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {deviceList.map((device) => (
                                        <tr key={device.id}>
                                            <td>{device.category}</td>
                                            <td>{device.type}</td>
                                            <td>{device.brand}</td>
                                            <td>{device.owner}</td>
                                            <td>
                                                {device.accessories
                                                    ? 'Yes'
                                                    : 'No'}
                                            </td>
                                            <td>
                                                {device.warranty ? 'Yes' : 'No'}
                                            </td>
                                            <td>
                                                {device.date
                                                    ? new Date(
                                                          device.date,
                                                      ).toDateString()
                                                    : 'N/A'}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        ) : (
                            <p>No devices found for this client.</p>
                        )}
                    </section>
                </div>
            </section>
        </div>
    );
};

export default Search;
