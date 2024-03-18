import {useState} from 'react';
import './login.css';

const accounts = [
    {name: 'Rosa', password: '1111', type: 'manager', id: 1},
    {name: 'Mirela', password: '1112', type: 'receptionist', id: 2},
    {name: 'Marian', password: '3242', type: 'owner', id: 3},
];

function SelectAccounts() {
    const [selectedItem, setSelectedItem] = useState<number | null>(null);
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState<string | null>(null);

    const handleSelect = () => {
        if (selectedItem !== null) {
            const item = accounts.find(
                (account) => account.id === selectedItem,
            );
            if (item?.password === password) {
                setMessage('Password is correct!');
            } else {
                setMessage('Password is incorrect!');
            }
        }
    };

    const AddAccount = () => {
        const [list, setList] = useState(accounts);
        const [name, setName] = useState('');
        const [newPassword, setNewPassword] = useState('');
        const [type, setType] = useState('');
        <form>
            <label>Name: </label>
            <input
                type='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <label>Password: </label>
            <input
                type='password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <label>Type: </label>
            <input
                type='type'
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
        </form>;

        //const newList = list.concat({name:{name}, password:{newPassword}, type:{type}, id:});
        // setList(newList);
    };
    const deleteAccount = () => {};
    const editAccount = () => {};

    return (
        <div className='mainPage'>
            <h2 className='formName'>Please sign into an account </h2>
            <div className='accounts'>
                <ul className='list'>
                    {accounts.map((account) => (
                        <li
                            key={account.id}
                            onClick={() => setSelectedItem(account.id)}
                            className={
                                selectedItem === account.id
                                    ? 'selected'
                                    : 'notSelected'
                            }
                        >
                            <div className='itemText'>
                                <h3 className='accountName'>{account.name}</h3>
                                <p className='accountType'>{account.type}</p>
                            </div>
                            <div className='buttons'>
                                <button
                                    className='deleteButton'
                                    onClick={deleteAccount}
                                >
                                    Delete
                                </button>
                                <button
                                    className='editButton'
                                    onClick={editAccount}
                                >
                                    Edit
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
            {selectedItem !== null && (
                <div className='passwordForm'>
                    <label>Password: </label>
                    <input
                        type='password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <button className='LogInButton' onClick={handleSelect}>
                        Log in
                    </button>
                </div>
            )}
            {message && <div className='message'>{message}</div>}
            <div className='crudAccount'>
                <button className='AddAccount' onClick={AddAccount}>
                    Add another Account
                </button>
            </div>
        </div>
    );
}

export default SelectAccounts;
