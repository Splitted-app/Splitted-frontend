import '../../css/HomePage/ManualAddTransactionPanel.css'
import { useState } from 'react';

function getDate() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let longMonth =month + '';
    if(month<10)
        longMonth= '' + 0 + month;
    const year = today.getFullYear();
    const date = today.getDate();
    let longDate =date + '';
    if(date<10)
        longDate= '' + 0 + date;
    console.log(date);
    return `${longDate}.${longMonth}.${year}`;
  }
  
  interface ManualAddTransactionPanel
  {
    setManualAddTransactionPanelVisible:Function;
  }

function ManualAddTransactionPanel({setManualAddTransactionPanelVisible} : ManualAddTransactionPanel) {

  const [currentDate, setCurrentDate] = useState(getDate());

  function handleButtonClicked()
  {
    setManualAddTransactionPanelVisible(false);
  }

    return (
      <div className="manual-add-transaction-panel">
        <div className='title'>
          <div className='main-title'>
            Add transactions
          </div>
          <div className='subtitle'>
            Add manually transactions
          </div>
        </div>
        <div className='main-content'>
          <form>
            <label>
              enter amount:
            </label>
            <input type="text" placeholder='0' className='field-style'></input>
            <label>
              select category
            </label>
            <select className='field-style'>
              <option value="Job">Job</option>
              <option value="Grocery">Grocery</option>
            </select> 
            <label>
              enter date
            </label>
            <input type="text" className='field-style' placeholder={currentDate} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")}></input>
            <label>
              enter notes:
            </label>
            <input type="text" className='field-style'placeholder='notes'></input>
          </form>
        </div>
        <div className='add-button-container'>
          <button className='add-button' onClick={handleButtonClicked}>Add</button>
        </div>
      </div>
    );
  }
  
  export default ManualAddTransactionPanel;