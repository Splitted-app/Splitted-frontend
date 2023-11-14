import { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import { SignUpFollowUpUpdaterState } from "../atoms/SignUpFollowUpUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBudgetId() {
    const token = useRecoilValue(UserTokenState);
    const updater = useRecoilState(SignUpFollowUpUpdaterState);
    const [currency, setCurrency] = useState<any>();
    

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
                    setCurrency(null);
                }
                else {
                    setCurrency(data[0].currency);
                }
            })
            .catch(error => {
                console.log(error);
            })
    }, [token, updater])

    return currency;
}