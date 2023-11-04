import '../../css/HomePage/DateRangeSelector.css'
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { DateRange } from 'react-date-range'
import {useState} from 'react'
import downArrow from '../../assets/images/downarrow.svg'
import {changeDay, getStartOfWeek, getStartOfMonth, getEndOfMonth} from '../../utils';

interface DateRangeSelectorInterface
{
    currentDate:Date;
    dateRange:any;
    setDateRange: Function;
    setTimeScale: Function;
}


function DateRangeSelector({currentDate , dateRange, setDateRange, setTimeScale} : DateRangeSelectorInterface) {
    const [contentVisible, setContentVisible] = useState(false);
    const [lockContent, setLockContent] = useState(false);
    const [buttonText, setButtonText] = useState("daily");

    function handleDailyButton()
    {
        setTimeScale("daily");
        setButtonText("daily");
        setDateRange([{
            ...dateRange[0],
            startDate: currentDate,
            endDate: currentDate,
        }])
        setContentVisible(false);
    }
    function handleWeeklyButton()
    {
        let startOfWeek = getStartOfWeek(currentDate);
        setTimeScale("weekly");
        setButtonText("weekly");
        setDateRange([{
            ...dateRange[0],
            startDate: startOfWeek,
            endDate: changeDay(startOfWeek, 6),
        }])
        setContentVisible(false);
    }
    function handleMonthlyButton()
    {
        setTimeScale("monthly");
        setButtonText("monthly");
        setDateRange([{
            ...dateRange[0],
            startDate: getStartOfMonth(currentDate),
            endDate: getEndOfMonth(currentDate),
        }])
        setContentVisible(false);
    }
    
    function handleAdvancedData(item:any)
    {
        setTimeScale("custom");
        setButtonText("advanced data");
        setDateRange([item.selection]);
    }
 
    return (
        <div className='date-range-selector-container'
            onMouseEnter={() => setTimeout(() => setContentVisible(true), 0)} 
            onMouseLeave={() => setTimeout(() => setContentVisible(lockContent), 0)}
            /*onBlur={() => {setContentVisible(false); setLockContent(false)}}*/>
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
                    <button className="select-field-button" onClick={handleDailyButton}>daily</button>
                </div>
                <div className='text-container'>
                    <button className="select-field-button" onClick={handleWeeklyButton}>weekly</button>
                </div>
                <div className='text-container'>
                    <button className="select-field-button" onClick={handleMonthlyButton}>monthly</button>
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
  
  export default DateRangeSelector;