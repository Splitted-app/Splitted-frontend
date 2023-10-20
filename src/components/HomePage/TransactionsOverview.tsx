import '../../css/HomePage/TransactionsOverview.css'
import DateDisplay from './DateDisplay';
import {useState} from 'react';
import TransactionList from '../Common/TransactionList';
import leftarrow from '../../assets/images/leftarrow.svg';
import rightarrow from '../../assets/images/rightarrow.svg';
import {changeDay, changeWeek, changeMonth} from '../../utils';
import DateRangeSelector from './DateRangeSelector';
import useFetchTransactions from '../../hooks/useFetchTransactions';



function TransactionsOverview() {
    const [timeScale, setTimeScale] = useState("daily");
    let currentDate : Date = new Date();
    const [dateRange, setDateRange] = useState<any>([{
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    }]);
    const [transactions, setTransactions] = useState<any>();
    useFetchTransactions(setTransactions);

    function handleArrow(direction : number)
    {
      console.log(transactions);
      switch(timeScale)
      {
        case "daily":
          setDateRange([{...dateRange[0], 
            startDate: changeDay(dateRange[0].startDate, direction),
            endDate: changeDay(dateRange[0].endDate, direction)
          }])
          break;
        case "weekly":
          setDateRange([{...dateRange[0], 
            startDate: changeWeek(dateRange[0].startDate, direction),
            endDate: changeWeek(dateRange[0].endDate, direction)
          }])
          break;
        case "monthly":
          setDateRange([{...dateRange[0], 
            startDate: changeMonth(dateRange[0].startDate, direction),
            endDate: changeMonth(dateRange[0].endDate, direction)
          }])
          break;
        case "custom":
          break;
      }
    }

    return (
      <div className="transactions-overview">
        <div className='time-scale-selector-container'>
            <DateRangeSelector 
            currentDate={currentDate} 
            dateRange={dateRange}
            setDateRange={setDateRange}
            setTimeScale={setTimeScale}></DateRangeSelector>
          </div>
          <div className='simple-time-span-selector-container'>
            <div className='left-arrow'>
              <button className='arrow-button' onClick={() => handleArrow(-1)}>
                <img src={leftarrow} className='navigation-arrow'/>
              </button>
            </div>
              <DateDisplay timeScale={timeScale} date={dateRange[0].startDate}></DateDisplay>
            <div className='right-arrow'>
              <button className='arrow-button' onClick={() => handleArrow(1)}>
                <img src={rightarrow} className='navigation-arrow'/> 
              </button>
            </div>
          </div>
          <div className='transactions-panel'>
            <div className='panel-title'>
              Transactions
            </div>
            <div className='transaction-list-container'>
              <TransactionList transactions={transactions}></TransactionList>
            </div>
            <div className='add-transaction-button-container'>
              <button className='add-transaction-button'>+</button>
            </div>
          </div>
      </div>
    );
  }
  
  export default TransactionsOverview;