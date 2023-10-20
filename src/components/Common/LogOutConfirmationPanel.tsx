import '../../css/Common/LogOutConfirmationPanel.css';


function LogOutConfirmationPanel() {
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
            <button className='cancel-button'>Cancel</button>
          </div>
          <div className='log-out-button-container'>
            <button className='log-out-button'>Log Out</button>
          </div>
        </div>
      </div>
    );
  }
  
  export default LogOutConfirmationPanel;