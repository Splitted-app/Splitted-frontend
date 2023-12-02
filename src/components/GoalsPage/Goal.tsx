import '../../css/GoalsPage/Goal.css';

interface GoalInterface
{
    title:string,
    amount:string,
    deadline:string,
    progress:number,
    icon:string,
    goalBackgroundColour:string,
    progressColor:string
    color:string
}

function Goal({title,amount,deadline,progress,icon, goalBackgroundColour,progressColor,color} : GoalInterface) {
    return (
      <div className="goal" style={{background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}  ${progress}%, ${goalBackgroundColour} ${progress}%, ${goalBackgroundColour} 100%)`, color:color}}>
            {/* <div className='goal-progress-background' style={{width:progress*3, backgroundColor:progressColor, /*borderRadius:(progress<=96)?'40px 0px 0px 40px':(progress ==97)?'40px 6px 6px 40px':(progress == 98)?'40px 20px 20px 40px':(progress == 99)?'40px 30px 30px 40px':'40px'  */}
            {/* </div> */}
            <div className='goal-title'>
                {title}
            </div>
            <div className='goal-amount'>
                {amount}
            </div>
            <div className='goal-deadline'>
                {deadline}
            </div>
            <div className='goal-progress'>
                {progress}%
            </div>
            <div className='goal-icon-container'>
                <img src={icon}></img>
            </div>

      </div>
    );
  }
  
  export default Goal;