import '../../css/SettingsPage/DeleteAccountConfirmationPanel.css'

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { DeleteAccountPanelVisibilityState } from '../../atoms/DeleteAccountPanelVisibility';
import { UserTokenState } from '../../atoms/UserToken';
import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';



function LogOutConfirmationPanel() {

    const setDeleteAccountPanelVisibility = useSetRecoilState(DeleteAccountPanelVisibilityState);
    const [token,setToken] = useRecoilState(UserTokenState);
    const [loginUpdater, setLoginUpdater] = useRecoilState(FullLoginUpdaterState);
    const navigate = useNavigate();


    function handleCancel()
    {
      setDeleteAccountPanelVisibility(false);
    }

    function handleConfirm()
    {
        fetch(process.env.REACT_APP_API_URL + '/api/users' , {
            method: 'DELETE',
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
              navigate('/');
            });
    }

    return (
      <div className="delete-account-confirmation-panel" data-testid="delete-account-confirmation-panel">
        <div className='title'>
          <div className='main-title'>
            Delete account
          </div>
          <div className='subtitle'>
            Are you sure you want to delete your account?
          </div>
        </div>
        <div className='delete-account-confirmation-panel-buttons'>
          <div className='cancel-button-container'>
            <button className='cancel-button' onClick={handleCancel}>Cancel</button>
          </div>
          <div className='delete-account-button-container'>
            <button className='delete-account-button' onClick={handleConfirm}>Delete Account</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LogOutConfirmationPanel;