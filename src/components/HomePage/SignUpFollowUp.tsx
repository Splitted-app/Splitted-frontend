import '../../css/HomePage/SignUpFollowUp.css';

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CurrencyDropdown from "./CurrencyDropdown";

import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';

import { BankNames } from '../../enums'
import api from '../../services/api';


interface FormDataInterface {
    bank: string | null,
    name: string,
    currency: string,
    budgetBalance: number,
}

function SignUpFollowUp() {

    const [buttonText, setButtonText] = useState("Finish");
    const [filePath, setFilePath] = useState("no file chosen");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState<FormDataInterface>({
        bank: BankNames.Pko,
        name: "Personal Budget",
        currency: "PLN",
        budgetBalance: 0,
    })
    const setSignUpFollowUpVisibility = useSetRecoilState(SignUpFollowUpVisibilityState);
    const [updater, setUpdater] = useRecoilState(FullLoginUpdaterState);

    function handleSubmit(event: any) {
        event.preventDefault();
        api.post('/api/budgets',
            JSON.stringify({
                bank: data.bank,
                name: data.name,
                currency: data.currency,
                budgetBalance: data.budgetBalance
            })
        )
        .then(() => {
            setUpdater(updater + 1);
        })
        .then(() => {
            setSignUpFollowUpVisibility(false);
            // navigate('/home');
        })
        .catch((error) => {
            console.error(error);
            setErrors(error.message);
        });
    }

    function handleFileChange(path: string) {
        let pathElements = path.split('\\')
        let newPath = pathElements[pathElements.length - 1]
        newPath = newPath === "" ? "no file chosen" : newPath
        setFilePath(newPath);
    }

    function validateFormData(data: FormDataInterface) {
        return true
    }

    return (
        <div className="signup-followup">
            <div className='title'>
                Before you begin
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className='form-elements'>
                    <div className='information-fields'>
                        <label>
                            Pick your bank:
                        </label>
                        <div className='input-container'>
                            <select className='field-style' onChange={(e: any) => setData({ ...data, bank: e.target.value })}>
                                <option value={BankNames.Pko}>PKO BP</option>
                                <option value={BankNames.Pekao}>Pekao</option>
                                <option value={BankNames.Santander}>Santander Bank</option>
                                <option value={BankNames.Ing}>ING Bank</option>
                                <option value={BankNames.Mbank}>mBank</option>
                                <option value={BankNames.Other}>Other</option>
                            </select>
                        </div>
                        <label>
                            Put your bank balance:
                        </label>
                        <div className='input-container'>
                            <input type="number" placeholder='0' className='field-style' onChange={(e: any) => setData({ ...data, budgetBalance: e.target.value })} step="any"></input>
                        </div>
                        <label>
                            Choose your currency:
                        </label>
                        <div className="input-container">
                            <CurrencyDropdown currency={data.currency}
                                setCurrency={(e: any) => setData({ ...data, currency: e.target.value })} />
                        </div>
                    </div>
                    <div className='button-container'>
                        <input type="submit" value={buttonText} />
                    </div>
                </div>
            </form>

        </div>
    );
}

export default SignUpFollowUp;