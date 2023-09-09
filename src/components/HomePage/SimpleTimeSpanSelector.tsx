import '../../css/HomePage/SimpleTimeSpanSelector.css'

interface SimpleTimeSpanSelectorProps
{
    data:string;
}

function SimpleTimeSpanSelector({data}:SimpleTimeSpanSelectorProps) {
    return (
      <div className="simple-time-span-selector">
        {data}
      </div>
    );
  }
  
  export default SimpleTimeSpanSelector;