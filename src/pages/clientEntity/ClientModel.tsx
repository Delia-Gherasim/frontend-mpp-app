import {useEffect, useState} from 'react';
import {IClient, IDevice} from '../../model/item.type';
import '../deviceEntity/Model.style.css';

type Props = {
    onClose: () => void;
    data: IClient;
};

const ClientModel: React.FC<Props> = ({onClose, data}) => {
    const [deviceList, setDeviceList] = useState<IDevice[]>([]);

    const getDevicesOfClient = async (client: IClient) => {
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
            const filteredData = data.map((item: any) => ({
                id: item.id,
                category: item.category,
                type: item.type,
                brand: item.brand,
                owner: item.owner,
                accessories: item.accessories ? 'Yes' : 'No',
                warranty: item.warranty ? 'Yes' : 'No',
                date: new Date(item.date),
            }));
            setDeviceList(filteredData);
        } catch (error) {
            console.error('Error fetching devices:', error);
        }
    };

    useEffect(() => {
        getDevicesOfClient(data);
    }, [data]);

    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h3>Viewing data for client number # {data.id}</h3>
                <div>
                    <label className='label'>
                        <b>Name:</b> {data.name}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Surname:</b> {data.surname}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Email:</b> {data.email}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Phone Number:</b> {data.phone}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Owed Sum:</b> {data.owedSum}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Extra Details:</b> {data.extras}
                    </label>
                </div>

                {deviceList.length > 0 && (
                    <>
                        <h3>Devices Owned by Client</h3>
                        {deviceList.map((device) => (
                            <div key={device.id}>
                                <div>
                                    <label className='label'>
                                        <b>Device #{device.id}</b>
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Category:</b> {device.category}
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Type:</b> {device.type}
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Brand:</b> {device.brand}
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Accessories:</b> {device.accessories}
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Warranty:</b> {device.warranty}
                                    </label>
                                </div>
                                <div>
                                    <label className='label'>
                                        <b>Date:</b>{' '}
                                        {device.date.toDateString()}
                                    </label>
                                </div>
                                <hr></hr>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
};

export default ClientModel;
