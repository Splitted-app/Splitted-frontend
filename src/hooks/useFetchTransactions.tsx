import { useRecoilValue } from "recoil";
import { BudgetIdState } from "../atoms/BudgetId";
import { UserTokenState } from "../atoms/UserToken";
import { ManualTransactionUpdaterState } from "../atoms/ManualTransactionUpdater";
import { useEffect, useState } from "react";

export default function useFetchTransactions()
{
    const budgetId = useRecoilValue(BudgetIdState);
    const updater = useRecoilValue(ManualTransactionUpdaterState);
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>([]);

    useEffect(()=>{
        fetch(`https://localhost:7012/api/budgets/${budgetId}/transactions/`,{
        headers: { 
            'Accept': '*',
            'Authorization' : `Bearer ${token}`
        },
        })
        .then(res=>{
            if(!res.ok)
            {
                throw Error('could not fetch the data for that resource');
            }
            return res.json();
        })
        .then(data=>{
            setData(data);
        })
        .catch(error => {
            console.log("error");
        })
    },[budgetId, updater])
        
    
    return data
}