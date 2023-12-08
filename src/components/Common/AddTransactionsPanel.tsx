import '../../css/Common/AddTransactionsPanel.css';

import { useSetRecoilState } from 'recoil';

import CloseButton from './CloseButton';

import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import { ImportCsvPanelVisibilityState } from '../../atoms/ImportCsvPanelVisbility';
import { ManualAddTransactionsPanelVisibilityState } from '../../atoms/ManualAddTransactionsPanelVisbility';


function AddTransactionsPanel() {

  const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);
  const setImportCsvPanelVisibility = useSetRecoilState(ImportCsvPanelVisibilityState);
  const setManualAddTransactionsPanelVisibility = useSetRecoilState(ManualAddTransactionsPanelVisibilityState); 

  function handleImportCsvButtonClick()
  {
    setAddTransactionsPanelVisibility(false);
    setImportCsvPanelVisibility(true);
  }

  function handleManualButtonClick()
  {
    setAddTransactionsPanelVisibility(false);
    setManualAddTransactionsPanelVisibility(true);
  }

    return (
      <div className="add-transactions-panel">
        <div className="close-button-container">
          <CloseButton setVisibility={setAddTransactionsPanelVisibility}/>
        </div>
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