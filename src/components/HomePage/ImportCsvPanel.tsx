import '../../css/HomePage/ImportCsvPanel.css'
import { BudgetIdState } from '../../atoms/BudgetId';
import {useState} from 'react';
import { useRecoilValue } from 'recoil';
import {UserTokenState} from '../../atoms/UserToken'
import { ChangeEvent } from 'react';


interface ImportCsvPanel{
  setImportCsvPanelVisible:Function;
  setImportCsvCheckPanelVisible: Function;
}

function ImportCsvPanel({setImportCsvPanelVisible, setImportCsvCheckPanelVisible} : ImportCsvPanel) {

  const [filePath, setFilePath] = useState("no file chosen");
  const budgetId = useRecoilValue(BudgetIdState);
  const token = useRecoilValue(UserTokenState);
  const [bank, setBank] = useState("Pekao");
  const [file,setFile] = useState<File>();
  const formData = new FormData();
  
  function handleFileChange(e: ChangeEvent<HTMLInputElement>)
  {
      let pathElements = e.target.value.split('\\')
      let newPath = pathElements[pathElements.length - 1]
      newPath = newPath === "" ? "no file chosen" : newPath
      setFilePath(newPath);
      if (e.target.files) {
        setFile(e.target.files[0]);
      }   
  }
  

  function handleSubmit()
  {
    if (!file) {
      return;
    }
    formData.append('csvfile', file);
    fetch('https://localhost:7012/api/budgets/' + budgetId + '/transactions/csv?bank=' + bank,{
      method: 'POST',
      headers: { 
          'Authorization' : `Bearer ${token}`,
      },
      body: formData
      })
      .then(res=>{
          if(!res.ok)
          {
              throw Error('could not fetch the data for that resource');
          }
          return res.json();
      })
      .then((data)=>{
        console.log(data);
      })
    setImportCsvPanelVisible(false);
    setImportCsvCheckPanelVisible(true);
  }
    return (
      <div className="import-csv-panel">
        <div className='title'>
          <div className='main-title'>
            Add transactions
          </div>
          <div className='subtitle'>
            Import Csv File
          </div>
        </div>
        <div className='main-content'>
          <form onSubmit={()=>handleSubmit()}>
            <div className='bank-select-container'>
              <label>
                Select your bank:
              </label>
              <select onSelect={(e:any) => {setBank(e.target.value)}}>
                <option value="Pko">PKO BP</option>
                <option value="Pekao">Pekao</option>
                <option value="Santander">Santander Bank</option>
                <option value="Ing">ING Bank</option>
                <option value="Mbank">mBank</option>
                <option value="Other">Other</option>
                </select>
            </div>
            <div className='import-csv-container'>
                <label>
                  Import csv file:
                </label>
                <div className='import-csv-button'>
                  <input  type="file" className='file-input' id='csv-import-input' style={{display: 'none'}} 
                  onChange={(e)=>{handleFileChange(e)}}></input>
                  <label htmlFor='csv-import-input'>
                      <div>
                        {filePath}
                      </div>
                  </label>
                </div>
            </div>
            <div className='next-button-container'>
              <input type="submit" className='next-button' value="Next"/>
            </div>
          </form>
        </div>
      </div> 
    );
  }
  
  export default ImportCsvPanel;