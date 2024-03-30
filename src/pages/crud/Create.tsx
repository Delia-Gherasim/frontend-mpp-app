import React, { useState } from 'react';
import { IDevice } from '../../model/item.type';
import './Create.style.css';

type Props = {
    onBackButtonHandle: () => void;
    onSaveButtonHandler: (newItem: IDevice) => void;
};

const AddDevice: React.FC<Props> = ({
    onBackButtonHandle,
    onSaveButtonHandler,
}) => {
    const [category, setCategory] = useState('');
    const [type, setType] = useState('');
    const [brand, setBrand] = useState('');
    const [owner, setOwner] = useState('');
    const [accessories, setAccessories] = useState(false);
    const [warranty, setWarranty] = useState(false);
    const [date, setDate] = useState('');

    const onSaveButtonClicked = (e: React.FormEvent) => {
        e.preventDefault();
        if (!type || !brand || !owner || !date || !category) {
            alert('Please fill in all required fields.');
            return;
        }
        const newItem: IDevice = {
            id: new Date().getDate(),
            category: category,
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
                <form className='form-container' onSubmit={onSaveButtonClicked}>
                    <div>
                        <label>Category:</label>
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                        >
                            <option value=''>Select Category</option>
                            <option value='Electronics'>Electronics</option>
                            <option value='Appliances'>Appliances</option>
                            <option value='Equipment'>Equipment</option>
                        </select>
                    </div>
                    <div>
                        <label>Type:</label>
                        {/* <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        >
                            <option value=''>Select Type</option>
                            {category && <Types category={category} />}
                        </select> */}
                        <input
                            type='text'
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Brand:</label>
                        {/* <select
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        >
                            <option value=''>Select Brand</option>
                            {category && <Brands category={category} />}
                        </select> */}
                        <input
                            type='text'
                            value={brand}
                            onChange={(e) => setBrand(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Owner:</label>
                        <input
                            type='text'
                            value={owner}
                            onChange={(e) => setOwner(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Accessories:</label>
                        <input
                            type='checkbox'
                            checked={accessories}
                            onChange={(e) => setAccessories(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label>Warranty:</label>
                        <input
                            type='checkbox'
                            checked={warranty}
                            onChange={(e) => setWarranty(e.target.checked)}
                        />
                    </div>
                    <div>
                        <label>Date:</label>
                        <input
                            type='date'
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                        />
                    </div>
                    <div className='buttons'>
                        <input
                            type='button'
                            value='Back'
                            onClick={onBackButtonHandle}
                        />
                        <input type='submit' value='Save' />
                    </div>
                </form>
            </div>
        </>
    );
};

export default AddDevice;
