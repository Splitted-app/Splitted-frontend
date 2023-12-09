import '../../css/SettingsPage/FriendsPanel.css'


import Friend from './Friend';

import useFetchFriends from '../../hooks/useFetchFriends';




function FriendsPanel() {

    const friends =  useFetchFriends();
    return (
      <div className="friends-panel">
        <div className='friends-panel-header'>
            <div className='friends-panel-title'>
                Your friends
            </div>
        </div>
        <div className='friends-panel-data-container'>
          {
            friends.map((friend:any)=>{
              <Friend email={friend.email} username={friend.username} avatarimage={friend.avatarimage}/>
            }
            )
          }
        </div>
        <div className='add-new-friends-button-container'>
          <button className='add-new-friends-button'> + </button>
        </div>
      </div>
    );
  }
  
  export default FriendsPanel;