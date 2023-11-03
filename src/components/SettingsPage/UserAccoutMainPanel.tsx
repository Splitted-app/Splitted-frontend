import '../../css/SettingsPage/UserAccountMainPanel.css'
import UserAccountIcon from '../../assets/images/user_account.png'
import EditIcon from '../../assets/images/edit_icon.png'

function UserAccountMainPanel() {
    return (
      <div className="user-account-main-panel">
        <div className='user-account-main-panel-title'>
          <div className='user-account-icon'>
            <img src={UserAccountIcon}></img>
          </div>
          <div className='username'>
            Username777
          </div>
        </div>
        <div className='user-account-main-panel-data-container'>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your balance:
            </div>
            <div className='users-value'>
              5000
            </div>
          </div>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your bank:
            </div>
            <div className='users-value'>
              Pekao
            </div>
          </div>
          <div className='user-account-data-container'>
          <div className='main-text'>
              Your currency:
            </div>
            <div className='users-value'>
              PLN
            </div>
          </div>
        </div>
        <div className='edit-user-account-main-panel-button-container'>
          <button className='edit-user-account-main-panel-button'>
            <img src={EditIcon}></img>
          </button>
        </div>
      </div>
    );
  }
  
  export default UserAccountMainPanel;