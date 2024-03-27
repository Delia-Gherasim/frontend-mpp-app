import React, {useState} from 'react';
import {IDevice} from '../../model/item.type';
import './Create.style.css';

type Props = {
    onBackButtonHandle: () => void;
    onSaveButtonHandler: (newItem: IDevice) => void;
};

const AddDevice: React.FC<Props> = ({
    onBackButtonHandle,
    onSaveButtonHandler,
}) => {
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [owner, setOwner] = useState('');
    const [accessories, setAccessories] = useState(false);
    const [warranty, setWarranty] = useState(false);
    const [date, setDate] = useState('');

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
        if (!type || !brand || !owner || !date) {
            alert('Please fill in all required fields.');
            return;
        }
        const newItem: IDevice = {
            id: new Date().toJSON().toString(),
            type: type,
            brand: brand,
            owner: owner,
            accessories: accessories,
            warranty: warranty,
            date: new Date(date),
        };
        onSaveButtonHandler(newItem);
        onBackButtonHandle();
    };

    return (
        <>
            <div className='container'>
                <h3 className='title'>Add New Device</h3>
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

export default AddDevice;
