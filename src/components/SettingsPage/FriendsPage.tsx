import '../../css/SettingsPage/FriendsPage.css'

import {useEffect } from 'react';

import { useRecoilState } from 'recoil';

import FriendsPanel from './FriendsPanel';

import { AddNewFriendPanelVisibilityState } from '../../atoms/AddNewFriendPanelVisibility';
import { DeleteFriendPanelVisibilityState } from '../../atoms/DeleteFriendPanelVisibility';

import FriendsIcon from '../../assets/images/friends_settings.png'
import AddNewFriendPanel from './AddNewFriendPanel';
import DeleteFriendConfirmationPanel from './DeleteFriendConfirmationPanel';



function FriendsPage() {
  const [addNewFriendPanelVisibility, setAddNewFriendPanelVisibility] = useRecoilState(AddNewFriendPanelVisibilityState);
  const [deleteFriendConfirmationPanelVisibility, setDeleteFriendConfirmationnPanelVisibility] = useRecoilState(DeleteFriendPanelVisibilityState);
  useEffect(()=>
  {
    setAddNewFriendPanelVisibility(false);
    setDeleteFriendConfirmationnPanelVisibility(false);
  },[]);

    return (
      <div className="friends-page" >
        <div className='friends-page-main-content' style={{filter:(addNewFriendPanelVisibility || deleteFriendConfirmationPanelVisibility)?'brightness(50%)': 'brightness(100%'}} data-testid="friends-page">
          <div className='friends-page-header'>
            <div className='friends-page-icon'>
              <img src={FriendsIcon}></img>
            </div>
            <div className='friends-page-title'>
                Friends
            </div>
          </div>
          <div className='friends-page-content'>
            <div className='friends-page-content-title'>
              Your friends
            </div>
            <div className='friends-panel-container'>
              <FriendsPanel/>
            </div>
          </div>
        </div>
        <div className='friends-page-popup' style={{'display': (addNewFriendPanelVisibility || deleteFriendConfirmationPanelVisibility) ? 'flex' : 'none'}}>
          {addNewFriendPanelVisibility && <AddNewFriendPanel/>}
          {deleteFriendConfirmationPanelVisibility && <DeleteFriendConfirmationPanel/>}
        </div>
      </div>
    );
  }
  
  export default FriendsPage;