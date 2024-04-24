import { IClient } from '../../model/item.type';
import '../deviceEntity/Model.style.css';
type Props = {
    onClose: () => void;
    data: IClient;
};
const ClientModel = (props: Props) => {
    const {onClose, data} = props;
    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h3>Viewing data for client number # {data.id}</h3>
                <div>
                    <label className='label'>
                        <b>Name:</b> {data.name}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Surname:</b> {data.surname}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Email:</b> {data.email}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Phone Number:</b> {data.phone}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Owed Sum:</b> {data.owedSum}
                    </label>
                </div>
                <div>
                    <label className='label'>
                        <b>Extra Details:</b> {data.extras}
                    </label>
                </div>
            </div>
        </div>
    );
};

export default ClientModel;
