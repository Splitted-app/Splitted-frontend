import '../../css/SettingsPage/Friend.css'

import { useSetRecoilState} from 'recoil';

import AvatarImage from './AvatarImage';

import { DeleteFriendPanelVisibilityState } from '../../atoms/DeleteFriendPanelVisibility';
import { FriendIdState } from '../../atoms/FriendId';

import DeleteFriendIcon from '../../assets/images/delete_friend.png'
interface FriendInterface
{
    id:string,
    username:string,
    avatarimage:string
}


function Friend({id,username,avatarimage}:FriendInterface) {
  const setDeleteFriendPanelVisibility = useSetRecoilState(DeleteFriendPanelVisibilityState);
  const setFriendId = useSetRecoilState(FriendIdState);

  function handleDeleteFriendButton()
  {
    setFriendId(id);
    setDeleteFriendPanelVisibility(true);
  }
  
    return (
      <div className="friend">
        <div className='friend-content'>
          <div className='avatar-image friend-element'>
            <AvatarImage editable={false} avatarImage={avatarimage}/>
          </div>
          <div className='username friend-element'>
            {username}
          </div>
        </div>
        <div className='delete-friend-button-container'>
          <button onClick={handleDeleteFriendButton}>
            <img src={DeleteFriendIcon}></img>
          </button>
        </div>
      </div>
    );
  }
  
  export default Friend;