import '../../css/Common/FamilyModeFollowUp.css';

import { useState } from "react";
import { BankNames } from "../../enums";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserTokenState } from "../../atoms/UserToken";
import { FamilyModeFollowUpVisibilityState } from "../../atoms/FamilyModeFollowUp";
import axios from "axios";
import { FamilyMemberIdState } from "../../atoms/FamilyMemberId";
import CurrencyDropdown from "../HomePage/CurrencyDropdown";


interface FormDataInterface {
    bank: string | null,
    currency: string,
    budgetName: string,
}


function FamilyModeFollowUp()
{
    const [data, setData] = useState<FormDataInterface>({
        bank: BankNames.Pko,
        currency: "PLN",
        budgetName: ""
    })
    const [familyMemberId, setFamilyMemberId] = useRecoilState(FamilyMemberIdState)
    const token = useRecoilValue(UserTokenState);
    const setFamilyModeFollowUpVisibility = useSetRecoilState(FamilyModeFollowUpVisibilityState);

    function handleSubmit(event: any) {
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + `/api/modes/family-mode/${familyMemberId}`,
        JSON.stringify({
            bank: data.bank,
            currency: data.currency,
            name: data.budgetName,
        }),
        {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then(res => {
            setFamilyModeFollowUpVisibility(false);
            setFamilyMemberId("");
        })
        .catch(error => {
            console.error(error);
        })
    }

    return (
        <div className="family-mode-followup">
            <div className='title'>
            <div className='main-title'>
                Before you begin
            </div>
            <div className='subtitle'>
                Name your new joint account and choose default currency and bank          
            </div>
            </div>
            <div className='family-mode-followup-form'>
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
                                Choose your currency:
                            </label>
                            <div className="input-container">
                                <CurrencyDropdown currency={data.currency}
                                    setCurrency={(e: any) => setData({ ...data, currency: e.target.value })} />
                            </div>
                            <label>
                                Budget name:
                            </label>
                            <div className="input-container">
                                <input type="text" placeholder='Budget name' className='budget-input' 
                                    onChange={(e: any) => setData({ ...data, budgetName: e.target.value })}/>
                            </div>
                        </div>
                    </div>
                    <div className='button-container'>
                        <input type="submit" value="Finish" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FamilyModeFollowUp;