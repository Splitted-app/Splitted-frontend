import '../../css/ModePages/DebtPanel.css';




function DebtPanel() {
    const amount = -500;
    return (
      <div className="debt-panel">
        <div className='debt-panel-title'>
            Debt:
        </div>
        <div className='debt-panel-main-content' style={{color:(amount<0)? '#A30D0D': '#35B736'}}>
            <div className='debt-panel-amount'>
                {amount}
            </div>
            <div className='debt-panel-currency'>
                pln
            </div>
        </div>
      </div>
    );
  }
  
  export default DebtPanel;