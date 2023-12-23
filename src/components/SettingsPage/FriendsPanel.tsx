import '../../css/SettingsPage/FriendsPanel.css'

import { useSetRecoilState } from 'recoil';

import Friend from './Friend';

import { AddNewFriendPanelVisibilityState } from '../../atoms/AddNewFriendPanelVisibility';

import useFetchFriends from '../../hooks/useFetchFriends';




function FriendsPanel() {

    const {data: friends, loading, error} = useFetchFriends();
    const setAddNewFriendPanelVisibility = useSetRecoilState(AddNewFriendPanelVisibilityState);

    function handleAddNewFriend()
    {
      setAddNewFriendPanelVisibility(true);
    }
    return (
      <div className="friends-panel">
        <div className='friends-panel-header'>
            <div className='friends-panel-title'>
                Your friends
            </div>
        </div>
        <div className='friends-panel-data-container'>
          {
            Array.from(friends).map((friend:any)=>
              <Friend id={friend.id} username={friend.username} avatarimage={friend.avatarimage}/>
            )
          }
        </div>
        <div className='add-new-friends-button-container'>
          <button className='add-new-friends-button' onClick={handleAddNewFriend}> + </button>
        </div>
      </div>
    );
  }
  
  export default FriendsPanel;