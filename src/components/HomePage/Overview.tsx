import '../../css/HomePage/Overview.css'

import { useState } from 'react';

import DateDisplay from './DateDisplay';
import DateRangeSelector from './DateRangeSelector';
import InsightsOverview from './InsightsOverview';
import TransactionsOverview from './TransactionsOverview';


import { changeDay, changeMonth, changeWeek } from '../../utils';

import leftarrow from '../../assets/images/leftarrow.svg';
import rightarrow from '../../assets/images/rightarrow.svg';
interface OverviewInterface
{
    typeId : number
}

function Overview({typeId} : OverviewInterface) {
  const [timeScale, setTimeScale] = useState("daily");
  let currentDate : Date = new Date();
  const [dateRange, setDateRange] = useState<any>([{
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection'
  }]);

  function handleArrow(direction : number)
  {
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
      <div className="overview">
        <div className='time-scale-selector-container' data-testid="overview-time-scale-selector">
            <DateRangeSelector 
            currentDate={currentDate} 
            dateRange={dateRange}
            setDateRange={setDateRange}
            setTimeScale={setTimeScale}></DateRangeSelector>
          </div>
          <div className='simple-time-span-selector-container' data-testid="overview-time-span-selector">
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
          <div className='overview-content'>
            {typeId == 0 && <TransactionsOverview dateRange={dateRange}></TransactionsOverview>}
            {typeId == 1 && <InsightsOverview dateRange={dateRange}></InsightsOverview>}
          </div>
      </div>
    );
  }
  
  export default Overview;