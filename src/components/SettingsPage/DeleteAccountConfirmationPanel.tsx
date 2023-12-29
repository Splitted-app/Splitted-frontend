import '../../css/SettingsPage/DeleteAccountConfirmationPanel.css'

import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

import { DeleteAccountPanelVisibilityState } from '../../atoms/DeleteAccountPanelVisibility';
import { FullLoginUpdaterState } from '../../atoms/FullLoginUpdater';
import api from '../../services/api';



function DeleteAccountConfirmationPanel() {

    const setDeleteAccountPanelVisibility = useSetRecoilState(DeleteAccountPanelVisibilityState);
    const [loginUpdater, setLoginUpdater] = useRecoilState(FullLoginUpdaterState);
    const navigate = useNavigate();


    function handleCancel()
    {
      setDeleteAccountPanelVisibility(false);
    }

    function handleConfirm()
    {
        api.delete('/api/users')
        .then(res => {
          setLoginUpdater(0);
          localStorage.setItem("token", "");
          // setToken("");
          navigate('/');
        })
        .catch(error=>{
          console.error(error);
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
  
  export default DeleteAccountConfirmationPanel;