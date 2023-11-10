import '../../css/SettingsPage/SettingsPage.css'

import AccountPage from './AccountPage';
import FriendsPage from './FriendsPage';
import Navbar from '../Common/Navbar';
import NotificationsPage from './NotificationsPage';
import SettingsPageNavbar from './SettingsPageNavbar';
import DeleteAccountConfirmationPanel from './DeleteAccountConfirmationPanel'

import { DeleteAccountPanelVisibilityState } from '../../atoms/DeleteAccountPanelVisibility';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import { NavbarVisibilityState } from '../../atoms/NavbarVisibility';
import { SettingsNavbarVisibilityState } from '../../atoms/SettingsNavbarVisibility';

import {useState, useEffect} from 'react';
import { useSetRecoilState, useRecoilValue , useRecoilState} from 'recoil';


function SettingsPage() {
    const [accountPageVisibility, setAccountPageVisibility] = useState(true);
    const [notificationsPageVisibility, setNotificationsPageVisibility] = useState(false);
    const [friendsPageVisibility, setFriendsPageVisibility] = useState(false);
    const navbarVisibility = useRecoilValue(NavbarVisibilityState);
    const settingsNavbarVisibility = useRecoilValue(SettingsNavbarVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
    const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);
    const [deleteAccountPanelVisibility, setDeleteAccountPanelVisibility] = useRecoilState(DeleteAccountPanelVisibilityState);


    useEffect(()=>
    {
      setMenuIconVisibility(true);
      setSettingsNavbarVisibility(true);
      setNavbarVisibility(false);
      setDeleteAccountPanelVisibility(false);
    },[]);

    return (
      <div className="settings-page">
      <div className='settings-page-content' style={{filter:(deleteAccountPanelVisibility)?'brightness(50%)': 'brightness(100%'}}>
        {navbarVisibility && <Navbar/>}
        {settingsNavbarVisibility && <SettingsPageNavbar setAccountPageVisibility={setAccountPageVisibility} setNotificationsPageVisibility={setNotificationsPageVisibility} setFriendsPageVisibility={setFriendsPageVisibility}/>}
        {accountPageVisibility && <AccountPage/>}
        {notificationsPageVisibility && <NotificationsPage/>}
        {friendsPageVisibility && <FriendsPage/>}
      </div>
        <div className='settings-page-popup' style={{'display': deleteAccountPanelVisibility ? 'flex' : 'none'}}>
          {deleteAccountPanelVisibility && <DeleteAccountConfirmationPanel/>}
        </div>
      </div>
    );
  }
  
  export default SettingsPage;