import '../../css/HomePage/SignUpFollowUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { UserTokenState } from '../../atoms/UserToken'
import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import CurrencyDropdown from "./CurrencyDropdown";
import { BudgetIdUpdaterState } from '../../atoms/BudgetIdUpdater';
import { CurrencyState } from '../../atoms/Currency';



interface FormDataInterface {
    bank: string | null,
    budgetType: string,
    currency: string,
    budgetBalance: number,
}

function SignUpFollowUp() {

    const [buttonText, setButtonText] = useState("Finish");
    const [filePath, setFilePath] = useState("no file chosen");
    const [errors, setErrors] = useState({});
    const navigate = useNavigate();
    const [data, setData] = useState<FormDataInterface>({
        bank: "Pekao",
        budgetType: "Personal",
        currency: "PLN",
        budgetBalance: 0,
    })
    const token = useRecoilValue(UserTokenState);
    const setSignUpFollowUpVisibility = useSetRecoilState(SignUpFollowUpVisibilityState);
    const setCurrency = useSetRecoilState(CurrencyState);
    const [updater, setUpdater] = useRecoilState(BudgetIdUpdaterState);

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(data);
        fetch(process.env.REACT_APP_API_URL + '/api/budgets', {
            method: 'POST',
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                bank: data.bank,
                budgetType: data.budgetType,
                currency: data.currency,
                budgetBalance: data.budgetBalance
            })
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                if (res.ok) {
                    setCurrency(data.currency);
                    setSignUpFollowUpVisibility(false);
                    setUpdater(!updater);
                    navigate('/home');
                }
                return res.json();
            })
            .catch((err) => {
                setErrors(err.message);
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
                            <select className='field-style' value="PKO BP" onChange={(e: any) => setData({ ...data, bank: e.target.value })}>
                                <option value="PKO BP">PKO BP</option>
                                <option value="Pekao">Pekao</option>
                                <option value="Santander Bank">Santander Bank</option>
                                <option value="ING Bank">ING Bank</option>
                                <option value="mBank">mBank</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                        <label>
                            Put your bank balance:
                        </label>
                        <div className='input-container'>
                            <input type="number" placeholder='0' className='field-style' onChange={(e: any) => setData({ ...data, budgetBalance: e.target.value })} step="any"></input>
                        </div>
                        {/* <label>
                        Choose your avatar:
                    </label>
                    <div className='avatar-input-container input-container'>
                        <div className='avatar-input-button'>
                            <input  type="file" className='file-input' id='avatar-input' style={{display: 'none'}} 
                            onChange={(e)=>{handleFileChange(e.target.value)}}></input>
                            <label htmlFor='avatar-input'>
                                <div>
                                    Choose File
                                </div>
                            </label>
                        </div>
                        <span>
                            {filePath}
                        </span>
                    </div> */}
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