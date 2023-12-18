import '../../css/Common/PartyModeFollowUp.css';

import { useState } from "react";

import axios from "axios";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";

import { UserTokenState } from "../../atoms/UserToken";
import { PartyModeFollowUpVisibilityState } from "../../atoms/PartyModeFollowUp";
import { PartyFriendsIdsState } from '../../atoms/PartyFriendsIds';


interface FormDataInterface {
    budgetName: string,
    bankName: string,
    currency: string,
}


function PartyModeFollowUp()
{
    const [data, setData] = useState<FormDataInterface>({
        budgetName: "",
        bankName: "Pekao",
        currency: "PLN",
    })
    const [partyFriendIds, setPartyFriendsIds] = useRecoilState(PartyFriendsIdsState)
    const token = useRecoilValue(UserTokenState);
    const setPartyModeFollowUpVisibility = useSetRecoilState(PartyModeFollowUpVisibilityState);

    function handleSubmit(event: any) {
        event.preventDefault();
        console.log(partyFriendIds);
        axios.post(process.env.REACT_APP_API_URL + `/api/modes/temporary-mode/${partyFriendIds.join('/')}`,
        JSON.stringify({
            bank: data.bankName,
            name: data.budgetName,
            currency: data.currency,
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