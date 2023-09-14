import '../../css/HomePage/AddTransactionsPanel.css';

interface AddTransactionsPanel
{
  setAddTransactionsPanelVisible: Function;
  setImportCsvPanelVisible:Function;
  setManualAddTransactionPanelVisible: Function;
}


function AddTransactionsPanel({setAddTransactionsPanelVisible, setImportCsvPanelVisible, setManualAddTransactionPanelVisible}:AddTransactionsPanel) {

  function handleImportCsvButtonClick()
  {
    setAddTransactionsPanelVisible(false);
    setImportCsvPanelVisible(true);
  }

  function handleManualButtonClick()
  {
    setAddTransactionsPanelVisible(false);
    setManualAddTransactionPanelVisible(true);
  }

    return (
      <div className="add-transactions-panel">
        <div className='title'>
          <div className='main-title'>
            Add transactions
          </div>
          <div className='subtitle'>
            Choose how you want to add transactions
          </div>
        </div>
        <div className='buttons-container'>
          <div className='import-csv-container'>
            <div className='import-csv-button'>
              <button className='button' onClick={handleImportCsvButtonClick}>Import Csv</button>
            </div>
            <div className='description'>
              Import data from your bank to Splitted. 
              Splitted will automatically initially categorise tranactions for you.
            </div>
          </div>
          <div className='manual-add-container'>
            <div className='manual-add-button'>
              <button className='button' onClick={handleManualButtonClick} >Add one manually</button>
            </div>
            <div className='description'>
              Add your transactions manually to Splitted and yourself fill out all information.
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default AddTransactionsPanel;