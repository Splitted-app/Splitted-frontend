import '../../css/Common/LogOutConfirmationPanel.css';
import { useSetRecoilState } from 'recoil';
import { LogOutPanelVisibilityState } from '../../atoms/LogOutPanelVisibility';
import { UserTokenState } from '../../atoms/UserToken';
import {useNavigate} from 'react-router-dom';

function LogOutConfirmationPanel() {

    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const setToken = useSetRecoilState(UserTokenState)
    const navigate = useNavigate();


    function handleCancel()
    {
      setLogOutPanelVisibility(false);
    }

    function handleConfirm()
    {
      setToken("");
      setLogOutPanelVisibility(false);
      navigate('/');
    }

    return (
      <div className="log-out-confirmation-panel">
        <div className='title'>
          <div className='main-title'>
            Log Out
          </div>
          <div className='subtitle'>
            Are you sure you want to log out?
          </div>
        </div>
        <div className='log-out-confirmation-panel-buttons'>
          <div className='cancel-button-container'>
            <button className='cancel-button' onClick={handleCancel}>Cancel</button>
          </div>
          <div className='log-out-button-container'>
            <button className='log-out-button' onClick={handleConfirm}>Log Out</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LogOutConfirmationPanel;