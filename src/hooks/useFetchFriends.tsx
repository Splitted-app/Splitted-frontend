import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserTokenState } from "../atoms/UserToken";
import { FriendsUpdater } from '../atoms/FriendsUpdater';


export default function useFetchFriends() {

    const token = useRecoilValue(UserTokenState);
    const friendsUpdater = useRecoilValue(FriendsUpdater);
    const [data, setData] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);
    
    

    useEffect(() => {
        setLoading(true);
        axios.get(process.env.REACT_APP_API_URL + '/api/users/friends', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
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