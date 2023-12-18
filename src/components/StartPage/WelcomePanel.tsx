import '../../css/StartPage/WelcomePanel.css'

import { Link } from 'react-router-dom'

import startButton from '../../assets/images/start.svg';


function WelcomePanel() {
    return (
      <div className="welcome-panel">
        <div className='title'>
          <div className='title-text'>
          <span className="main-title-text" data-testid="start-page-slogan">
            Spend it, Track it,&nbsp;
          </span>
          <span className="subtitle-text" data-testid="start-page-title">
            Splitted
          </span>
          </div>
        </div>
        <div className='start-prompt'>
          <div className='label-container' data-testid="start-page-subtitle">
            Let's start
          </div>
          <div className='button-container'>
            <Link to="/register">
              <img className="start-button" src={startButton} data-testid="start-page-button"></img>
            </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default WelcomePanel;