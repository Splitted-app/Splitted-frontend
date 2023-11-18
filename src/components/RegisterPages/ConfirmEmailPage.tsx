import '../../css/RegisterPages/ConfirmEmailPage.css'

import { useEffect, useRef, useState } from 'react';

import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useRecoilValue } from 'recoil';

import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';
import { UserTokenState } from '../../atoms/UserToken';

import EmailConfirmationIcon from '../../assets/images/email_confirmed.png'
import EmailCheckLoadingIcon from '../../assets/images/email_check_loading.gif'

function ConfirmEmailPage() 
{
    const { search } = useLocation();
    const parameters = new URLSearchParams(search);
    const emailToken = parameters.get('token');
    const email = parameters.get('email')
    const fullLoginUpdater = useRecoilValue(FullLoginUpdaterState)
    const token = useRecoilValue(UserTokenState);

    const [emailConfirmed, setEmailConfirmed] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    const navigate = useNavigate();

    const emailConfirmedRef = useRef(false);
    useEffect(() => {
        if (emailConfirmedRef.current) 
            return;
        if (fullLoginUpdater === 0)
            return;
        const encodedEmailToken = encodeURIComponent(emailToken ? emailToken : "")
                                    .replace(/%../g,  match => match.toLowerCase())
        const query = `?token=${encodedEmailToken}&email=${email}`;
        axios.get(process.env.REACT_APP_API_URL + `/api/users/confirm-email${query}`, {
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },   
        })
        .then((res) => {
            emailConfirmedRef.current = true;
            setEmailConfirmed(true);
             setTimeout(() => {
                navigate("/");
              }, 5000);

        })
        .catch((error) => {
            setError(true);
        })
    }, [fullLoginUpdater])

    return (
        <div className="confirm-email-page">
            <div className = "confirm-email-panel">
                <div className = "title-container">
                    <div className='icon'>
                        {emailConfirmed && <img src={EmailConfirmationIcon}></img>}
                    </div>
                    <div className='subtitle'>
                        {!emailConfirmed && !error && "Please Wait"}
                        {emailConfirmed && "Your email has been cofirmed."}
                        {error && "Something Went Wrong"}
                    </div>
                </div>
                <div className='message-container'>
                    {emailConfirmed && "You will be redirected to start page shortly."}
                    <div className='email-waiting_icon'>
                        {emailConfirmed && <img src={EmailCheckLoadingIcon }></img>}
                    </div>
                </div>
                <div className='email-confirmation-panel-footer'>
                    Spend it, Track it, Splitted
                </div>
            </div>
        </div>
    )
}

export default ConfirmEmailPage;