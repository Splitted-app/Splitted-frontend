import { useEffect, useState } from "react";

import axios from 'axios';
import Moment from 'moment';
import { useRecoilValue } from "recoil";

import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { UserTokenState } from "../atoms/UserToken";

import useFetchBudgetId from "./useFetchBudgetId";



export default function useFetchTransactions(
    dateRange: any = null,
    category: string|null = null,
    amountRange: any = null,
    providedBudgetId: string = "",
) 
{
    const fetchedBudgetId = useFetchBudgetId();
    const usedBudgetId = providedBudgetId ? providedBudgetId : fetchedBudgetId;
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false);

    let query = `?`
    if (dateRange != null)
    {
        query += `dateFrom=${Moment(dateRange[0].startDate).format('YYYY-MM-DD')}&`;
        query += `dateTo=${Moment(dateRange[0].endDate).format('YYYY-MM-DD')}&`;
    }
    if (category) // if "" (empty string) don't add it to query
    {
        query += `category=${category}&`;
    }
    if (amountRange)
    {
        if (amountRange.minAmount != null && amountRange.minAmount != "")
            query += `minAmount=${amountRange.minAmount}&`;
        if (amountRange.maxAmount != null && amountRange.maxAmount != "")
            query += `maxAmount=${amountRange.maxAmount}&`;
    }
    

    useEffect(() => {
        if (usedBudgetId === undefined)
            return;
        setLoading(true);
        axios.get(process.env.REACT_APP_API_URL + `/api/budgets/${usedBudgetId}/transactions/${query}`, {
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },   
        })
        .then(res => {
            setError(false);
            setData(res.data);
            console.log(res.data);
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [usedBudgetId, transactionUpdater, dateRange])


    return {data, loading, error}
}