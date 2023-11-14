import '../../css/SettingsPage/UserAccountPanel.css'

import UserAccountIcon from '../../assets/images/user_account.png'

function UserAccountPanel() {
    return (
      <div className="user-account-panel">
        <div className='username'>
          Username 777
        </div>
        <div className='user-icon'>
          <img src={UserAccountIcon}></img>
        </div>
      </div>
    );
  }
  
  export default UserAccountPanel;