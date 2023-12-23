import '../../css/SettingsPage/DeleteFriendConfirmationPanel.css';

import { useSetRecoilState, useRecoilState, useRecoilValue } from 'recoil';

import { DeleteFriendPanelVisibilityState } from '../../atoms/DeleteFriendPanelVisibility';
import { FriendIdState } from '../../atoms/FriendId';
import { UserTokenState } from '../../atoms/UserToken';
import { FriendsUpdater } from '../../atoms/FriendsUpdater';




function DeleteFriendConfirmationPanel() {

    const setDeleteFriendPanelVisibility = useSetRecoilState(DeleteFriendPanelVisibilityState);
    const token = useRecoilValue(UserTokenState);
    const [friendId, setFriendId] = useRecoilState(FriendIdState);
    const [friendsUpdater, setFriendsUpdater] = useRecoilState(FriendsUpdater);


    function handleCancel()
    {
      setDeleteFriendPanelVisibility(false);
      setFriendId("");
    }

    function handleConfirm()
    {
        fetch(process.env.REACT_APP_API_URL + `/api/users/friends/${friendId}` , {
            method: 'DELETE',
            headers: {
              'Accept': '*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
      
            }
          })
            .then(res => {
                if (!res.ok) {
                throw Error('could not fetch the data for that resource');
                }
                setFriendsUpdater(!friendsUpdater);
                setDeleteFriendPanelVisibility(false);
                setFriendId("");
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