import '../../css/HomePage/TransactionsOverview.css'
import SimpleTimeSpanSelector from './SimpleTimeSpanSelector';
import {useState} from 'react';
import TransactionList from './TransactionList';


function TransactionsOverview() {

    const [firstSelect, setFirstSelect] = useState("daily");
    const [date, setDate] = useState("Today");

    function handleSelect(e:any)
    {
      setFirstSelect(e.target.value);
    }

    function handleLeftArrow()
    {

    }
    function handleRightArrow()
    {

    }

    return (
      <div className="transactions-overview">
        <div className='time-scale-selector-container'>
            <select className='time-scale-selector' value={firstSelect} onChange={(e) => handleSelect(e)}>
              <option value="daily">daily</option>
              <option value="weekly">weekly</option>
              <option value="monthly">monthly</option>
              <option value="yearly">yearly</option>
              <option value="advanced data">advanced data</option>
            </select>
          </div>
          <div className='simple-time-span-selector-container'>
            <button className='left-arrow' onClick={handleLeftArrow}>Left Arrow</button>
              <SimpleTimeSpanSelector data={date}></SimpleTimeSpanSelector>
            <button className='right-arrow' onClick={handleRightArrow}>Right Arrow </button>
          </div>
          <div className='transactions-panel'>
            <div className='panel-title'>
              Transactions
            </div>
            <div className='transaction-list-container'>
              <TransactionList></TransactionList>
            </div>
            <div className='add-transaction-button-container'>
              <button className='add-transaction-button'>+</button>
            </div>
          </div>
      </div>
    );
  }
  
  export default TransactionsOverview;