import {useState} from 'react';
import ConfirmationModel from './ConfirmationModel';
import './DeviceList.style.css';
import DeviceModel from './Model';
import {IDevice} from './item.type';

type Props = {
    list: IDevice[];
    onDeleteClickHandler: (data: IDevice) => void;
    onEditClickHandler: (data: IDevice) => void;
};

const DeviceList = (props: Props) => {
    const {list, onDeleteClickHandler, onEditClickHandler} = props;
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
                        <th>Type</th>
                        <th>Brand</th>
                        <th>Owner</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {list.map((device) => (
                        <tr key={device.id}>
                            <td>{device.type}</td>
                            <td>{device.brand}</td>
                            <td>{device.owner}</td>
                            <td>
                                <div className='buttons'>
                                    <input
                                        type='button'
                                        value='View'
                                        onClick={() => viewItem(device)}
                                    />
                                    <input
                                        type='button'
                                        value='Edit'
                                        onClick={() =>
                                            onEditClickHandler(device)
                                        }
                                    />
                                    <input
                                        type='button'
                                        value='Delete'
                                        onClick={() =>
                                            openConfirmationHandler(device)
                                        }
                                    />
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
