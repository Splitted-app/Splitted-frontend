import '../../css/Common/ImportCsvPanel.css'

import { ChangeEvent, useEffect, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import CloseButton from './CloseButton';
import FormInfo  from './FormInfo';
import LoadingPanel from './LoadingPanel';

import { ImportCsvPanelVisibilityState } from '../../atoms/ImportCsvPanelVisbility';
import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { NewTransactionsState } from '../../atoms/NewTransactions';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';

import useFetchBudgetId from '../../hooks/useFetchBudgetId';

import { BankNames } from '../../enums';
import api from '../../services/api';
import useFetchMyBudget from '../../hooks/useFetchMyBudget';



function ImportCsvPanel() {

  const [filePath, setFilePath] = useState("no file chosen");
  const budgetId = useFetchBudgetId();
  const setNewTransactions = useSetRecoilState(NewTransactionsState);
  const setImportCsvPanelVisibility = useSetRecoilState(ImportCsvPanelVisibilityState);
  const setImportCsvCheckPanelVisibility = useSetRecoilState(ImportCsvCheckPanelVisibilityState);
  const myBudget = useFetchMyBudget();
  const [bank, setBank] = useState<string>(myBudget.data.bank);
  const [file, setFile] = useState<File>();
  const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
  const formData = new FormData();

  const [errors, setErrors] = useState({
    invalidBankName: false,
    noFileProvided: false,
  });
  const [invalidRequestStatus, setInvalidRequestStatus] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<boolean>(false);

  useEffect(()=>{setBank(myBudget.data.bank)},[myBudget.data.bank]);

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
    setLoading(true);
    setUploadError(false);
    api.post('/api/budgets/' + budgetId + '/transactions/csv?bank=' + bank, formData,
    {
      headers: { "Content-Type": "multipart/form-data" }
    })
      .then((res) => {
        setUpdater(!updater);
        setNewTransactions(res.data)
        setImportCsvPanelVisibility(false);
        setImportCsvCheckPanelVisibility(true);
        setLoading(false)
      })
      .catch((error)=>{
        console.error(error)
        setUploadError(true);
        setLoading(false);
      })
    
  }
  return (
    <div className="import-csv-panel" data-testid="import-csv-panel">
      <div className='close-button-container'>
        <CloseButton setVisibility={setImportCsvPanelVisibility}/>
      </div>
      <div className='title'>
        <div className='main-title' data-testid="import-csv-panel-main-title">
          Add transactions
        </div>
        <div className='subtitle' data-testid="import-csv-panel-subtitle">
          Import Csv File
        </div>
      </div>
      <div className='main-content' >
        <form onSubmit={(e) => handleSubmit(e)} data-testid="import-csv-panel-form">
          <div className='bank-select-container'>
            <label>
              Select your bank:
            </label>
            <select value={bank} onChange={(e: any) => handleBankChange(e)} data-testid="import-csv-panel-bank-select">
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
                onChange={(e) => { handleFileChange(e) }} data-testid="import-csv-panel-file-input"></input>
              <label htmlFor='csv-import-input'>
                <div className='filename'>
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
          {
            loading
          }
          {
            (!loading || uploadError) && 
            <div className='next-button-container'>
              <input type="submit" className='next-button' value={uploadError ? "Try Again" : "Next"} disabled={errors.invalidBankName}
                style={{backgroundColor: `${errors.invalidBankName ? "lightgray" : "#20F7C5"}`}} data-testid="import-csv-panel-next-button"/>
            </div>
          }
          {
            loading && !uploadError &&
            <LoadingPanel error={uploadError} color={"black"}/>
          }
          
        </form>
      </div>
    </div>
  );
}

export default ImportCsvPanel;