import '../../css/SettingsPage/AccountPage.css'

import UserAccountMainPanel from './UserAccoutMainPanel';
import UserAccountPanel from './UserAccountPanel';

import useFetchUser from '../../hooks/useFetchUser';
import { useEffect } from 'react';

function AccountPage() {
    const user = useFetchUser();
    
    return (
      <div className="account-page" data-testid="account-page">
        <div className='account-page-header'>
          <div className='user-panel'>
            <UserAccountPanel username={user.data.username} avatarImage={user.data.avatarImage}/>
          </div>
          <div className='account-page-title'>
            <div className='account-page-subtitle'>
              {user.data.email}
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
            <UserAccountMainPanel data={user.data} loading={user.loading} error={user.error}/>
          </div>
        </div>
      </div>
    );
  }
  
  export default AccountPage;