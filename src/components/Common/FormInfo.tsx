import '../../css/Common/FormError.css';
import errorIcon from '../../assets/images/error.png';
import { useState } from 'react';

interface FormInfoInterface
{
    message: string,
    details: string,
    textColor: string,
}

export function FormInfo({message, details, textColor} : FormInfoInterface)
{
    const [detailsDisplay, setDetailsDisplay] = useState("none")

    return (
        <div className='form-error' style={{color: textColor}}>
            <div className='icon-container'>
                <img src={errorIcon}></img>
            </div>
            {message}
        </div>
    )
}