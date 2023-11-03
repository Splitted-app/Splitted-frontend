import '../../css/SettingsPage/SettingsPageNavbar.css'
import DeleteAccountIcon from '../../assets/images/delete_account.png'
import SettingsPageNavbarItem from './SettingsPageNavbarItem';
import MenuIcon from '../../assets/images/main-menu.png'
import SplitIcon from '../../assets/images/split.png'
import { SettingsNavbarVisibilityState } from '../../atoms/SettingsNavbarVisibility';
import { NavbarVisibilityState } from '../../atoms/NavbarVisibility';
import { useSetRecoilState } from 'recoil';
import NavbarItem from '../../components/Common/NavbarItem'
interface SettingsPageNavbarInterface
{
  setAccountPageVisibility:Function,
  setNotificationsPageVisibility:Function,
  setFriendsPageVisibility:Function;

}

function SettingsPageNavbar({setAccountPageVisibility, setNotificationsPageVisibility, setFriendsPageVisibility} : SettingsPageNavbarInterface) {
  
  const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);
  const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
  
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
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(true); setNotificationsPageVisibility(false); setFriendsPageVisibility(false)}}>
              <SettingsPageNavbarItem title="Account"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setNotificationsPageVisibility(true); setFriendsPageVisibility(false)}}>
              <SettingsPageNavbarItem title="Notifications"/>
            </button>
            <button className='settings-page-navbar-subsides-button' onClick={(e)=>{setAccountPageVisibility(false); setNotificationsPageVisibility(false); setFriendsPageVisibility(true)}}>
              <SettingsPageNavbarItem title="Friends"/>
            </button>
          </div>
        </div>
        <div className='settings-page-navbar-footer'>
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