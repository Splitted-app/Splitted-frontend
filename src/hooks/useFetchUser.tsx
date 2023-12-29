import { useEffect, useState } from "react";
import api from "../services/api";

export default function useFetchUser() {
    const [data, setData] = useState({
        "id": "",
        "email": "",
        "username": "",
        "avatarImage": ""
    });
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    useEffect(() => {
        setLoading(true);
        api.get('/api/users')
        .then((res) => {
            setError(false);
            setData(res.data)
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [])

    return {data, loading, error};
}