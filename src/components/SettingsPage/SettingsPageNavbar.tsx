import '../../css/SettingsPage/SettingsPageNavbar.css'

import { useSetRecoilState } from 'recoil';

import NavbarItem from '../../components/Common/NavbarItem'
import SettingsPageNavbarItem from './SettingsPageNavbarItem';

import { DeleteAccountPanelVisibilityState } from '../../atoms/DeleteAccountPanelVisibility';
import { NavbarVisibilityState } from '../../atoms/NavbarVisibility';
import { SettingsNavbarVisibilityState } from '../../atoms/SettingsNavbarVisibility';

import DeleteAccountIcon from '../../assets/images/delete_account.png'
import MenuIcon from '../../assets/images/main-menu.png'
import SplitIcon from '../../assets/images/split.png'
import { useState } from 'react';


interface SettingsPageNavbarInterface
{
    setAccountPageVisibility:Function,
    setTrainAIPageVisibility:Function,
    setFriendsPageVisibility:Function;

}

function SettingsPageNavbar({setAccountPageVisibility,setTrainAIPageVisibility, setFriendsPageVisibility} : SettingsPageNavbarInterface) {
  
  const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);
  const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
  const setDeleteAccountPanelVisibility = useSetRecoilState(DeleteAccountPanelVisibilityState);

  const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);

  function handleExpandHideNavbar()
  {
    setNavbarExpanded(!navbarExpanded);
  }


  return (
      <div className={`settings-page-navbar ${navbarExpanded ? "settings-page-navbar-mini-expanded" : ""}`} 
          data-testid="settings-page-navbar">
        <div className='settings-page-navbar-header' data-testid="settings-page-navbar-header-title-and-icon">
          <div className='old-menu-icon' onClick={()=>{setNavbarVisibility(true); setSettingsNavbarVisibility(false)}} data-testid="settings-page-navbar-change-icon">
            <img src={MenuIcon}></img>
          </div>
          <a style={{cursor: "pointer"}} onClick={handleExpandHideNavbar}>
            <div className="navbar-item">
              <div className='icon'>
                <img src={SplitIcon}></img>
              </div>
              <div className='text' style={{fontFamily: 'CeraPro bold', fontSize: "25px"}}>
                  Splitted
              </div>
            </div>
          </a>
        </div>
        <div className='settings-page-navbar-main-content'>
          <div className='settings-page-navbar-main-content-title'>
            Settings
          </div>
          <div className='settings-page-navbar-subsides'>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(true); setFriendsPageVisibility(false); setTrainAIPageVisibility(false)}} data-testid="settings-page-navbar-account-page-button">
              <SettingsPageNavbarItem title="Account"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setFriendsPageVisibility(false); setTrainAIPageVisibility(true)}} data-testid="settings-page-navbar-ai-model-page-button">
              <SettingsPageNavbarItem title="AI Model"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setFriendsPageVisibility(true); setTrainAIPageVisibility(false)}} data-testid="settings-page-navbar-friends-page-button">
              <SettingsPageNavbarItem title="Friends"/>
            </button>
          </div>
        </div>
        <div className='settings-page-navbar-footer'  onClick={(e)=>{setDeleteAccountPanelVisibility(true);}} data-testid="delete-account-button">
          <div className='delete-account-icon'>
            <img src={DeleteAccountIcon}></img>
          </div>
          <div className='settings-page-navbar-footer-text'>
            Delete account
          </div>
        </div>
      </div>
    );
  }
  
  export default SettingsPageNavbar;