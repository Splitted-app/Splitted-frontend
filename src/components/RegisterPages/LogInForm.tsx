import '../../css/RegisterPages/RegisterForm.css';

import { useState } from "react";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import FormInfo from '../Common/FormInfo';

import RegisterFormDataInterface from "./RegisterFormDataInterface";

import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';


interface RegisterFormInterface {
    data: RegisterFormDataInterface,
    setData: Function,
    setState: Function
}

function LogInForm({ data, setData, setState }: RegisterFormInterface) {
    const navigate = useNavigate();
    const [updater, setUpdater] = useRecoilState(FullLoginUpdaterState);
    const [errors, setErrors] = useState({
        invalidPassword: false
    });


    function handleSubmit(e: any) {
        // use `newErrors` to clear errors before validation
        // we cannot use `setErrors` because `errors` will not update until after
        // we finish executing handleSubmit
        let newErrors = {
            invalidPassword: false
        }
        e.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + '/api/users/login', 
            JSON.stringify({
                email: data.email,
                password: data.password
            }),
            {
                withCredentials: true,
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json'
                },
            }
        )
        .then((res) => {
            localStorage.setItem("token", res.data.token);
            setUpdater(updater + 1);
            navigate('/home');
        })
        .catch((error) => {
            if (error.response.status === 401) {
                newErrors.invalidPassword = true;
            }
            console.error(error);
            setErrors(newErrors);
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="register-form">
                <div className="form-fields">
                    <input className="form-element" type="email" name="email" value={data.email} disabled  data-testid="log-in-form-email-input"/>
                    <input className="form-element"
                        type="password" name="password" placeholder='password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })} data-testid="log-in-form-password-input"/>
                    <div className="form-element">
                        {errors.invalidPassword && 
                            <FormInfo 
                                message="Invalid Email or Password" 
                                details="" 
                                textColor="white"/>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Log In" data-testid="log-in-form-log-in-button"/>
                </div>
            </div>
        </form>
    )
}

export default LogInForm;