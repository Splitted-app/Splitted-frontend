import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import api from "../services/api";


export default function useFetchCurrency() {
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [currency, setCurrency] = useState<any>();
    
    useEffect(() => {
        if (loginUpdater === 0)
            return;
        api.get('/api/users/budgets?budgetType=Personal,Family')
        .then((res) => {
            if (res.data.length === 0) {
                setCurrency(null);
            }
            else {
                setCurrency(res.data[0].currency);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [loginUpdater])

    return currency;
}