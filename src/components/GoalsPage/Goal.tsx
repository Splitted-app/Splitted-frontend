import '../../css/GoalsPage/Goal.css';

import Moment from 'moment';
interface GoalInterface
{
    id: string,
    amount: number,
    name: string,
    category: string,
    goalType: string,
    creationDate: string,
    deadline: string,
    isMain: boolean,
    percentage: number
}

interface GoalTileInterface
{
    goal: GoalInterface,
    icon:string,
    goalBackgroundColour:string,
    progressColor:string
    color:string
}

function Goal({goal,icon, goalBackgroundColour,progressColor,color} : GoalTileInterface) {
    return (
      <div className="goal" style={{background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}  ${goal.percentage}%, ${goalBackgroundColour} ${goal.percentage}%, ${goalBackgroundColour} 100%)`, color:color}}>
            <div className='goal-title'>
                {goal.name}
            </div>
            <div className='goal-amount'>
                {goal.amount}
            </div>
            <div className='goal-deadline'>
                {Moment(goal.deadline).format('DD.MM.yyyy')}
            </div>
            <div className='goal-progress'>
                {goal.percentage}%
            </div>
            <div className='goal-icon-container'>
                <img src={icon}></img>
            </div>

      </div>
    );
  }
  
  export default Goal;