import '../../css/HomePage/ImportCsvCheck.css'
import TransactionList from '../Common/TransactionList';

interface ImportCsvCheck{
  setImportCsvCheckPanelVisible: Function;
}

function ImportCsvCheck({setImportCsvCheckPanelVisible}:ImportCsvCheck) {

  function handleButtonClicked()
  {
    setImportCsvCheckPanelVisible(false);
  }

    return (
      <div className="import-csv-check">
        <div className='title'>
          Let's check
        </div>
        <div className='transactions-list'>
        </div>
        <div className='add-button-container'>
          <button className='add-button' onClick={handleButtonClicked}>Add</button>
        </div>
      </div>
    );
  }
  
  export default ImportCsvCheck;