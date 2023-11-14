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
) {
    const budgetId = useFetchBudgetId()
    const updater = useRecoilValue(TransactionUpdaterState);
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>([]);

    let query = `?`
    if (dateRange)
    {
        query += `dateFrom=${Moment(dateRange[0].startDate).format('YYYY-MM-DD')}&`;
        query += `dateTo=${Moment(dateRange[0].endDate).format('YYYY-MM-DD')}&`;
    }
    if (category)
    {
        query += `category=${category}&`;
    }
    if (amountRange)
    {
        if (amountRange.minAmount)
            query += `minAmount=${amountRange.minAmount}&`;
        if (amountRange.maxAmount)
            query += `maxAmount=${amountRange.maxAmount}&`;
    }
    

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + `/api/budgets/${budgetId}/transactions/${query}`, {
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },   
        })
        .then(res => {
            setData(res.data);
        })
        .catch(error => {
            console.log("Fetch transactions error: " + error);
        })
        // fetch(process.env.REACT_APP_API_URL + `/api/budgets/${budgetId}/transactions/${query}`, {
        //     headers: {
        //         'Accept': '*',
        //         'Authorization': `Bearer ${token}`
        //     },
        // })
        // .then(res => {
        //     if (!res.ok) {
        //         throw Error('could not fetch the data for that resource');
        //     }
        //     return res.json();
        // })
        // .then(data => {
        //     setData(data);
        // })
        // .catch(error => {
        //     console.log("error");
        // })
    }, [budgetId, updater, dateRange])


    return data
}