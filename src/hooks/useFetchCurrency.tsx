import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserTokenState } from "../atoms/UserToken";


export default function useFetchCurrency() {
    const token = useRecoilValue(UserTokenState);
    const updater = useRecoilState(FullLoginUpdaterState);
    const [currency, setCurrency] = useState<any>();
    

    useEffect(() => {
        axios.get(process.env.REACT_APP_API_URL + '/api/users/budgets?budgetType=Personal', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            if (res.data.length === 0) {
                setCurrency(null);
            }
            else {
                setCurrency(res.data[0].currency);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [updater])

    return currency;
}