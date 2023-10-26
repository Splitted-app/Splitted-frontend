import RegisterFormDataInterface from "./RegisterFormDataInterface";
import '../../css/RegisterPages/RegisterForm.css';

import { useNavigate } from 'react-router-dom'
import { useState } from 'react';
import { useSetRecoilState } from 'recoil';
import { UserTokenState } from '../../atoms/UserToken'
import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import FormError from "../Common/FormError";

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
        fetch('https://localhost:7012/api/users/login', {
            method: 'POST',
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
                // first log in
                setSignUpFollowUpVisibility(true);
            })
            .catch((err) => {

            });
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setFirstTry(false);
        console.log(data.password)
        if (!validateData(data))
            return;
        console.log(data)
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
                            console.log(firstTry);
                            !firstTry && validateData({ ...data, password: e.target.value });
                        }} />
                    <div className="form-error-container" style={{ display: `${errors.pwdNoLowerCase ? "block" : "none"}` }}>
                        {errors.pwdNoLowerCase && <FormError message="Use a lowercase letter" details=""></FormError>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoUpperCase ? "block" : "none"}` }}>
                        {errors.pwdNoUpperCase && <FormError message="Use an uppercase letter" details=""></FormError>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoDigit ? "block" : "none"}` }}>
                        {errors.pwdNoDigit && <FormError message="Use a digit" details=""></FormError>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdNoSpecialCharacter ? "block" : "none"}` }}>
                        {errors.pwdNoSpecialCharacter && <FormError message="Use a special character" details=""></FormError>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.pwdTooShort ? "block" : "none"}` }}>
                        {errors.pwdTooShort && <FormError message="Use at least 8 symbols" details=""></FormError>}
                    </div>
                    <input className={`form-element ${errors.nicknameTooShort ? "error-input" : ""}`}
                        type="text" name="nickname" placeholder='nickname'
                        value={data.nickname}
                        onChange={(e) => {
                            setData({ ...data, nickname: e.target.value })
                            !firstTry && validateData({ ...data, nickname: e.target.value });
                        }} />
                    <div className="form-error-container" style={{ display: `${errors.nicknameTooShort ? "block" : "none"}` }}>
                        {errors.nicknameTooShort && <FormError message="Use at least 3 symbols" details=""></FormError>}
                    </div>
                    <div className="form-error-container" style={{ display: `${errors.invalidRequestStatus === 409 ? "block" : "none"}` }}>
                        {errors.invalidRequestStatus && <FormError message="Username already taken" details=""></FormError>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Sign Up" />
                </div>
            </div>
        </form>
    )
}

export default SignUpForm;