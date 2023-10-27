import { useRecoilValue } from "recoil";
import { UserTokenState } from "../atoms/UserToken";
import { ManualTransactionUpdaterState } from "../atoms/ManualTransactionUpdater";
import { TransactionsDateRangeState } from "../atoms/TransactionsDateRange";
import { useEffect, useState } from "react";
import useFetchBudgetId from "./useFetchBudgetId";

export default function useFetchTransactions()
{
    const budgetId = useFetchBudgetId()
    const updater = useRecoilValue(ManualTransactionUpdaterState);
    const dateRange = useRecoilValue(TransactionsDateRangeState);
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>([]);

    // const query = `?dateFrom=${dateRange[0].startDate}&dateTo=${dateRange[0].endDate}`

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
    },[budgetId, updater, dateRange])
        
    
    return data
}