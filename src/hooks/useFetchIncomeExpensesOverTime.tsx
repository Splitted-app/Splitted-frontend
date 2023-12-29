import { useEffect, useState } from "react";

import Moment from 'moment';
import { useRecoilValue } from "recoil";

import { TransactionUpdaterState } from "../atoms/TransactionUpdater";

import useFetchBudgetId from "./useFetchBudgetId";
import api from "../services/api";



export default function useFetchIncomeExpensesOverTime(
    dateRange: any = null,
    category: string|null = null,
    deltaTime: string|null = null,
) 
{
    const budgetId = useFetchBudgetId()
    const transactionUpdater = useRecoilValue(TransactionUpdaterState);
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
    if (deltaTime) // if "" (empty string) don't add it to query
    {
        query += `deltaTime=${deltaTime}&`;
    }
    else
    {
        query += `deltaTime=Day&`;
    }

    useEffect(() => {
        if (budgetId === undefined)
            return;
        setLoading(true);
        api.get(`/api/insights/${budgetId}/income-expenses-over-time/${query}`)
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
    }, [budgetId, transactionUpdater, dateRange, category])

    return {data, loading, error}
}