import '../../css/SettingsPage/AddNewFriendPanel.css'

import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from '../Common/CloseButton';
import LoadingPanel from '../Common/LoadingPanel';


import { AddNewFriendPanelVisibilityState } from '../../atoms/AddNewFriendPanelVisibility';
import { FriendIdState } from '../../atoms/FriendId';
import { FriendsUpdater } from '../../atoms/FriendsUpdater';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';
import FormInfo from '../Common/FormInfo';
import api from '../../services/api';


function AddNewFriendPanel() {

    const setAddNewFriendPanelVisibility = useSetRecoilState(AddNewFriendPanelVisibilityState);
    const [query, setQuery] = useState<string>("");
    const searchResult = useFetchSearchUsers(query);
    const [friendId, setFriendId] = useRecoilState(FriendIdState)
    const [friendsUpdater, setFriendsUpdater] = useRecoilState(FriendsUpdater);

    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState({
        noUser: false,
        invalidUser: false,
    });


    function onSelectChange(option: any) 
    {
      if (!option)
      {
        setFriendId("")
      }
      else
      {
        setFriendId(searchResult.users[option.value].id);
      }      
    }

    function handleAddNewFriend()
    {
        console.log(friendId);
        if (friendId === "")
        {
            setErrors({...errors, noUser: true});
            console.log('no user');
            return;
        }

        api.post(`/api/users/friends/${friendId}`, null)
        .then((res)=>{
            setFriendsUpdater(!friendsUpdater);
            setAddNewFriendPanelVisibility(false);
            setFriendId("");
        })
        .catch((error)=>{
            if (error.response.status === 400)
                setErrors({
                    noUser: false,
                    invalidUser: true,
                })
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return (
      <div className="add-new-friend-panel">
        <div className='close-button-container'>
          <CloseButton setVisibility={setAddNewFriendPanelVisibility}/>
        </div>
        <div className="title">
            <div className="main-title">
                Add new friend
            </div>
            <div className="subtitle">
                Let's find you some new friends.
            </div>
        </div>
        <div className='find-your-friends-panel'>
            <label>
                Let's find your friend:
            </label>
            <div className="search-container">
                <Select
                    className="search-select"
                    onChange={onSelectChange}
                    options={searchResult.selectOptions}
                    isLoading={searchResult.loading}
                    isSearchable
                    onInputChange={setQuery}
                    placeholder="Search users..."
                />
            </div>
            {errors.noUser &&
            <div className='form-error-nouser'>
                <FormInfo 
                    message="No user selected" 
                    details="" 
                    textColor="black"/>
            </div>}
        </div>
        {errors.invalidUser &&
        <div className='form-error-invalid-user'>
            <FormInfo 
                message="You are already friends with this user" 
                details="" 
                textColor="black"/>
        </div>}
        <div className='add-new-friend-button'>
            {loading && <LoadingPanel error={false} color={"black"}/>}
            {!loading &&
                 <button className='button' onClick={handleAddNewFriend}>Add</button>
            }
        </div>
      </div>
    );
  }
  
  export default AddNewFriendPanel;