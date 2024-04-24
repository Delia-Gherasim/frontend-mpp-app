import {useState} from 'react';
import {IClient} from '../../model/item.type';
import '../deviceEntity/Create.style.css';

type Props = {
    data: IClient | undefined;
    onBackButtonHandle: () => void;
    onSaveButtonHandler: (updatedClient: IClient) => void;
};

const EditClient: React.FC<Props> = ({
    data,
    onBackButtonHandle,
    onSaveButtonHandler,
}) => {
    if (!data) {
        return <div>Error: Client data is missing.</div>;
    }

    const [name, setName] = useState(data.name || '');
    const [surname, setSurname] = useState(data.surname || '');
    const [phone, setPhone] = useState(data.phone ? data.phone.toString() : '');
    const [email, setEmail] = useState(data.email || '');
    const [owedSum, setOwedSum] = useState(data.owedSum || 0);
    const [extras, setExtras] = useState(data.extras || '');

    const onSaveButtonClicked = (e: React.FormEvent) => {
        e.preventDefault();

        const updatedClient: IClient = {
            id: data.id,
            name,
            surname,
            phone,
            email,
            owedSum,
            extras,
        };

        onSaveButtonHandler(updatedClient);
        onBackButtonHandle();
    };

    return (
        <div className='container'>
            <h3 className='title'>Edit Client</h3>
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
export default EditClient;
