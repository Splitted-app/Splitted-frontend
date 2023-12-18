import '../../css/RegisterPages/RegisterForm.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom'
import { useSetRecoilState } from 'recoil';

import FormInfo from '../Common/FormInfo';

import RegisterFormDataInterface from "./RegisterFormDataInterface";

import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import { UserTokenState } from '../../atoms/UserToken'


interface RegisterFormInterface {
    data: RegisterFormDataInterface,
    setData: Function,
    setState: Function
}

function SignUpForm({ data, setData, setState }: RegisterFormInterface) {
    const lowerCaseRegex = new RegExp("[a-z]")
    const upperCaseRegex = new RegExp("[A-Z]")
    const digitRegex = new RegExp("[0-9]")
    const specialCharacterRegex = new RegExp(/[\`!@#$%^&*()_+=\[\]{};\':"\\|./<>\/?~\-]/g)

    const [errors, setErrors] = useState({
        invalidRequestStatus: 0,
        pwdNoLowerCase: false,
        pwdNoUpperCase: false,
        pwdNoDigit: false,
        pwdNoSpecialCharacter: false,
        pwdTooShort: false,
        nicknameTooShort: false
    });
    const [invalidPassword, setInvalidPassword] = useState<boolean>(false);

    const setToken = useSetRecoilState(UserTokenState);
    const setSignUpFollowUpVisibility = useSetRecoilState(SignUpFollowUpVisibilityState);
    const navigate = useNavigate();
    const [firstTry, setFirstTry] = useState<boolean>(true);

    function validateData(data: RegisterFormDataInterface) {
        let dataIsValid: boolean = true;

        // use `newErrors` to clear errors before validation
        // we cannot use `setErrors` because `errors` will not update until after
        // we finish executing handleSubmit
        let newErrors = {
            invalidRequestStatus: 0,
            pwdNoLowerCase: false,
            pwdNoUpperCase: false,
            pwdNoDigit: false,
            pwdNoSpecialCharacter: false,
            pwdTooShort: false,
            nicknameTooShort: false,
        }

        const password = data.password;
        if (!lowerCaseRegex.test(password)) {
            dataIsValid = false;
            newErrors.pwdNoLowerCase = true;
        }
        if (!upperCaseRegex.test(password)) {
            dataIsValid = false;
            newErrors.pwdNoUpperCase = true;
        }
        if (!digitRegex.test(password)) {
            dataIsValid = false;
            newErrors.pwdNoDigit = true;
        }
        if (!specialCharacterRegex.test(password)) {
            dataIsValid = false;
            newErrors.pwdNoSpecialCharacter = true;
        }
        if (password.length < 8) {
            dataIsValid = false;
            newErrors.pwdTooShort = true;
        }
        if (data.nickname.length < 3) {
            dataIsValid = false;
            newErrors.nicknameTooShort = true;
        }

        setInvalidPassword(newErrors.pwdNoLowerCase
            || newErrors.pwdNoUpperCase || newErrors.pwdNoDigit
            || newErrors.pwdNoSpecialCharacter || newErrors.pwdTooShort)
        setErrors(newErrors);

        return dataIsValid;
    }

    function loginAfterSignUp() {
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
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then((data) => {
            setToken(data.token);
            setSignUpFollowUpVisibility(true);
        })
        .catch((err) => {

        });
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setFirstTry(false);
        if (!validateData(data))
            return;
        fetch(process.env.REACT_APP_API_URL + '/api/users/register', {
            method: 'POST',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.email,
                password: data.password,
                username: data.nickname
            })
        })
        .then(res => {
            if (!res.ok) {
                if (res.status === 409) {
                    setErrors({ ...errors, invalidRequestStatus: 409 });
                }
                throw Error('could not fetch the data for that resource');
            }
            if (res.ok) {
                loginAfterSignUp();
                navigate('/home');
            }
            return res.json();
        })
        .catch((err) => {

        });
    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="register-form">
                <div className="form-fields">
                    <input className="form-element" type="email" name="email" value={data.email} disabled />
                    <input className={`form-element ${invalidPassword ? "error-input" : ""}`}
                        type="password" name="password" placeholder='password'
                        value={data.password}
                        onChange={(e) => {
                            setData({ ...data, password: e.target.value });
                            !firstTry && validateData({ ...data, password: e.target.value });
                        }} data-testid="sign-up-form-password-input"/>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoLowerCase ? "block" : "none"}` }}>
                        {errors.pwdNoLowerCase && 
                            <FormInfo message="Use a lowercase letter" details="" textColor="white"/>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoUpperCase ? "block" : "none"}` }}>
                        {errors.pwdNoUpperCase && 
                            <FormInfo message="Use an uppercase letter" details="" textColor="white"/>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoDigit ? "block" : "none"}` }}>
                        {errors.pwdNoDigit && 
                            <FormInfo message="Use a digit" details="" textColor="white"/>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoSpecialCharacter ? "block" : "none"}` }}>
                        {errors.pwdNoSpecialCharacter && 
                            <FormInfo message="Use a special character" details="" textColor="white"/>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdTooShort ? "block" : "none"}` }}>
                        {errors.pwdTooShort && 
                            <FormInfo message="Use at least 8 symbols" details="" textColor="white"/>}
                    </div>
                    <input className={`form-element ${errors.nicknameTooShort ? "error-input" : ""}`}
                        type="text" name="nickname" placeholder='nickname'
                        value={data.nickname}
                        onChange={(e) => {
                            setData({ ...data, nickname: e.target.value })
                            !firstTry && validateData({ ...data, nickname: e.target.value });
                        }} data-testid="sign-up-form-username-input"/>
                    <div className="form-error-container" style={{ display: `${errors.nicknameTooShort ? "block" : "none"}` }}>
                        {errors.nicknameTooShort && 
                            <FormInfo message="Use at least 3 symbols" details="" textColor="white"/>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.invalidRequestStatus === 409 ? "block" : "none"}` }}>
                        {errors.invalidRequestStatus && 
                            <FormInfo message="Username already taken" details="" textColor="white"/>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Sign Up" data-testid="sign-up-form-sign-up-button"/>
                </div>
            </div>
        </form>
    )
}

export default SignUpForm;