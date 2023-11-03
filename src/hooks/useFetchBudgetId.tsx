import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserTokenState } from "../atoms/UserToken";
import { BudgetIdUpdaterState } from "../atoms/BudgetIdUpdater";

export default function useFetchBudgetId() {
    const token = useRecoilValue(UserTokenState);
    const updater = useRecoilValue(BudgetIdUpdaterState);
    const [budgetId, setBudgetId] = useState<any>();

    useEffect(() => {
        if (token === "")
            return;
        fetch(process.env.REACT_APP_API_URL + '/api/users/budgets?budgetType=Personal', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }

                return res.json();
            })
            .then((data) => {
                console.log(data);
                if (data.length === 0) {
                    setBudgetId(null);
                }
                else {
                    setBudgetId(data[0].id);
                }

            })
            .catch(error => {
                console.log(error);
            })
    }, [token, updater])

    return budgetId;
}