import '../../css/Common/ImportCsvCheck.css'

import { useEffect, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import TransactionList from './TransactionList';

import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';


function ImportCsvCheck() {

  const [newTransactions, setNewTransactions] = useRecoilState(NewTransactionsState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);
  const [showDuplicatesMessage, setShowDuplicatesMessage] = useState<boolean>(false);

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
    <div className="import-csv-check">
      <div className='title'>
        Let's check
      </div>
      <div className='content-container'>
        { !showDuplicatesMessage && 
          <TransactionList 
            transactions={newTransactions} 
            shadow={false} 
            showTransactionType={true} 
            showDate={false} 
            showDeleteIcon={true} 
            showDeleteTransactionRadioButton={false}
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
        <button className='interaction-button' onClick={handleButtonClicked}>
          {showDuplicatesMessage ? "I Understand" : "Add"}
        </button>
      </div>
    </div>
  );
}
  
export default ImportCsvCheck;