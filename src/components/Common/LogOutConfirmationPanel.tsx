import '../../css/Common/LogOutConfirmationPanel.css';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { LogOutPanelVisibilityState } from '../../atoms/LogOutPanelVisibility';
import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';
import api from '../../services/api';




function LogOutConfirmationPanel() {

    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const [loginUpdater, setLoginUpdater] = useRecoilState(FullLoginUpdaterState);
    const navigate = useNavigate();


    function handleCancel()
    {
      setLogOutPanelVisibility(false);
    }

    function handleConfirm()
    {
      api.post('/api/users/revoke', {
        method: 'POST',
      })
        .then(res => {
          setLoginUpdater(0);
          localStorage.setItem("token", "")
          // setToken("");
          setLogOutPanelVisibility(false);
          navigate('/');
        })
        .catch(error=>{
          console.error(error);
        });

    }

    return (
      <div className="log-out-confirmation-panel" data-testid="log-out-confirmation-panel">
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
            <button className='cancel-button' onClick={handleCancel} data-testid="log-out-confirmation-panel-cancel-button">Cancel</button>
          </div>
          <div className='log-out-button-container'>
            <button className='log-out-button' onClick={handleConfirm}>Log Out</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LogOutConfirmationPanel;