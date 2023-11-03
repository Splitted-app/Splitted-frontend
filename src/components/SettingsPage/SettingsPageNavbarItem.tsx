import '../../css/SettingsPage/SettingsPageNavbarItem.css'


interface SettingsPageNavbarItemInterface
{
  title:string
}

function SettingsPageNavbarItem({title} :SettingsPageNavbarItemInterface) {
    return (
      <div className="settings-page-navbar-item">
        <div className='settings-page-navbar-item-text'>
          {title}
        </div>
      </div>
    );
  }
  
  export default SettingsPageNavbarItem;