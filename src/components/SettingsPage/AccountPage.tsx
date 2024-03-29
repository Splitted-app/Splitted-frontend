import '../../css/SettingsPage/AccountPage.css'
import UserAccountPanel from './UserAccountPanel';
import UserAccountMainPanel from './UserAccoutMainPanel';


function AccountPage() {
    return (
      <div className="account-page">
        <div className='account-page-header'>
          <div className='user-panel'>
            <UserAccountPanel/>
          </div>
          <div className='account-page-title'>
            <div className='account-page-subtitle'>
              email:
            </div>
            <div className='account-page-maintitle'>
              Account
            </div>
          </div>
        </div>
        <div className='account-page-content'>
          <div className='account-page-content-title'>
            Your account
          </div>
          <div className='user-account-main-panel-container'>
            <UserAccountMainPanel/>
          </div>
        </div>
      </div>
    );
  }
  
  export default AccountPage;