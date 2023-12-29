import '../../css/SettingsPage/DeleteFriendConfirmationPanel.css';

import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';

import { DeleteFriendPanelVisibilityState } from '../../atoms/DeleteFriendPanelVisibility';
import { FriendIdState } from '../../atoms/FriendId';
import { FriendsUpdater } from '../../atoms/FriendsUpdater';
import api from '../../services/api';




function DeleteFriendConfirmationPanel() {

    const setDeleteFriendPanelVisibility = useSetRecoilState(DeleteFriendPanelVisibilityState);
    const [friendId, setFriendId] = useRecoilState(FriendIdState);
    const [friendsUpdater, setFriendsUpdater] = useRecoilState(FriendsUpdater);


    function handleCancel()
    {
      setDeleteFriendPanelVisibility(false);
      setFriendId("");
    }

    function handleConfirm()
    {
        api.delete(`/api/users/friends/${friendId}`)
        .then(res => {
          setFriendsUpdater(!friendsUpdater);
          setDeleteFriendPanelVisibility(false);
          setFriendId("");
        })
        .catch(error=>{
          console.error(error);
        });
    }

    return (
      <div className="delete-friend-confirmation-panel" data-testid="delete-friend-confirmation-panel">
        <div className='title'>
          <div className='main-title'>
            Delete friend
          </div>
          <div className='subtitle'>
            Are you sure you want to delete this user from your friends?
          </div>
        </div>
        <div className='delete-friend-confirmation-panel-buttons'>
          <div className='cancel-button-container'>
            <button className='cancel-button' onClick={handleCancel} data-testid="delete-friend-confirmation-panel-cancel-button">Cancel</button>
          </div>
          <div className='delete-friend-button-container'>
            <button className='delete-friend-button' onClick={handleConfirm}>Delete</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default DeleteFriendConfirmationPanel;