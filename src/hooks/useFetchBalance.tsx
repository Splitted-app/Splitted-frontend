import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBalance() {
    const token = useRecoilValue(UserTokenState);
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [balance, setBalance] = useState<any>();

    useEffect(() => {
        if (loginUpdater === 0)
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
                setBalance(0);
            }
            else {
                setBalance(res.data[0].budgetBalance);
            }

        })
        .catch(error => {
            console.error(error);
        })
    }, [transactionUpdater, loginUpdater])

    return balance;
}