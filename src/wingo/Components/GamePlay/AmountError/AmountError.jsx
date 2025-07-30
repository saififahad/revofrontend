import React, { useEffect } from 'react'
import '../../../styles/main.css'
import exclamation from '../../../../assets/wingo/images/exclamation.png'

const AmountError = ({ isOpen, onClose }) => {

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                onClose();
            }, 500);

            return () => clearTimeout(timer);
        }
    }, [isOpen, onClose]);

    if (!isOpen) {
        return null;
    }
    return (
        <div className='error_modal-overlay'>
            <div className="error_modal-content">
                <img src={exclamation} alt="!" className='exclamation'/>
                <p className='error_desc'>Error <br /> Insufficient <br />    Balance</p>
            </div>

        </div>
    )
}

export default AmountError
