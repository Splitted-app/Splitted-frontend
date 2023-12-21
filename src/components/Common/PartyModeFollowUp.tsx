import '../../css/Common/PartyModeFollowUp.css';

import { useState } from "react";

import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { UserTokenState } from "../../atoms/UserToken";
import { PartyModeFollowUpVisibilityState } from "../../atoms/PartyModeFollowUp";
import { PartyFriendsIdsState } from '../../atoms/PartyFriendsIds';
import FormInfo from './FormInfo';


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
    const token = useRecoilValue(UserTokenState);
    const setPartyModeFollowUpVisibility = useSetRecoilState(PartyModeFollowUpVisibilityState);

    function handleSubmit(event: any) {
        event.preventDefault();
        if (data.budgetName.length === 0)
        {
            setErrors({...errors, nameEmpty: true})
            return
        }

        axios.post(process.env.REACT_APP_API_URL + `/api/modes/temporary-mode/${partyFriendIds.join('/')}`,
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
            setPartyModeFollowUpVisibility(false);
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
                        <FormInfo 
                            message="Budget name cannot be empty" 
                            details="" 
                            textColor="black"/>}
                        {errors.userUnavailable &&
                        <FormInfo 
                            message="One of the users is unavailable" 
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

export default PartyModeFollowUp;