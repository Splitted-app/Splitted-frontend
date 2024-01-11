import { useEffect, useState } from "react";

import api from "../services/api";

export default function useFetchBudget(id : string | undefined) {
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!id)
            return;
        setLoading(true);
        api.get(`/api/budgets/${id}`)
        .then((res) => {
            setError(false);
            setData(res.data)
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false)
        })
    }, [id])

    return {data, loading, error};
}