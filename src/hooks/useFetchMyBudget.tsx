import { useEffect, useState } from "react";

import { useRecoilState } from "recoil";

import api from "../services/api";
import { MyBudgetUpdaterState } from "../atoms/MyBudgetUpdater";


export default function useFetchMyBudget() {
    const [myBudgetUpdater, setMyBudgetUpdater] = useRecoilState(MyBudgetUpdaterState);
    let isCached = false;
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
        if (isCached && !myBudgetUpdater)
            return;

        setLoading(true);
        api.get('/api/users/budgets?budgetType=Personal,Family')
        .then((res) => {
            setError(false);
            setData(res.data[0])
            setMyBudgetUpdater(false);
            isCached = true;
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [myBudgetUpdater]) // todo update when user switches to family budget

    return {data, loading, error};
}