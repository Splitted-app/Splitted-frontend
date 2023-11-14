import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { SignUpFollowUpUpdaterState } from "../atoms/SignUpFollowUpUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBankName() : string {
    const token = useRecoilValue(UserTokenState);
    const updater = useRecoilValue(SignUpFollowUpUpdaterState);
    const [bankName, setBankName] = useState<string>("Other");

    useEffect(() => {
        if (token === "")
            return;
        fetch(process.env.REACT_APP_API_URL + '/api/users/budgets?budgetType=Personal', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }

                return res.json();
            })
            .then((data) => {
                if (data.length === 0) {
                    setBankName("Other");
                }
                else {
                    setBankName(data[0].bank);
                }

            })
            .catch(error => {
                console.log(error);
            })
    }, [token, updater])

    return bankName;
}