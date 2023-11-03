import { useState } from 'react';
import '../../css/Common/FormError.css';
import warning from '../../assets/images/warning.png'

interface FormErrorInterface
{
    message: string,
    details: string
}

function FormError({message, details} : FormErrorInterface)
{
    const [detailsDisplay, setDetailsDisplay] = useState("none")

    return (
        <div className='form-error'>
            <div className='icon-container'>
                <img src={warning}></img>
            </div>
            {message}
        </div>
    )
}

export default FormError