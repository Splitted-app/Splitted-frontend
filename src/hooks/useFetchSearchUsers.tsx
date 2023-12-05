import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { UserTokenState } from "../atoms/UserToken";

export default function useFetchSearchUsers(query: string) {
    const token = useRecoilValue(UserTokenState);
    const [users, setUsers] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!query)
            return;

        const loadingTimeout = setTimeout(() => {
            setLoading(true)
        }, 500)
        axios.get(process.env.REACT_APP_API_URL + `/api/users/search/?query=${query}`, {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            setUsers(res.data.map((user: any) => ({value: user.username, label: user.username})));
        })
        .catch(error => {
            console.error(error);
        })
        .finally(()=>{
            clearTimeout(loadingTimeout)
            setLoading(false);
        })
    }, [query])

    return {users, loading};
}