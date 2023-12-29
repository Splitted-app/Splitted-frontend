import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";

import api from "../services/api";

export default function useFetchBalance() {
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [balance, setBalance] = useState<any>();

    useEffect(() => {
        if (loginUpdater === 0)
            return;
        api.get('/api/users/budgets?budgetType=Personal,Family')
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