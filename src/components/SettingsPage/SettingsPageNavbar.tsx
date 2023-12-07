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
      <div className="settings-page-navbar">
        <div className='settings-page-navbar-header'>
          <div className='old-menu-icon' onClick={()=>{setNavbarVisibility(true); setSettingsNavbarVisibility(false)}}>
            <img src={MenuIcon}></img>
          </div>
          <NavbarItem name="Splitted" font="CeraPro bold" fontSize="25px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className='settings-page-navbar-main-content'>
          <div className='settings-page-navbar-main-content-title'>
            Settings
          </div>
          <div className='settings-page-navbar-subsides'>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(true); setFriendsPageVisibility(false); setTrainAIPageVisibility(false)}}>
              <SettingsPageNavbarItem title="Account"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setFriendsPageVisibility(false); setTrainAIPageVisibility(true)}}>
              <SettingsPageNavbarItem title="AI Model"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setFriendsPageVisibility(true); setTrainAIPageVisibility(false)}}>
              <SettingsPageNavbarItem title="Friends"/>
            </button>
          </div>
        </div>
        <div className='settings-page-navbar-footer'  onClick={(e)=>{setDeleteAccountPanelVisibility(true);}}>
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