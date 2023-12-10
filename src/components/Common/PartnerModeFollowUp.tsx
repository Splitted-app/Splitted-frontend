import '../../css/Common/PartnerModeFollowUp.css';

import { useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { UserTokenState } from "../../atoms/UserToken";
import { PartnerModeFollowUpVisibilityState } from "../../atoms/PartnerModeFollowUp";
import axios from "axios";
import { PartnerIdState } from "../../atoms/PartnerId";


interface FormDataInterface {
    budgetName: string,
    bankName: string,
    currency: string,
}


function PartnerModeFollowUp()
{
    const [data, setData] = useState<FormDataInterface>({
        budgetName: "",
        bankName: "Pekao",
        currency: "PLN",
    })
    const [partnerId, setPartnerId] = useRecoilState(PartnerIdState)
    const token = useRecoilValue(UserTokenState);
    const setPartnerModeFollowUpVisibility = useSetRecoilState(PartnerModeFollowUpVisibilityState);

    function handleSubmit(event: any) {
        event.preventDefault();
        axios.post(process.env.REACT_APP_API_URL + `/api/modes/partner-mode/${partnerId}`,
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
            setPartnerModeFollowUpVisibility(false);
            setPartnerId("");
        })
        .catch(error => {
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