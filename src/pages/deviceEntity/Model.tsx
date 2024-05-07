import { useEffect, useState } from 'react';
import { IClient, IDevice } from '../../model/item.type';
import './Model.style.css';

type Props = {
    onClose: () => void;
    data: IDevice;
};

const DeviceModel = ({ onClose, data }: Props) => {
    const [clientData, setClientData] = useState<IClient | null>(null);

    const getClientDataOfDevice = async (device: IDevice) => {
        try {
            const response = await fetch(
                `http://localhost:5000/crud/getOwnerOfDevice`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        deviceId: device.id,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();
            const client = data[0]; 

            if (client) {
                const clientData = {
                    id: client.id,
                    name: client.name,
                    surname: client.surname,
                    phone: client.phone,
                    email: client.email,
                    owedSum: client.owedSum,
                    extras: client.extras,
                };
                setClientData(clientData); 
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
        }
    };

    useEffect(() => {
        getClientDataOfDevice(data); 
    }, [data]); 

    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h3>Viewing Device data for device number # {data.id}</h3>
                <div>
                    <label className='label'>
                        <b>Category:</b> {data.category}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Type:</b> {data.type}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Brand:</b> {data.brand}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Owner:</b> {clientData ? `${clientData.name} ${clientData.surname}` : 'Loading...'}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Accessories:</b> {data.accessories ? 'Yes' : 'No'}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Warranty:</b> {data.warranty ? 'Yes' : 'No'}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Date:</b> {data.date.toString()}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default DeviceModel;
