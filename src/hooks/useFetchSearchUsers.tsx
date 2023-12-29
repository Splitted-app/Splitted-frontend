import { useEffect, useState } from "react";
import api from "../services/api";


export default function useFetchSearchUsers(query: string) {
    const [users, setUsers] = useState<any>([]);
    const [selectOptions, setSelectOptions] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);

    useEffect(() => {
        if (!query)
            return;

        const loadingTimeout = setTimeout(() => {
            setLoading(true)
        }, 500)
        api.get(`/api/users/search/?query=${query}`)
        .then((res) => {
            setSelectOptions(res.data.map((user: any, i: number) => ({value: i, label: user.username})));
            setUsers(res.data);
        })
        .catch(error => {
            console.error(error);
        })
        .finally(()=>{
            clearTimeout(loadingTimeout)
            setLoading(false);
        })
    }, [query])

    return {selectOptions, users, loading};
}