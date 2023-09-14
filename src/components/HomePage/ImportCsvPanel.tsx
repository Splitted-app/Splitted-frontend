import '../../css/HomePage/ImportCsvPanel.css'
import {useState} from 'react';

interface ImportCsvPanel{
  setImportCsvPanelVisible:Function;
  setImportCsvCheckPanelVisible: Function;
}

function ImportCsvPanel({setImportCsvPanelVisible, setImportCsvCheckPanelVisible} : ImportCsvPanel) {

  const [filePath, setFilePath] = useState("no file chosen");

  
  function handleFileChange(path : string)
  {
      let pathElements = path.split('\\')
      let newPath = pathElements[pathElements.length - 1]
      newPath = newPath === "" ? "no file chosen" : newPath
      setFilePath(newPath);
  }

  function handleButtonClicked()
  {
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
          <div className='bank-select-container'>
            <label>
              Select your bank:
            </label>
            <select>
              <option value="PKO BP">PKO BP</option>
              <option value="Pekao">Pekao</option>
              <option value="Santander Bank">Santander Bank</option>
              <option value="ING Bank">ING Bank</option>
              <option value="mBank">mBank</option>
              <option value="Other">Other</option>
              </select>
          </div>
          <div className='import-csv-container'>
              <label>
                Import csv file:
              </label>
              <div className='import-csv-button'>
                <input  type="file" className='file-input' id='csv-import-input' style={{display: 'none'}} 
                onChange={(e)=>{handleFileChange(e.target.value)}}></input>
                <label htmlFor='csv-import-input'>
                    <div>
                      {filePath}
                    </div>
                </label>
              </div>
          </div>
        </div>
        <div className='next-button-container'>
          <button className='next-button'  onClick={handleButtonClicked}>Next</button>
        </div>
      </div> 
    );
  }
  
  export default ImportCsvPanel;