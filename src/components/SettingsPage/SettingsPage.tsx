import '../../css/SettingsPage/SettingsPage.css'
import Navbar from '../Common/Navbar';
import AccountPage from './AccountPage';
import FriendsPage from './FriendsPage';
import NotificationsPage from './NotificationsPage';
import SettingsPageNavbar from './SettingsPageNavbar';
import {useState, useEffect} from 'react';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { NavbarVisibilityState } from '../../atoms/NavbarVisibility';
import { SettingsNavbarVisibilityState } from '../../atoms/SettingsNavbarVisibility';

function SettingsPage() {
    const [accountPageVisibility, setAccountPageVisibility] = useState(true);
    const [notificationsPageVisibility, setNotificationsPageVisibility] = useState(false);
    const [friendsPageVisibility, setFriendsPageVisibility] = useState(false);
    const navbarVisibility = useRecoilValue(NavbarVisibilityState);
    const settingsNavbarVisibility = useRecoilValue(SettingsNavbarVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
    const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);

    useEffect(()=>
    {
      setMenuIconVisibility(true);
      setSettingsNavbarVisibility(true);
      setNavbarVisibility(false);
    },[]);

    return (
      <div className="settings-page">
        {navbarVisibility && <Navbar/>}
        {settingsNavbarVisibility && <SettingsPageNavbar setAccountPageVisibility={setAccountPageVisibility} setNotificationsPageVisibility={setNotificationsPageVisibility} setFriendsPageVisibility={setFriendsPageVisibility}/>}
        {accountPageVisibility && <AccountPage/>}
        {notificationsPageVisibility && <NotificationsPage/>}
        {friendsPageVisibility && <FriendsPage/>}
      </div>
    );
  }
  
  export default SettingsPage;