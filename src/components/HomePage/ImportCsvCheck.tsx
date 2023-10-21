import '../../css/HomePage/ImportCsvCheck.css'
import TransactionList from '../Common/TransactionList';
import { useRecoilValue } from 'recoil';
import { NewTransactionsState } from '../../atoms/NewTransactions';

interface ImportCsvCheck{
  setImportCsvCheckPanelVisible: Function;
}

function ImportCsvCheck({setImportCsvCheckPanelVisible}:ImportCsvCheck) {

  const transactions = useRecoilValue(NewTransactionsState);

  function handleButtonClicked()
  {
    setImportCsvCheckPanelVisible(false);
  }

    return (
      <div className="import-csv-check">
        <div className='title'>
          Let's check
        </div>
        <div className='transactions-list-container'>
          <TransactionList transactions={transactions} shadow={false}></TransactionList>
        </div>
        <div className='add-button-container'>
          <button className='add-button' onClick={handleButtonClicked}>Add</button>
        </div>
      </div>
    );
  }
  
  export default ImportCsvCheck;