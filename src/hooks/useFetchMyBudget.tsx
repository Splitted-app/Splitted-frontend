import { useEffect, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { MyBudgetUpdaterState } from "../atoms/MyBudgetUpdater";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";

import api from "../services/api";

export default function useFetchMyBudget() {
    const [myBudgetUpdater, setMyBudgetUpdater] = useRecoilState(MyBudgetUpdaterState);
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
    const fullLoginUpdater = useRecoilValue(FullLoginUpdaterState)
    const [data, setData] = useState({
        "id": "",
        "name": "",
        "bank": "Other",
        "budgetType": "Personal",
        "currency": "",
        "budgetBalance": 0
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        api.get('/api/users/budgets?budgetType=Personal,Family')
        .then((res) => {
            if (res.data.length === 0)
            {
                setData({
                    "id": "",
                    "name": "",
                    "bank": "Other",
                    "budgetType": "Personal",
                    "currency": "",
                    "budgetBalance": 0
                })
                setError(true);
            }
            else
            {
                setError(false);
                setData(res.data[0])
            }
            setMyBudgetUpdater(false);
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [myBudgetUpdater, transactionUpdater, fullLoginUpdater])

    return {data, loading, error};
}