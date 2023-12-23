import '../../css/SettingsPage/UserAccountPanel.css'

import UserAccountIcon from '../../assets/images/user_account.png'
import AvatarImage from './AvatarImage';

interface userAccountPanelInterface
{
  username:string,
  avatarImage:string;
}

function UserAccountPanel({username, avatarImage}:userAccountPanelInterface) {

    return (
      <div className="user-account-panel">
        <div className='username'>
          {username}
        </div>
        <div className='user-icon'>
          <AvatarImage editable={false} avatarImage={avatarImage}/>
        </div>
      </div>
    );
  }
  
  export default UserAccountPanel;