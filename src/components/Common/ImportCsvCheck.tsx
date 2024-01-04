import '../../css/Common/ImportCsvCheck.css'

import { useEffect, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import TransactionList from './TransactionList';

import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import api from '../../services/api';

function ImportCsvCheck() {

  const [newTransactions, setNewTransactions] = useRecoilState(NewTransactionsState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);
  const [showDuplicatesMessage, setShowDuplicatesMessage] = useState<boolean>(false);
  const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);

  function handleButtonClicked()
  {
    if (showDuplicatesMessage)
    {
      setShowDuplicatesMessage(false);
    }
    else
    {
      setImportCsvCheckPanelVisibility(false);
      setNewTransactions([]);

    }
  }

  function handleCancelButtonClicked()
  {

    const transactionsToDeleteIds: Array<string> = [] 
    newTransactions.map(((transaction:any)=>{
      transactionsToDeleteIds.push(transaction.id);
    }
    ));


    api.delete('/api/transactions/' + transactionsToDeleteIds.join('/'))
    .then(res => {
      setUpdater(!updater);
      setImportCsvCheckPanelVisibility(false);
      setNewTransactions([]);
    })
    .catch(error=>{
      console.error(error);
    })
  }

  useEffect(() => {
    for (var i = 0; i < newTransactions.length; i++) {
      const transaction : any = newTransactions[i];
      if (transaction.duplicatedTransaction)
      {
        setShowDuplicatesMessage(true);
        break;
      }
    }
  }, [])

  return (
    <div className="import-csv-check" data-testid="import-csv-check-panel">
      <div className='title'>
        Let's check
      </div>
      <div className='content-container'>
        { !showDuplicatesMessage && 
          <TransactionList 
            transactions={newTransactions} 
            shadow={false}
            showUser={false}
            showTransactionType={true} 
            showDate={false} 
            showDeleteIcon={true} 
            showCheckbox={false}
            showEditButton={true}
            showSplitItIcon = {false}
            markDuplicates={true}></TransactionList>
        }
        { showDuplicatesMessage &&
        <div style={{textAlign: 'center', paddingRight: '10px', fontSize: '14pt'}}>
          It appears that some of the transactions you want to upload
          are duplicates of other, already existing transactions.
          These transactions will be marked with a red colour to help you 
          distinguish them and decide whether to keep them or not.
        </div>
          
        }
      </div>
      <div className='button-container'>
        {!showDuplicatesMessage && <button className='cancel-button' onClick={handleCancelButtonClicked} data-testid="import-csv-check-panel-cancel-button">
          Cancel
        </button>}
        <button className='interaction-button' onClick={handleButtonClicked} data-testid="import-csv-check-panel-add-button">
          {showDuplicatesMessage ? "I Understand" : "Add"}
        </button>
      </div>
    </div>
  );
}
  
export default ImportCsvCheck;