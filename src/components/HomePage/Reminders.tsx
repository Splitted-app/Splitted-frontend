import '../../css/HomePage/Reminders.css'
import CurrentReminder from './CurrentReminder';
import NotificationIcon from '../../assets/images/notification-bell.png'


function Reminders() {
    return (
      <div className="reminders">
        <div className='up-arrow'>
        </div>
        <div className='content'>
          <div className='icon'>
            <img src={NotificationIcon}></img>
          </div>
          <div className='reminder-text'>
            <CurrentReminder></CurrentReminder>
          </div>
        </div>
        <div className='down-arrow'>
        </div>
      </div>
    );
  }
  
  export default Reminders;