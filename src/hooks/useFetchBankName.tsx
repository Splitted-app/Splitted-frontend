import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserTokenState } from "../atoms/UserToken";

export default function useFetchBankName() : string {
    const token = useRecoilValue(UserTokenState);
    const updater = useRecoilValue(FullLoginUpdaterState);
    const [bankName, setBankName] = useState<string>("Other");

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
                setBankName("Other");
            }
            else {
                setBankName(res.data[0].bank);
            }
        })
        .catch(error => {
            console.log(error);
        })
    }, [updater])

    return bankName;
}