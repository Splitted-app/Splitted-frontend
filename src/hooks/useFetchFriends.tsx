import { useEffect, useState } from "react";

import axios from "axios";
import { useRecoilValue } from "recoil";

import { FullLoginUpdaterState } from "../atoms/FullLoginUpdater";
import { UserTokenState } from "../atoms/UserToken";


export default function useFetchFriends() {
    const token = useRecoilValue(UserTokenState);
    const loginUpdater = useRecoilValue(FullLoginUpdaterState);
    const [friends, setFriends] = useState<any>([]);
    

    useEffect(() => {
        if (loginUpdater === 0)
            return;
        axios.get(process.env.REACT_APP_API_URL + '/api/users/friends', {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
        })
        .then((res) => {
            if (res.data.length === 0) {
                setFriends([]);
            }
            else {
                setFriends(res.data[0]);
            }
        })
        .catch(error => {
            console.error(error);
        })
    }, [loginUpdater])

    return friends;
}