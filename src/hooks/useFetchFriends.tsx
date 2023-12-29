import { useEffect, useState } from "react";

import { useRecoilValue } from "recoil";

import { FriendsUpdater } from '../atoms/FriendsUpdater';
import api from "../services/api";


export default function useFetchFriends() {

    const friendsUpdater = useRecoilValue(FriendsUpdater);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    
    

    useEffect(() => {
        setLoading(true);
        api.get('/api/users/friends')
        .then((res) => {
            setError(false);
            setData(res.data);
        })
        .catch(error => {
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }, [friendsUpdater]);

    return {data, loading, error};
}