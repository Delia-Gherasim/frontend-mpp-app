import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material';
import React, {useState} from 'react';
import SideBar from '../../component/SideBar';
import TopBar from '../../component/TopBar';
import {IDevice} from '../../model/item.type';

type Props = {
    list: IDevice[];
};

const Sort = (props: Props) => {
    const [field, setField] = React.useState<keyof IDevice | ''>('');

    const handleChange = (event: SelectChangeEvent<string>) => {
        setField(event.target.value as keyof IDevice);
    };

    const {list} = props;

    const sortedList = React.useMemo(() => {
        if (field === 'date') {
            return [...list].sort((a, b) => {
                const valueA =
                    a[field] instanceof Date ? a[field] : new Date(a[field]);
                const valueB =
                    b[field] instanceof Date ? b[field] : new Date(b[field]);
                return valueA.getTime() - valueB.getTime();
            });
        } else if (Array.isArray(list) && field) {
            return [...list].sort((a, b) => {
                const valueA = (a[field] ?? '').toString().toLowerCase();
                const valueB = (b[field] ?? '').toString().toLowerCase();
                return valueA.localeCompare(valueB);
            });
        }
        return list;
    }, [field, list]);

    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
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
                            <MenuItem value={'type'}>Type</MenuItem>
                            <MenuItem value={'brand'}>Brand</MenuItem>
                            <MenuItem value={'owner'}>Owner</MenuItem>
                            <MenuItem value={'date'}>Date</MenuItem>
                        </Select>
                    </FormControl>
                    <table>
                        <thead>
                            <tr>
                                <th>Type</th>
                                <th>Brand</th>
                                <th>Owner</th>
                                <th>Accessories</th>
                                <th>Warranty</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sortedList.map((device) => (
                                <tr key={device.id}>
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
