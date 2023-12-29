import '../../css/Common/PartyModeFollowUp.css';

import { useState } from "react";

import { useRecoilState, useSetRecoilState } from "recoil";

import FormInfo from './FormInfo';

import { PartyModeFollowUpVisibilityState } from "../../atoms/PartyModeFollowUp";
import { PartyFriendsIdsState } from '../../atoms/PartyFriendsIds';
import { UserBudgetsUpdaterState } from '../../atoms/UserBudgetsUpdater';
import api from '../../services/api';


interface FormDataInterface {
    budgetName: string,
}


function PartyModeFollowUp()
{
    const [data, setData] = useState<FormDataInterface>({
        budgetName: "",
    })
    const [errors, setErrors] = useState({
        nameEmpty: false as boolean,
        userUnavailable: false as boolean
    })
    const [partyFriendIds, setPartyFriendsIds] = useRecoilState(PartyFriendsIdsState)
    const setPartyModeFollowUpVisibility = useSetRecoilState(PartyModeFollowUpVisibilityState);
    const [userBudgetsUpdater, setUserBudgetsUpdater] = useRecoilState(UserBudgetsUpdaterState)

    function handleSubmit(event: any) {
        event.preventDefault();
        if (data.budgetName.length === 0)
        {
            setErrors({...errors, nameEmpty: true})
            return
        }

        api.post(`/api/modes/temporary-mode/${partyFriendIds.join('/')}`,
        JSON.stringify({
            name: data.budgetName,
        }))
        .then(res => {
            setPartyModeFollowUpVisibility(false);
            setUserBudgetsUpdater(!userBudgetsUpdater);
            setPartyFriendsIds([]);
        })
        .catch(error => {
            if (error.response.status === 403)
            {
                setErrors({
                    nameEmpty: false,
                    userUnavailable: true
                })
                setTimeout(()=>setPartyModeFollowUpVisibility(false), 2000)
            }
                
            console.error(error);
        })
    }

    return (
        <div className="party-mode-followup">
            <div className='title'>
            <div className='main-title'>
                Before you begin
            </div>
            <div className='subtitle'>
                Name your new joint account          
            </div>
            </div>
            <div className='party-mode-followup-form'>
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

export default PartyModeFollowUp;