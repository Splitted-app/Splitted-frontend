import '../../css/HomePage/DateDisplay.css'
import {changeDay, changeWeek, changeMonth, getStartOfWeek, getStartOfMonth, getEndOfMonth} from '../../utils';
interface DateDisplayInterface
{
  timeScale: string;
  date: Date;
}

function DateDisplay({timeScale, date}:DateDisplayInterface) {

    function parseDate(date : Date, timeScale : string)
    {
      const currentDate = new Date();
      date = new Date(date);
      switch (timeScale)
      {
        case "daily":
          if (currentDate.toDateString() === date.toDateString())
          {
            return "Today";
          }
          else if (currentDate.toDateString() === changeDay(date, 1).toDateString())
          {
            return "Yesterday"
          }
          // TODO Add leading zeroes
          return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        case "weekly":
          let currentWeek = getStartOfWeek(currentDate);
          let dateWeek = getStartOfWeek(date);
          if (currentWeek.toDateString() === dateWeek.toDateString())
          {
            return "This Week";
          }
          else if (currentWeek.toDateString() === changeDay(dateWeek, 7).toDateString())
          {
            return "Last Week"
          }
          return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        case "monthly":
          let currentMonth = getStartOfMonth(currentDate);
          let dateMonth = getStartOfMonth(date);
          if (currentMonth.toDateString() === dateMonth.toDateString())
          {
            return "This Month";
          }
          else if (currentMonth.toDateString() === getStartOfMonth(changeDay(getEndOfMonth(date), 1)).toDateString())
          {
            return "Last Month"
          }
          return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
        default:
          return `${date.getDate()}-${date.getMonth()}-${date.getFullYear()}`
      }
    }

    return (
      <div className="date-display">
        {parseDate(date, timeScale)}
      </div>
    );
  }
  
  export default DateDisplay;