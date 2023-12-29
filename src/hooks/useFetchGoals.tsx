import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { GoalsUpdaterState } from "../atoms/GoalsUpdaterState";
import api from "../services/api";


export default function useFetchGoals(mainGoal: boolean = false) {
    const goalUpdater = useRecoilValue(GoalsUpdaterState)
    const [data, setGoals] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    

    useEffect(() => {
        setLoading(true);
        api.get(`/api/users/${mainGoal ? 'main-goal' : 'goals'}`)
        .then((res) => {
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
    }, [goalUpdater])

    return { data, loading, error };
}