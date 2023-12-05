import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchUserBudgets() {
    const token = useRecoilValue(UserTokenState);
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [userBudgets, setUserBudgets] = useState<any>([]);

    useEffect(() => {
        if (loginUpdater === 0)
            return;
        axios.get(process.env.REACT_APP_API_URL + '/api/users/budgets', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            setUserBudgets(res.data)
        })
        .catch(error => {
            console.error(error);
        })
    }, [loginUpdater])

    return userBudgets;
}