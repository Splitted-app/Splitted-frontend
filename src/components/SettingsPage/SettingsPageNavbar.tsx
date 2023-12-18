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


  return (
      <div className="settings-page-navbar" data-testid="settings-page-navbar">
        <div className='settings-page-navbar-header'>
          <div className='old-menu-icon' onClick={()=>{setNavbarVisibility(true); setSettingsNavbarVisibility(false)}} data-testid="settings-page-navbar-change-icon">
            <img src={MenuIcon}></img>
          </div>
          <div data-testid="settings-page-navbar-header-title-and-icon">
            <NavbarItem name="Splitted" font="CeraPro bold" fontSize="25px" link="/home" icon={SplitIcon}></NavbarItem>
          </div>
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