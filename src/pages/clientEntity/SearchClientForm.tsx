import React, { useState } from 'react';
import '../deviceEntity/Create.style.css';

type Props = {
    onClientFound: (name: string, surname: string) => void; 
};

const SearchClientForm: React.FC<Props> = ({ onClientFound }) => {
    const [name, setName] = useState('');
    const [surname, setSurname] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [owedSum, setOwedSum] = useState(0);
    const [extras, setExtras] = useState('');

    const searchClient = async () => {
        try {
            const response = await fetch(
                `http://localhost:5000/client/getDataOfClient`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        name,
                        surname,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            if (data.items.length > 0) {
                const foundClient = data.items[0];

                setPhone(foundClient.phone);
                setEmail(foundClient.email);
                setOwedSum(foundClient.owedSum);
                setExtras(foundClient.extras);

                // Call the callback with the client name and surname
                onClientFound(foundClient.name, foundClient.surname);
            } else {
                alert(`No client found with name "${name}" and surname "${surname}".`);
            }
        } catch (error) {
            console.error('Error fetching client data:', error);
            alert('An error occurred while searching for the client.');
        }
    };

    const onSearchButtonClicked = (e: React.MouseEvent) => {
        e.preventDefault();

        if (!name || !surname) {
            alert('Please provide at least the name and surname to search.');
            return;
        }

        searchClient();
    };

    return (
        <div className='container'>
            <form className='form-container'>
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
                <div>
                    <button className='buttons'>
                        <input
                            type='button'
                            value='Search For Client'
                            onClick={onSearchButtonClicked}
                        />
                    </button>
                </div>
            </form>
        </div>
    );
};

export default SearchClientForm;
