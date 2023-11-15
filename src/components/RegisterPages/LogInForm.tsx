import '../../css/RegisterPages/RegisterForm.css';

import { useState } from "react";

import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import FormInfo from '../Common/FormInfo';

import RegisterFormDataInterface from "./RegisterFormDataInterface";

import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';
import { UserTokenState } from '../../atoms/UserToken';

interface RegisterFormInterface {
    data: RegisterFormDataInterface,
    setData: Function,
    setState: Function
}

function LogInForm({ data, setData, setState }: RegisterFormInterface) {
    const navigate = useNavigate();
    const setToken = useSetRecoilState(UserTokenState);
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
        fetch(process.env.REACT_APP_API_URL + '/api/users/login', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password
            })
        })
        .then(res => {
            if (!res.ok) {
                if (res.status === 401) {
                    newErrors.invalidPassword = true;
                }
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            setToken(data.token);
        })
        .then(() => {
            setUpdater(!updater);
        })
        .then(() => {
            navigate('/home');
        })
        .catch((err) => {
            setErrors(newErrors);
        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="register-form">
                <div className="form-fields">
                    <input className="form-element" type="email" name="email" value={data.email} disabled />
                    <input className="form-element"
                        type="password" name="password" placeholder='password'
                        value={data.password}
                        onChange={(e) => setData({ ...data, password: e.target.value })} />
                    <div className="form-element">
                        {errors.invalidPassword && 
                            <FormInfo 
                                message="Invalid Email or Password" 
                                details="" 
                                textColor="white"/>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Log In" />
                </div>
            </div>
        </form>
    )
}

export default LogInForm;