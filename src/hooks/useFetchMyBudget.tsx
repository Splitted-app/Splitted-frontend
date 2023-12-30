import { useEffect, useState } from "react";
import api from "../services/api";


export default function useFetchMyBudget() {
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
        if (isCached)
            return;

        setLoading(true);
        api.get('/api/users/budgets?budgetType=Personal,Family')
        .then((res) => {
            setError(false);
            setData(res.data[0])
            isCached = true;
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, []) // todo update when user switches to family budget

    return {data, loading, error};
}