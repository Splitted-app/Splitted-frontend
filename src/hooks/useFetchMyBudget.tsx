import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import { MyBudgetUpdaterState } from "../atoms/MyBudgetUpdater";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";

import api from "../services/api";



export default function useFetchMyBudget() {
    const [myBudgetUpdater, setMyBudgetUpdater] = useRecoilState(MyBudgetUpdaterState);
    const [transactionUpdater, setTransactionUpdater] = useRecoilState(TransactionUpdaterState);
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
            setError(false);
            setData(res.data[0])
            setMyBudgetUpdater(false);
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [myBudgetUpdater, transactionUpdater])

    return {data, loading, error};
}