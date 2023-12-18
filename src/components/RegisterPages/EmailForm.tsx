import '../../css/RegisterPages/RegisterForm.css';

import { useState } from "react";

import FormInfo from '../Common/FormInfo';

import RegisterFormDataInterface from "./RegisterFormDataInterface";



interface RegisterFormInterface {
    data: RegisterFormDataInterface,
    setData: Function,
    setState: Function
}

function EmailForm({ data, setData, setState }: RegisterFormInterface) {
    const [errors, setErrors] = useState({
        invalidEmail: false,
        invalidRequest: false
    })

    const [firstTry, setFirstTry] = useState<boolean>(true);

    function validateData(data: RegisterFormDataInterface) {
        // use `newErrors` to clear errors before validation
        // we cannot use `setErrors` because `errors` will not update until after
        // we finish executing handleSubmit
        let newErrors = {
            invalidEmail: false,
            invalidRequest: false
        }

        let dataIsValid: boolean = true;
        if (!data.email.includes('@')) {
            dataIsValid = false;
            newErrors.invalidEmail = true
        }

        setErrors(newErrors);

        return dataIsValid;
    }

    function handleSubmit(e: any) {
        e.preventDefault();

        setFirstTry(false);
        if (!validateData(data))
            return;
        fetch(process.env.REACT_APP_API_URL + '/api/users/email-check?email=' + data.email)
            .then(res => {
                if (!res.ok) {
                    setErrors({ ...errors, invalidRequest: true });
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then((data) => {
                if (data.userExists === true) {
                    setState("logIn")
                }
                else {
                    setState("signUp")
                }
            })
            .catch((err) => {

            });

    }

    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <div className="register-form">
                <div className="form-fields">
                    <input className={`form-element ${errors.invalidEmail ? "error-input" : ""}`}
                        type="text" name="email" placeholder='email'
                        value={data.email}
                        onChange={(e) => {
                            setData({ ...data, email: e.target.value });
                            !firstTry && validateData({ ...data, email: e.target.value });
                        }} data-testid="email-form-input-field" />
                    <div className="form-element">
                        {errors.invalidEmail && 
                            <FormInfo message="Invalid Email" details="" textColor="white"/>}
                    </div>
                    <div className="form-element">
                        {errors.invalidRequest && <FormInfo message="Unknown error" details="" textColor="white"/>}
                    </div>
                </div>
                <div className="form-button-container">
                    <input type='submit' className='register-button' value="Continue" data-testid="email-form-continue-button"/>
                </div>
            </div>
        </form>
    )
}

export default EmailForm;