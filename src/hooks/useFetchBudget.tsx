import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBudget(id : string | undefined) {
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        if (!id)
            return;
        setLoading(true);
        axios.get(process.env.REACT_APP_API_URL + `/api/budgets/${id}`, {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
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
    }, [])

    return {data, loading, error};
}