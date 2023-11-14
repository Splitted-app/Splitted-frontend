import '../../css/SettingsPage/NotificationsPage.css'

import ToggleButton from './ToggleButton';


function NotificationsPage() {
    return (
      <div className="notifications-page">
        <div className='notifications-page-header'>
          <div className='notifications-page-title'>
              Notifications
          </div>
        </div>
        <div className='notifications-page-content'>
          <div className='toggle-buttons-container'>
            <div className='toggle-button-class'>
              <div className='toggle-button-class-title'>
                Reminders:
              </div>
              <ToggleButton text={"Get email notifications about upcoming payments"}/>
            </div>
            <div className='toggle-button-class'>
              <div className='toggle-button-class-title'>
                Family mode:
              </div>
              <ToggleButton text={"Get email notifications about activity in your family mode"}/>
            </div>            
            <div className='toggle-button-class'>
              <div className='toggle-button-class-title'>
                Partners mode:
              </div>
              <ToggleButton text={"Get email notifications about activity in your partner mode"}/>
            </div>
            <div className='toggle-button-class'>
              <div className='toggle-button-class-title'>
                Party mode:
              </div>
              <ToggleButton text={"Get email notifications about activity in your party mode"}/>
            </div>
            <div className='toggle-button-class'>
              <div className='toggle-button-class-title'>
                Friends:
              </div>
              <ToggleButton text={"Get email notifications about friends invites"}/>
              <ToggleButton text={"Get email notifications about friendship acceptances"}/>            
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default NotificationsPage;