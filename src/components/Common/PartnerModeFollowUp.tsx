import '../../css/Common/PartnerModeFollowUp.css';

import { useState } from "react";

import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import FormInfo from './FormInfo';

import { UserTokenState } from "../../atoms/UserToken";
import { PartnerModeFollowUpVisibilityState } from "../../atoms/PartnerModeFollowUp";
import { PartnerIdState } from "../../atoms/PartnerId";
import { UserBudgetsUpdaterState } from '../../atoms/UserBudgetsUpdater';


interface FormDataInterface {
    budgetName: string,
}


function PartnerModeFollowUp()
{
    const [data, setData] = useState<FormDataInterface>({
        budgetName: "",
    })
    const [errors, setErrors] = useState({
        nameEmpty: false as boolean,
        userUnavailable: false as boolean
    })
    const [partnerId, setPartnerId] = useRecoilState(PartnerIdState)
    const token = useRecoilValue(UserTokenState);
    const setPartnerModeFollowUpVisibility = useSetRecoilState(PartnerModeFollowUpVisibilityState);
    const [userBudgetsUpdater, setUserBudgetsUpdater] = useRecoilState(UserBudgetsUpdaterState)

    function handleSubmit(event: any) {
        event.preventDefault();
        if (data.budgetName.length === 0)
        {
            setErrors({...errors, nameEmpty: true})
            return
        }

        axios.post(process.env.REACT_APP_API_URL + `/api/modes/partner-mode/${partnerId}`,
        JSON.stringify({
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
            setPartnerModeFollowUpVisibility(false);
            setUserBudgetsUpdater(!userBudgetsUpdater);
            setPartnerId("");
        })
        .catch(error => {
            if (error.response.status === 403)
            {
                setErrors({
                    nameEmpty: false,
                    userUnavailable: true
                })
                setTimeout(()=>setPartnerModeFollowUpVisibility(false), 2000)
            }
                
            console.error(error);
        })
    }

    return (
        <div className="partner-mode-followup">
            <div className='title'>
            <div className='main-title'>
                Before you begin
            </div>
            <div className='subtitle'>
                Name your new joint account          
            </div>
            </div>
            <div className='partner-mode-followup-form'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='form-elements'>
                        <div className='information-fields'>
                            <label>
                                Budget name:
                            </label>
                            <div className="input-container">
                                <input type="text" placeholder='Budget name' className='budget-input' 
                                    onChange={(e: any) => setData({ ...data, budgetName: e.target.value })}/>
                            </div>
                        </div>
                        {errors.nameEmpty && 
                        <FormInfo 
                            message="Budget name cannot be empty" 
                            details="" 
                            textColor="black"/>}
                        {errors.userUnavailable &&
                        <FormInfo 
                            message="This user is unavailable" 
                            details="" 
                            textColor="black"/>}
                    </div>
                    
                    <div className='button-container'>
                        <input type="submit" value="Finish" />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default PartnerModeFollowUp;