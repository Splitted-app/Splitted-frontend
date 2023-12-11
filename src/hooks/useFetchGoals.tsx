import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { UserTokenState } from "../atoms/UserToken";


export default function useFetchGoals(mainGoal: boolean = false) {
    const token = useRecoilValue(UserTokenState);
    const [data, setGoals] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_URL + `/api/users/${mainGoal ? 'main-goal' : 'goals'}`, {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            console.log(`${mainGoal} ${res.data}`);
            setError(false);
            setGoals(res.data)
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])

    return { data, loading, error };
}