import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { UserTokenState } from "../atoms/UserToken";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { BudgetIdUpdaterState } from "../atoms/BudgetIdUpdater";

export default function useFetchBudgetId()
{
    const token = useRecoilValue(UserTokenState);
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
    const budgetIdUpdater = useRecoilValue(BudgetIdUpdaterState);
    const [balance, setBalance] = useState<any>();

    useEffect(()=>{
        if (token === "")
            return;
        fetch('https://localhost:7012/api/users/budgets?budgetType=Personal',{
        headers: { 
            'Accept': '*',
            'Content-Type': 'application/json',
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
        .then((data)=>{
            if (data.length === 0)
            {
                setBalance(0);
            }
            else
            {
                setBalance(data[0].budgetBalance);
            }
            
        })
        .catch(error => {
            console.log(error);
        })
    }, [transactionUpdater, budgetIdUpdater])
    
    return balance;
}