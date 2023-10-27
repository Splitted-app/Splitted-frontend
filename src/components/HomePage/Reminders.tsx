import '../../css/HomePage/Reminders.css'
import CurrentReminder from './CurrentReminder';
import NotificationIcon from '../../assets/images/notification-bell.png'
import UpArrowIcon from '../../assets/images/notif_uparrow.svg'
import DownArrowIcon from '../../assets/images/notif_downarrow.svg'


function Reminders() {
    return (
      <div className="reminders">
        <div className='up-arrow'>
          <img src={UpArrowIcon}></img>
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
          <img src={DownArrowIcon}></img>
        </div>
      </div>
    );
  }
  
  export default Reminders;