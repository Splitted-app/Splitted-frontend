import { useEffect, useState } from "react";

import axios from 'axios';
import { useRecoilValue } from "recoil";


import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBudgetId() {
    const token = useRecoilValue(UserTokenState);
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [budgetId, setBudgetId] = useState<any>();

    useEffect(() => {
        if (!loginUpdater)
            return;
        axios.get(process.env.REACT_APP_API_URL + '/api/users/budgets?budgetType=Personal', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            if (res.data.length === 0) {
                setBudgetId(null);
            }
            else {
                setBudgetId(res.data[0].id);
            }
        })
        .catch(error => {
            console.log("Fetch budgetId error: " + error);
        })
    }, [loginUpdater])

    return budgetId;
}