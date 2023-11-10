import '../../css/Common/ImportCsvPanel.css'
import CloseButton from './CloseButton';

import { ImportCsvPanelVisibilityState } from '../../atoms/ImportCsvPanelVisbility';
import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import { UserTokenState } from '../../atoms/UserToken'

import { BankNames } from '../../enums';

import useFetchBudgetId from '../../hooks/useFetchBudgetId';

import { ChangeEvent, useEffect } from 'react';
import { useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import useFetchBankName from '../../hooks/useFetchBankName';



function ImportCsvPanel() {

  const [filePath, setFilePath] = useState("no file chosen");
  const budgetId = useFetchBudgetId();
  const token = useRecoilValue(UserTokenState);
  const setNewTransactions = useSetRecoilState(NewTransactionsState);
  const setImportCsvPanelVisibility = useSetRecoilState(ImportCsvPanelVisibilityState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);
  const bankName = useFetchBankName();
  const [bank, setBank] = useState<string>(bankName);
  const [file, setFile] = useState<File>();
  const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
  const formData = new FormData();

  useEffect(()=>{setBank(bankName)},[bankName]);

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    let pathElements = e.target.value.split('\\')
    let newPath = pathElements[pathElements.length - 1]
    newPath = newPath === "" ? "choose file" : newPath
    newPath = newPath.length >= 14 ? newPath.substring(0, 11) + "..." : newPath;
    setFilePath(newPath);
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  }


  function handleSubmit() {
    if (!file) {
      return;
    }
    formData.append('csvfile', file);
    console.log(bank);
    fetch(process.env.REACT_APP_API_URL + '/api/budgets/' + budgetId + '/transactions/csv?bank=' + bank, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setUpdater(!updater);
        setNewTransactions(data)
      })
    setImportCsvPanelVisibility(false);
    setImportCsvCheckPanelVisibility(true);
  }
  return (
    <div className="import-csv-panel">
      <div style={{padding: '0 30px 0 30px'}}>
        <CloseButton setVisibility={setImportCsvPanelVisibility}/>
      </div>
      <div className='title'>
        <div className='main-title'>
          Add transactions
        </div>
        <div className='subtitle'>
          Import Csv File
        </div>
      </div>
      <div className='main-content'>
        <form onSubmit={() => handleSubmit()}>
          <div className='bank-select-container'>
            <label>
              Select your bank:
            </label>
            <select value={bank} onChange={(e: any) => { setBank(e.target.value) }}>
              <option value={BankNames.Pko}>PKO BP</option>
              <option value={BankNames.Pekao}>Pekao</option>
              <option value={BankNames.Santander}>Santander Bank</option>
              <option value={BankNames.Ing}>ING Bank</option>
              <option value={BankNames.Mbank}>mBank</option>
              <option value={BankNames.Other}>Other</option>
            </select>
          </div>
          <div className='import-csv-container'>
            <label>
              Import csv file:
            </label>
            <div className='import-csv-button'>
              <input type="file" className='file-input' id='csv-import-input' style={{ display: 'none' }}
                onChange={(e) => { handleFileChange(e) }}></input>
              <label htmlFor='csv-import-input'>
                <div>
                  {filePath}
                </div>
              </label>
            </div>
          </div>
          <div className='next-button-container'>
            <input type="submit" className='next-button' value="Next" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImportCsvPanel;