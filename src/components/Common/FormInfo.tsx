import '../../css/Common/FormError.css';

import { useState } from 'react';

import errorIcon from '../../assets/images/error.png';

interface FormInfoInterface
{
    message: string,
    details: string,
    textColor: string,
}

function FormInfo({message, details, textColor} : FormInfoInterface)
{
    const [detailsDisplay, setDetailsDisplay] = useState("none")

    return (
        <div className='form-error' style={{color: textColor}} data-testid="error-message">
            <div className='icon-container'>
                <img src={errorIcon}></img>
            </div>
            {message}
        </div>
    )
}

export default FormInfo;