import React, {useState} from 'react';
import {IClient} from '../../model/item.type';
import '../deviceEntity/Create.style.css';

type Props = {
    onBackButtonHandle: () => void;
    onSaveButtonHandler: (newClient: IClient) => void;
};

const AddClient: React.FC<Props> = ({
    onBackButtonHandle,
    onSaveButtonHandler,
}) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [owedSum, setOwedSum] = useState(0);
    const [extras, setExtras] = useState('');

    const onSaveButtonClicked = (e: React.FormEvent) => {
        e.preventDefault();
        if (!name || !surname || !phone || !email) {
            alert('Please fill in all required fields.');
            return;
        }

        const newClient: IClient = {
            id: new Date().getTime(), // Unique ID
            name,
            surname,
            phone,
            email,
            owedSum,
            extras,
        };

        onSaveButtonHandler(newClient);
        onBackButtonHandle();
    };

    return (
        <div className='container'>
            <h3 className='title'>Add New Client</h3>
            <form className='form-container' onSubmit={onSaveButtonClicked}>
                <div>
                    <label>Name:</label>
                    <input
                        type='text'
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                </div>
                <div>
                    <label>Surname:</label>
                    <input
                        type='text'
                        value={surname}
                        onChange={(e) => setSurname(e.target.value)}
                    />
                </div>
                <div>
                    <label>Phone:</label>
                    <input
                        type='text'
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                    />
                </div>
                <div>
                    <label>Email:</label>
                    <input
                        type='text'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label>Owed Sum:</label>
                    <input
                        type='number'
                        value={owedSum}
                        onChange={(e) => setOwedSum(parseFloat(e.target.value))}
                    />
                </div>
                <div>
                    <label>Extras:</label>
                    <input
                        type='text'
                        value={extras}
                        onChange={(e) => setExtras(e.target.value)}
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
    );
};

export default AddClient;
