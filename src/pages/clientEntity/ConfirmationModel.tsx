import { IClient } from '../../model/item.type';
import '../deviceEntity/Model.style.css';

type Props = {
    onClose: () => void;
    data: IClient;
    handleConfirmation: (result: boolean) => void;
};

const ConfirmationModel = (props: Props) => {
    const {onClose, data, handleConfirmation} = props;
    const onConfirmationTrue = () => {
        handleConfirmation(true);
    };
    const onConfirmationFalse = () => {
        handleConfirmation(false);
    };
    return (
        <div id='myModal' className='modal'>
            <div className='modal-content'>
                <span className='close' onClick={onClose}>
                    &times;
                </span>
                <h3>
                    Are you sure you want to delete client number #{data.id}
                </h3>
                <div className='buttons'>
                    <input
                        type='button'
                        value='I am 100% sure'
                        onClick={() => onConfirmationTrue()}
                    />
                    <input
                        type='button'
                        value='I changed my mind'
                        onClick={() => onConfirmationFalse()}
                    />
                </div>
            </div>
        </div>
    );
};

export default ConfirmationModel;
