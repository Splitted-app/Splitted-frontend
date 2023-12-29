import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserBudgetsUpdaterState } from "../atoms/UserBudgetsUpdater";
import api from "../services/api";

export default function useFetchUserBudgets() {
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const userBudgetsUpdater = useRecoilValue(UserBudgetsUpdaterState)
    const [userBudgets, setUserBudgets] = useState<any>([]);

    useEffect(() => {
        if (loginUpdater === 0)
            return;
        api.get('/api/users/budgets')
        .then((res) => {
            setUserBudgets(res.data)
        })
        .catch(error => {
            console.error(error);
        })
    }, [loginUpdater, userBudgetsUpdater])

    return userBudgets;
}