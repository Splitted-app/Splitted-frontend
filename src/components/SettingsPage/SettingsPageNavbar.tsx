import '../../css/SettingsPage/SettingsPageNavbar.css'


interface SettingsPageNavbarInterface
{
  setAccountPageVisibility:Function,
  setNotificationsPageVisibility:Function,
  setFriendsPageVisibility:Function;
}

function SettingsPageNavbar({setAccountPageVisibility, setNotificationsPageVisibility, setFriendsPageVisibility} : SettingsPageNavbarInterface) {
    return (
      <div className="settings-page-navbar">
        
      </div>
    );
  }
  
  export default SettingsPageNavbar;