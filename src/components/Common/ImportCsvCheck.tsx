import '../../css/Common/ImportCsvCheck.css'
import TransactionList from './TransactionList';
import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';


function ImportCsvCheck() {

  const transactions = useRecoilValue(NewTransactionsState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);

  function handleButtonClicked()
  {
    setImportCsvCheckPanelVisibility(false);
  }

    return (
      <div className="import-csv-check">
        <div className='title'>
          Let's check
        </div>
        <div className='transactions-list-container'>
          <TransactionList transactions={transactions} shadow={false} showTransactionType={true} showDate={false} showDeleteIcon={true} showDeleteTransactionRadioButton={false}></TransactionList>
        </div>
        <div className='add-button-container'>
          <button className='add-button' onClick={handleButtonClicked}>Add</button>
        </div>
      </div>
    );
  }
  
  export default ImportCsvCheck;