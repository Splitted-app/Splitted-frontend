import '../../css/GoalsPage/Goal.css';

import { useRecoilValue } from 'recoil';

import axios from 'axios';
import Moment from 'moment';

import { UserTokenState } from '../../atoms/UserToken';

import DeleteGoalIcon from '../../assets/images/delete_transaction.png'
import EditGoalIcon from '../../assets/images/edit_transaction.png'
import UpdateGoalIcon from '../../assets/images/update.png'
import MainGoalPinIcon from '../../assets/images/main_goal_pin.png'
import PinIcon from '../../assets/images/pin.png'




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
    pinIconVisible:boolean
}

function Goal({goal,icon, goalBackgroundColour,progressColor,color, pinIconVisible} : GoalTileInterface) {

    const token = useRecoilValue(UserTokenState);

    function handleTogglePin()
    {
        axios.put(process.env.REACT_APP_API_URL + `/api/goals/${goal.id}`,
        JSON.stringify({
            amount: goal.amount,
            deadline: goal.deadline,
            isMain: !goal.isMain
        }),
        {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((res)=>{

        })
    }

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
            <div className='buttons'>    
                <button>
                    <img src={EditGoalIcon}/>
                </button>
                <button>
                    <img src={DeleteGoalIcon}/>
                </button>
                {pinIconVisible &&
                <button onClick={handleTogglePin}>
                    <img src={goal.isMain ? MainGoalPinIcon : PinIcon}/>
                </button>
                }
            </div>
      </div>
    );
  }
  
  export default Goal;