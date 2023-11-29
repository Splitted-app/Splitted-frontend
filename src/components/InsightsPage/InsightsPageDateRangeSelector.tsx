import '../../css/HomePage/DateRangeSelector.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

import { useState } from 'react'

import { DateRange } from 'react-date-range'

import { changeDay, getStartOfWeek, getStartOfMonth, getEndOfMonth } from '../../utils';

import downArrow from '../../assets/images/downarrow.svg'

interface InsightsPageDateRangeSelectorInterface
{
    currentDate:Date;
    dateRange:any;
    setDateRange: Function;
}


function InsightsPageDateRangeSelector({currentDate , dateRange, setDateRange} : InsightsPageDateRangeSelectorInterface) {
    const [contentVisible, setContentVisible] = useState(false);
    const [lockContent, setLockContent] = useState(false);
    const [buttonText, setButtonText] = useState("work week");

    function handleWorkWeekButton()
    {
        setButtonText("work week");
        // setDateRange([{
        //     ...dateRange[0],
        //     startDate: currentDate,
        //     endDate: currentDate,
        // }])
        setContentVisible(false);
    }
    function handleWeekendButton()
    {
        setButtonText("weekend");
        // setDateRange([{
        //     ...dateRange[0],
        //     startDate: startOfWeek,
        //     endDate: changeDay(startOfWeek, 6),
        // }])
        setContentVisible(false);
    }
    
    function handleAdvancedData(item:any)
    {
        setButtonText("advanced data");
        setDateRange([item.selection]);
    }
 
    return (
        <div className='date-range-selector-container'
            onMouseEnter={() => setTimeout(() => setContentVisible(true), 0)} 
            onMouseLeave={() => setTimeout(() => setContentVisible(lockContent), 0)}
            >
            <button className="date-range-selector-button" 
                    onClick={()=>
                    {
                        if (lockContent)
                            setContentVisible(false);
                        if (!contentVisible)
                            setContentVisible(true);
                        setLockContent(!lockContent);
                    }} 
                    style={{borderRadius: contentVisible ? "20px 20px 0 0" : "100px"}}>
                <span>
                    {buttonText}
                </span>
                <img src={downArrow}/>
            </button>
            {contentVisible && 
            <div className="date-range-selector">
                <div className='text-container'>
                    <button className="select-field-button" onClick={handleWorkWeekButton}>work week</button>
                </div>
                <div className='text-container'>
                    <button className="select-field-button" onClick={handleWeekendButton}>weekends</button>
                </div>
                <div className='text-container advanced-data'>
                    <span>advanced data</span>
                </div>
                <DateRange 
                    weekStartsOn={1}
                    editableDateInputs={true} 
                    onChange={item => {setDateRange([item.selection]); handleAdvancedData(item);}}            
                    moveRangeOnFirstSelection={false} 
                    ranges={dateRange}
                    />
                </div>
            }
        </div>
      
    );
  }
  
  export default InsightsPageDateRangeSelector;