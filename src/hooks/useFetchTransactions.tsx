import { useRecoilValue } from "recoil";
import { BudgetIdState } from "../atoms/BudgetId";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchTransactions(setTransactions : Function)
{
    const budgetId = useRecoilValue(BudgetIdState);
    const token = useRecoilValue(UserTokenState);
    if (budgetId === "")
    {
        return;
    }
        
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
            setTransactions(data);
        })
}