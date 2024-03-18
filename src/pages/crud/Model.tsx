import {IDevice} from './item.type';
import './Model.style.css';
type Props = {
    onClose: () => void;
    data: IDevice;
};
const DeviceModel = (props: Props) => {
    const {onClose, data} = props;
    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h3>Viewing Device data for device number # {data.id}</h3>
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
                        <b>Owner:</b> {data.owner}
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
