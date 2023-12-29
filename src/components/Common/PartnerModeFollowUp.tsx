import '../../css/Common/PartnerModeFollowUp.css';

import { useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import FormInfo from './FormInfo';

import { PartnerModeFollowUpVisibilityState } from "../../atoms/PartnerModeFollowUp";
import { PartnerIdState } from "../../atoms/PartnerId";
import { UserBudgetsUpdaterState } from '../../atoms/UserBudgetsUpdater';
import api from '../../services/api';


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
    const setPartnerModeFollowUpVisibility = useSetRecoilState(PartnerModeFollowUpVisibilityState);
    const [userBudgetsUpdater, setUserBudgetsUpdater] = useRecoilState(UserBudgetsUpdaterState)

    function handleSubmit(event: any) {
        event.preventDefault();
        if (data.budgetName.length === 0)
        {
            setErrors({...errors, nameEmpty: true})
            return
        }

        api.post(`/api/modes/partner-mode/${partnerId}`,
        JSON.stringify({
            name: data.budgetName,
        }))
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
                        <div className='form-error-budget'>
                            <FormInfo 
                                message="Budget name cannot be empty" 
                                details="" 
                                textColor="black"/>
                        </div>
                        }
                        {errors.userUnavailable &&
                        <div className='form-error-user'>
                            <FormInfo 
                                message="One of the users is unavailable" 
                                details="" 
                                textColor="black"/>
                        </div>
                        }
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