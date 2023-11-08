import '../../css/StartPage/WelcomePanel.css'

import startButton from '../../assets/images/start.svg';

import { Link } from 'react-router-dom'

function WelcomePanel() {
    return (
      <div className="welcome-panel">
        <div className='title'>
          <div className='title-text'>
          <span className="main-title-text">
            Spend it, Track it,&nbsp;
          </span>
          <span className="subtitle-text">
            Splitted
          </span>
          </div>
        </div>
        <div className='start-prompt'>
          <div className='label-container'>
            Let's start
          </div>
          <div className='button-container'>
            <Link to="/register">
              <img className="start-button" src={startButton}></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default WelcomePanel;