import '../../css/Common/FamilyModeFollowUp.css';

import { useState } from "react";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import CurrencyDropdown from "../HomePage/CurrencyDropdown";
import FormInfo from './FormInfo';

import { FamilyModeFollowUpVisibilityState } from "../../atoms/FamilyModeFollowUp";
import { UserBudgetsUpdaterState } from '../../atoms/UserBudgetsUpdater';
import { FamilyMemberIdState } from "../../atoms/FamilyMemberId";
import { MyBudgetUpdaterState } from '../../atoms/MyBudgetUpdater';

import { BankNames } from "../../enums";
import api from '../../services/api';



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
    const [errors, setErrors] = useState({
        nameEmpty: false as boolean,
        userUnavailable: false as boolean
    })
    const [familyMemberId, setFamilyMemberId] = useRecoilState(FamilyMemberIdState)
    const setFamilyModeFollowUpVisibility = useSetRecoilState(FamilyModeFollowUpVisibilityState);
    const [userBudgetsUpdater, setUserBudgetsUpdater] = useRecoilState(UserBudgetsUpdaterState);
    const [myBudgetUpdater, setMyBudgetUpdater] = useRecoilState(MyBudgetUpdaterState);

    function handleSubmit(event: any) {
        event.preventDefault();
        if (data.budgetName.length === 0)
        {
            setErrors({...errors, nameEmpty: true})
            return
        }

        api.post(`/api/modes/family-mode/${familyMemberId}`,
        JSON.stringify({
            bank: data.bank,
            currency: data.currency,
            name: data.budgetName,
        }))
        .then(res => {
            setFamilyModeFollowUpVisibility(false);
            setUserBudgetsUpdater(!userBudgetsUpdater);
            setMyBudgetUpdater(true);
            setFamilyMemberId("");
        })
        .catch(error => {
            if (error.response.status === 403)
            {
                setErrors({
                    nameEmpty: false,
                    userUnavailable: true
                })
                setTimeout(()=>setFamilyModeFollowUpVisibility(false), 2000)
            }
            console.error(error);
        })
    }

    return (
        <div className="family-mode-followup" data-testid="family-mode-followup-panel">
            <div className='title'>
            <div className='main-title' data-testid="family-mode-followup-panel-main-title">
                Before you begin
            </div>
            <div className='subtitle' data-testid="family-mode-followup-panel-subtitle">
                Name your new joint account and choose default currency and bank          
            </div>
            </div>
            <div className='family-mode-followup-form'>
                <form onSubmit={(e) => handleSubmit(e)} data-testid="family-mode-followup-panel-form">
                    <div className='form-elements'>
                        <div className='information-fields'>
                            <label data-testid="family-mode-followup-panel-form-select-bank-field-label">
                                Pick your bank:
                            </label>
                            <div className='input-container'>
                                <select className='field-style' onChange={(e: any) => setData({ ...data, bank: e.target.value })} data-testid="family-mode-followup-panel-form-select-bank-field">
                                    <option value={BankNames.Pko}>PKO BP</option>
                                    <option value={BankNames.Pekao}>Pekao</option>
                                    <option value={BankNames.Santander}>Santander Bank</option>
                                    <option value={BankNames.Ing}>ING Bank</option>
                                    <option value={BankNames.Mbank}>mBank</option>
                                    <option value={BankNames.Other}>Other</option>
                                </select>
                            </div>
                            <label data-testid="family-mode-followup-panel-form-select-currency-field-label">
                                Choose your currency:
                            </label>
                            <div className="input-container">
                                <CurrencyDropdown currency={data.currency}
                                    setCurrency={(e: any) => setData({ ...data, currency: e.target.value })} />
                            </div>
                            <label data-testid="family-mode-followup-panel-form-budget-name-input-field-label">
                                Budget name:
                            </label>
                            <div className="input-container">
                                <input type="text" placeholder='Budget name' className='budget-input' 
                                    onChange={(e: any) => setData({ ...data, budgetName: e.target.value })} data-testid="family-mode-followup-panel-form-budget-name-input-field"/>
                            </div>
                            {errors.nameEmpty &&
                                <div className='form-error-budget'>
                                
                                
                                    <FormInfo 
                                        message="Budget name cannot be empty" 
                                        details="" 
                                        textColor="black"/>
                                </div>
                            }
                            {errors.userUnavailable &&
                                <div className='form-error-user' >
                                <FormInfo 
                                    message="This user is unavailable" 
                                    details="" 
                                    textColor="black"/>
                                </div>
                            }
                        </div>
                    </div>
                    <div className='button-container'>
                        <input type="submit" value="Finish" data-testid="family-mode-followup-panel-finish-button" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default FamilyModeFollowUp;