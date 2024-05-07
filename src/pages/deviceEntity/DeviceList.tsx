import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import VisibilityIcon from '@mui/icons-material/Visibility';
import IconButton from '@mui/material/IconButton';
import { useState } from 'react';
import { IDevice } from '../../model/item.type';
import ConfirmationModel from './ConfirmationModel';
import './DeviceList.style.css';
import DeviceModel from './Model';


type Props = {
    list: IDevice[];
    onDeleteClickHandler: (data: IDevice) => void;
    onEditClickHandler: (data: IDevice) => void;
    numberOfItems: number;
};

const DeviceList = (props: Props) => {
    const {list, onDeleteClickHandler, onEditClickHandler, numberOfItems} =
        props;
    const [showModel, setShowModel] = useState(false);
    const [confirmationModel, setConfirmationModel] = useState(false);
    const [dataToShow, setDataToShow] = useState(null as IDevice | null);

    const viewItem = (data: IDevice) => {
        setShowModel(true);
        setDataToShow(data);
    };

    const openConfirmationHandler = (data: IDevice) => {
        setConfirmationModel(true);
        setDataToShow(data);
    };

    const handleDeleteConfirmation = (result: boolean) => {
        if (result) {
            if (dataToShow) {
                onDeleteClickHandler(dataToShow);
            }
        }
        setConfirmationModel(false);
    };

    const onCloseModel = () => {
        setShowModel(false);
        setConfirmationModel(false);
    };

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Category</th>
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Accessories</th>
                        <th>Warranty</th>
                        <th>Date</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.slice(0, numberOfItems).map((device) => (
                        <tr key={device.id}>
                            <td>{device.category}</td>
                            <td>{device.type}</td>
                            <td>{device.brand}</td>
                            <td>{device.accessories ? 'Yes' : 'No'}</td>
                            <td>{device.warranty ? 'Yes' : 'No'}</td>
                            <td>{device.date.toDateString()}</td>
                            <td>
                                <div className='buttons'>
                                    <IconButton
                                        onClick={() => viewItem(device)}
                                        style={{
                                            color: '#DAA520',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <VisibilityIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            onEditClickHandler(device)
                                        }
                                        style={{
                                            color: '#DAA520',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <EditIcon />
                                    </IconButton>
                                    <IconButton
                                        onClick={() =>
                                            openConfirmationHandler(device)
                                        }
                                        style={{
                                            color: '#DAA520',
                                            borderRadius: '5px',
                                        }}
                                    >
                                        <DeleteIcon />
                                    </IconButton>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {showModel && dataToShow !== null && (
                <DeviceModel onClose={onCloseModel} data={dataToShow} />
            )}
            {confirmationModel && dataToShow !== null && (
                <ConfirmationModel
                    onClose={onCloseModel}
                    data={dataToShow}
                    handleConfirmation={handleDeleteConfirmation}
                />
            )}
        </div>
    );
};

export default DeviceList;
