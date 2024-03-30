import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import {useEffect, useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IDevice} from '../../model/item.type';

const Sort = () => {
    const [deviceList, setDeviceList] = useState<IDevice[]>([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [field, setField] = useState<keyof IDevice | ''>('');

    useEffect(() => {
        fetchData();
    }, [field]);

    const fetchData = () => {
        if (!field) return;
        const endpointMap: Record<keyof IDevice, string> = {
            category: 'category',
            type: 'type',
            brand: 'brand',
            owner: 'owner',
            date: 'date',
            id: '',
            accessories: '',
            warranty: '',
        };

        fetch(`http://localhost:5000/sort/${endpointMap[field]}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                const devicesArray: IDevice[] = data.map((item: any) => ({
                    id: item.id,
                    category: item.category,
                    type: item.type,
                    brand: item.brand,
                    owner: item.owner,
                    accessories: item.accessories,
                    warranty: item.warranty,
                    date: new Date(item.date),
                }));
                setDeviceList(devicesArray);
            })
            .catch((error) => {
                console.error('Error fetching data:', error);
            });
    };

    const handleChange = (event: SelectChangeEvent<string>) => {
        setField(event.target.value as keyof IDevice);
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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <h2 style={{textAlign: 'center'}}>Sorted Items</h2>
                    <FormControl
                        fullWidth
                        style={{
                            borderRadius: '10px',
                            borderColor: 'black',
                            color: 'black',
                        }}
                    >
                        <InputLabel id='demo-simple-select-label'>
                            Field to sort by
                        </InputLabel>
                        <Select
                            labelId='demo-simple-select-label'
                            id='demo-simple-select'
                            value={field}
                            label='Sort By: '
                            onChange={handleChange}
                            style={{
                                borderRadius: '15px',
                                borderColor: 'black',
                                color: 'black',
                                width: '200px',
                            }}
                        >
                            <MenuItem value={'category'}>Category</MenuItem>
                            <MenuItem value={'type'}>Type</MenuItem>
                            <MenuItem value={'brand'}>Brand</MenuItem>
                            <MenuItem value={'owner'}>Owner</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                        </Select>
                    </FormControl>
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
                                    <td>{device.accessories ? 'Yes' : 'No'}</td>
                                    <td>{device.warranty ? 'Yes' : 'No'}</td>
                                    <td>
                                        {device.date
                                            ? device.date.toDateString()
                                            : ''}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
};

export default Sort;
