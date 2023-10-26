import '../../css/SettingsPage/SettingsPage.css'
import AccountPage from './AccountPage';
import FriendsPage from './FriendsPage';
import NotificationsPage from './NotificationsPage';
import SettingsPageNavbar from './SettingsPageNavbar';
import {useState} from 'react';

function SettingsPage() {
    const [accountPageVisibility, setAccountPageVisibility] = useState(true);
    const [notificationsPageVisibility, setNotificationsPageVisibility] = useState(false);
    const [friendsPageVisibility, setFriendsPageVisibility] = useState(false);


    return (
      <div className="settings-page">i
        <SettingsPageNavbar setAccountPageVisibility={setAccountPageVisibility} setNotificationsPageVisibility={setNotificationsPageVisibility} setFriendsPageVisibility={setFriendsPageVisibility}/>
        {accountPageVisibility && <AccountPage/>}
        {notificationsPageVisibility && <NotificationsPage/>}
        {friendsPageVisibility && <FriendsPage/>}
      </div>
    );
  }
  
  export default SettingsPage;