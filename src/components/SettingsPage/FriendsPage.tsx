import '../../css/SettingsPage/FriendsPage.css'

import FriendsPanel from './FriendsPanel';

import FriendsIcon from '../../assets/images/friends_settings.png'



function FriendsPage() {
    return (
      <div className="friends-page" data-testid="friends-page">
        <div className='friends-page-header'>
          <div className='friends-page-icon'>
            <img src={FriendsIcon}></img>
          </div>
          <div className='friends-page-title'>
              Friends
          </div>
        </div>
        <div className='friends-page-content'>
          <div className='friends-page-content-title'>
            Your friends
          </div>
          <div className='friends-panel-container'>
            <FriendsPanel/>
          </div>
        </div>
      </div>
    );
  }
  
  export default FriendsPage;