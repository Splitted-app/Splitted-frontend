import { useEffect, useState } from "react";

import axios from 'axios';
import Moment from 'moment';
import { useRecoilValue } from "recoil";

import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { UserTokenState } from "../atoms/UserToken";

import useFetchBudgetId from "./useFetchBudgetId";



export default function useFetchExpensesHistogram(
    dateRange: any = null,
    category: string|null = null,
    binRange: number|null = null
) 
{
    const budgetId = useFetchBudgetId()
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
    if (binRange) // if "" (empty string) don't add it to query
    {
        query += `binRange=${binRange}&`;
    }

    useEffect(() => {
        if (budgetId === undefined)
            return;
        setLoading(true);
        axios.get(process.env.REACT_APP_API_URL + `/api/insights/${budgetId}/expenses-histogram/${query}`, {
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },   
        })
        .then(res => {
            setData(res.data);
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(() => {
            setLoading(false);
        })
    }, [budgetId, transactionUpdater, dateRange, category, binRange])

    return {data, loading, error}
}