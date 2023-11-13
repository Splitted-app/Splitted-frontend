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
import { FormInfo } from './FormInfo';



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

  const [errors, setErrors] = useState({
    invalidBankName: false,
    noFileProvided: false,
  });
  const [invalidRequestStatus, setInvalidRequestStatus] = useState<number>(0);

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

  function handleBankChange(e : any)
  {
    setBank(e.target.value);
    if (e.target.value === "Other")
      setErrors({...errors, invalidBankName: true});
    else 
      setErrors({...errors, invalidBankName: false})
  }

  function validateData(file : any)
  {
    let dataIsValid: boolean = true;

    // use `newErrors` to clear errors before validation
    // we cannot use `setErrors` because `errors` will not update until after
    // we finish executing handleSubmit
    let newErrors = {
      invalidBankName: false,
      noFileProvided: false,
    }

    if (bank === "Other")
    {
      newErrors.invalidBankName = true;
      dataIsValid = false
    }

    if (!file) {
      newErrors.noFileProvided = true;
      dataIsValid = false
    }
    setErrors(newErrors);
    
    return dataIsValid;
  }

  function handleSubmit(e : any) {
    e.preventDefault();

    setInvalidRequestStatus(0);
    if (!validateData(file))
      return;
    if (!file)
      return;
    
    formData.append('csvfile', file);
    fetch(process.env.REACT_APP_API_URL + '/api/budgets/' + budgetId + '/transactions/csv?bank=' + bank, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
      body: formData
    })
      .then(res => {
        if (!res.ok) {
          setInvalidRequestStatus(res.status);
          throw Error('could not fetch the data for that resource');
        }
        return res.json();
      })
      .then((data) => {
        setUpdater(!updater);
        setNewTransactions(data)
        setImportCsvPanelVisibility(false);
        setImportCsvCheckPanelVisibility(true);
      })
      .catch((err)=>{
        console.log(err)
      })
    
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
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className='bank-select-container'>
            <label>
              Select your bank:
            </label>
            <select value={bank} onChange={(e: any) => handleBankChange(e)}>
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
          <div className="form-error-container" 
            style={{ display: `${errors.noFileProvided ? "block" : "none"}`}}>
            {errors.noFileProvided && 
              <FormInfo message="Please provide a .csv file" details="" textColor="black"/>}
          </div>
          <div className="form-error-container" 
            style={{ display: `${invalidRequestStatus == 400 ? "block" : "none"}`}}>
            {invalidRequestStatus == 400 && 
              <FormInfo message="Uploaded csv isn't from selected bank." details="" textColor="black"/>}
          </div>
          <div className="form-error-container">
            {errors.invalidBankName &&
            <div className='invalid-bank-message'>
              Sorry, we only support this functionality with specified banks. But if you're from other bank don't worry, you can still add transactions manually.  
            </div>
            }
          </div>
          {/* <div className="form-error-container" 
            style={{ display: `${errors.invalidBankName ? "block" : "none"}`}}>
            {errors.invalidBankName && 
              <FormInfo message="Sorry, we only support this functionality with specified banks. But if you're from other bank don't worry, you can still add transactions manually." details="" textColor="darkgray" infoLevel={InfoLevel.None}/>}
          </div> */}
          <div className='next-button-container'>
            <input type="submit" className='next-button' value="Next" disabled={errors.invalidBankName}
              style={{backgroundColor: `${errors.invalidBankName ? "lightgray" : "#20F7C5"}`}}/>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ImportCsvPanel;