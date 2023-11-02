import { useRecoilValue } from "recoil";
import { UserTokenState } from "../atoms/UserToken";
import { TransactionUpdaterState } from "../atoms/TransactionUpdater";
import { TransactionsDateRangeState } from "../atoms/TransactionsDateRange";
import { useEffect, useState } from "react";
import useFetchBudgetId from "./useFetchBudgetId";
import Moment from 'moment';

export default function useFetchTransactions() {
    const budgetId = useFetchBudgetId()
    const updater = useRecoilValue(TransactionUpdaterState);
    const dateRange = useRecoilValue(TransactionsDateRangeState);
    const token = useRecoilValue(UserTokenState);
    const [data, setData] = useState<any>([]);

    let query = `?`
    query += `dateFrom=${Moment(dateRange[0].startDate).format('YYYY-MM-DD')}&`;
    query += `dateTo=${Moment(dateRange[0].endDate).format('YYYY-MM-DD')}&`;

    useEffect(() => {
        fetch(process.env.REACT_APP_API_URL + `/api/budgets/${budgetId}/transactions/${query}`, {
            headers: {
                'Accept': '*',
                'Authorization': `Bearer ${token}`
            },
        })
            .then(res => {
                if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                }
                return res.json();
            })
            .then(data => {
                setData(data);
            })
            .catch(error => {
                console.log("error");
            })
    }, [budgetId])


    return data
}