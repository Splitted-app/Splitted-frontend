import '../../css/StartPage/WelcomePanel.css'
import { Link } from 'react-router-dom'


function WelcomePanel() {
    return (
      <div className="welcome-panel">
        <div className='title'>
          <div className='title-text'>
          <span style={{'fontFamily': 'Gotham Medium', 'fontSize': '72px'}}>
            Spend it, Track it,&nbsp;
          </span>
          <span style={{'fontFamily': 'Gotham Bold', 'fontSize': '92px'}}>
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
            <button></button>
          </Link>
          </div>
        </div>
      </div>
    );
  }
  
  export default WelcomePanel;