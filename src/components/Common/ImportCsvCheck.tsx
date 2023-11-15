import '../../css/Common/ImportCsvCheck.css'

import { useRecoilState, useSetRecoilState } from 'recoil';

import TransactionList from './TransactionList';

import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';



function ImportCsvCheck() {

  const [newTransactions, setNewTransactions] = useRecoilState(NewTransactionsState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);

  function handleButtonClicked()
  {
    setImportCsvCheckPanelVisibility(false);
    setNewTransactions([]);
  }

    return (
      <div className="import-csv-check">
        <div className='title'>
          Let's check
        </div>
        <div className='transactions-list-container'>
          <TransactionList transactions={newTransactions} shadow={false} showTransactionType={true} showDate={false} showDeleteIcon={true} showDeleteTransactionRadioButton={false}></TransactionList>
        </div>
        <div className='add-button-container'>
          <button className='add-button' onClick={handleButtonClicked}>Add</button>
        </div>
      </div>
    );
  }
  
  export default ImportCsvCheck;