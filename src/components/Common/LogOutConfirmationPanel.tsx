import '../../css/Common/LogOutConfirmationPanel.css';

import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilState } from 'recoil';

import { LogOutPanelVisibilityState } from '../../atoms/LogOutPanelVisibility';
import { UserTokenState } from '../../atoms/UserToken';
import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';




function LogOutConfirmationPanel() {

    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const [token,setToken] = useRecoilState(UserTokenState);
    const [loginUpdater, setLoginUpdater] = useRecoilState(FullLoginUpdaterState);
    const navigate = useNavigate();


    function handleCancel()
    {
      setLogOutPanelVisibility(false);
    }

    function handleConfirm()
    {
      fetch(process.env.REACT_APP_API_URL + '/api/users/revoke', {
        method: 'POST',
        headers: {
          'Accept': '*',
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
  
        }
      })
        .then(res => {
          if (!res.ok) {
            throw Error('could not fetch the data for that resource');
          }
          setLoginUpdater(0);
          setToken("");
          setLogOutPanelVisibility(false);
          navigate('/');
        });

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