import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import api from "../services/api";

export default function useFetchBankName() : string {
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [bankName, setBankName] = useState<string>("Other");

    useEffect(() => {
        if (loginUpdater === 0)
            return;
        api.get('/api/users/budgets?budgetType=Personal,Family')
        .then((res) => {
            if (res.data.length === 0) {
                setBankName("Other");
            }
            else {
                setBankName(res.data[0].bank);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [loginUpdater])

    return bankName;
}