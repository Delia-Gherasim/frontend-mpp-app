import {useState} from 'react';
import './Create.style.css';
import {IDevice} from './item.type';
type Props = {
    data: IDevice;
    onBackButtonHandle: () => void;
    onSaveButtonHandler: (newItem: IDevice) => void;
};

const EditDevice: React.FC<Props> = ({
    data,
    onBackButtonHandle,
    onSaveButtonHandler,
}) => {
    const [type, setType] = useState(data.type);
    const [brand, setBrand] = useState(data.brand);
    const [owner, setOwner] = useState(data.owner);
    const [accessories, setAccessories] = useState(data.accessories);
    const [warranty, setWarranty] = useState(data.warranty);
    const [date, setDate] = useState(
        data.date ? data.date.toISOString().split('T')[0] : '',
    );

    const onTypeChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setType(e.target.value);
    };
    const onBrandChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBrand(e.target.value);
    };
    const onOwnerChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwner(e.target.value);
    };
    const onAccessoryChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setAccessories(e.target.checked);
    };
    const onWarrantyChangeHandler = (
        e: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setWarranty(e.target.checked);
    };
    const onDateChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDate(e.target.value);
    };

    const onSaveButtonClicked = (e: any) => {
        e.preventDefault();
        const newItem: IDevice = {
            id: data.id,
            type: type,
            brand: brand,
            owner: owner,
            accessories: accessories,
            warranty: warranty,
            date: new Date(date),
        };
        onSaveButtonHandler(newItem);
    };

    return (
        <>
            <div className='container'>
                <h3 className='title'>Edit the Device</h3>
                <form className='form-container'>
                    <div>
                        <label>Type:</label>
                        <input
                            type='text'
                            value={type}
                            onChange={onTypeChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Brand:</label>
                        <input
                            type='text'
                            value={brand}
                            onChange={onBrandChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Owner:</label>
                        <input
                            type='text'
                            value={owner}
                            onChange={onOwnerChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Accessories:</label>
                        <input
                            type='checkbox'
                            checked={accessories}
                            onChange={onAccessoryChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Warranty:</label>
                        <input
                            type='checkbox'
                            checked={warranty}
                            onChange={onWarrantyChangeHandler}
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type='date'
                            data-date=''
                            data-date-format='DD MMMM YYYY'
                            onChange={onDateChangeHandler}
                        />
                    </div>
                    <div className='buttons'>
                        <input
                            type='button'
                            value='Back'
                            onClick={onBackButtonHandle}
                        />
                        <input
                            type='button'
                            value='Save'
                            onClick={onSaveButtonClicked}
                        />
                    </div>
                </form>
            </div>
        </>
    );
};

export default EditDevice;
