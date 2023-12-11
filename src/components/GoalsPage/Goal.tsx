import '../../css/GoalsPage/Goal.css';

import { useRecoilState, useRecoilValue } from 'recoil';

import axios from 'axios';
import Moment from 'moment';
import moment from 'moment';

import { GoalsUpdaterState } from '../../atoms/GoalsUpdaterState';
import { UserTokenState } from '../../atoms/UserToken';

import DeleteGoalIcon from '../../assets/images/delete_transaction.png'
import EditGoalIcon from '../../assets/images/edit_transaction.png'
import UpdateGoalIcon from '../../assets/images/update.png'
import MainGoalPinIcon from '../../assets/images/main_goal_pin.png'
import PinIcon from '../../assets/images/pin.png'
import { useState } from 'react';






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
    const [goalUpdater, setGoalUpdater] = useRecoilState(GoalsUpdaterState)
    const [editable, setEditable] = useState<boolean>(false);
    let [newData, setNewData] = useState({
        amount: goal.amount,
        deadline: goal.deadline,
        isMain: goal.isMain
    })

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
            setNewData({...newData, isMain: !goal.isMain});
            setGoalUpdater(!goalUpdater);
        })
    }

    function handleDeleteGoal()
    {
        axios.delete(process.env.REACT_APP_API_URL + `/api/goals/${goal.id}`,
        {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((res)=>{
            setGoalUpdater(!goalUpdater)
        })
    }

    function handleEditButton()
    {
        setEditable(!editable)
        if (!editable)
            return;

        console.log(newData);
        axios.put(process.env.REACT_APP_API_URL + `/api/goals/${goal.id}`,
        JSON.stringify(newData),
        {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
        })
        .then((res)=>{
            setGoalUpdater(!goalUpdater)
        })
    }

    function handleAmountChanged(value: string)
    {
      try
      {
        const parsedValue: string = value
          .replace(',', '.')            // change ',' to '.'
          .replace(/[.](?=.*[.])/g, "") // remove all '.' but the last one
          .replace(/[^0-9.-]/g, "")      // remove all characters that are not a digit, '.' or '-'
          .replace(/(?!^)-/, "");
        let numValue = Number(parsedValue);
        numValue = Math.round((numValue + Number.EPSILON) * 100) / 100; 
        setNewData({...newData, amount: parseFloat(value)})
      }
      catch 
      {
        console.log(`Could not parse ${value} into a number`)
      }
    }

    function handleDateChanges(value: string)
    {
        try
        {
            let newDate = moment(value, "DD.MM.yyyy").format("YYYY-MM-DDT00:00:00.000") + "Z";;
            console.log(newDate)
            setNewData({...newData, deadline: newDate})
        }
        catch
        {
            console.log(`Could not parse ${value} into a date`)
        }
        
    }

    return (
      <div className="goal" style={{background: `linear-gradient(90deg, ${progressColor} 0%, ${progressColor}  ${goal.percentage}%, ${goalBackgroundColour} ${goal.percentage}%, ${goalBackgroundColour} 100%)`, color:color}}>
            <div className='goal-title'>
                {goal.name}
            </div>
            <div className={`goal-amount ${editable ? "editable-content" : ""}`}
                contentEditable={editable} 
                onInput={(e:any)=>handleAmountChanged(e.currentTarget.textContent)}
                suppressContentEditableWarning={true}>
                {goal.amount}
            </div>
            <div className={`goal-deadline ${editable ? "editable-content" : ""}`}
                contentEditable={editable}
                onInput={(e:any)=>handleDateChanges(e.currentTarget.textContent)}
                suppressContentEditableWarning={true}>
                {Moment(goal.deadline).format('DD.MM.yyyy')}
            </div>
            <div className='goal-progress'>
                {goal.percentage}%
            </div>
            <div className='goal-icon-container'>
                <img src={icon}></img>
            </div>
            <div className='buttons'>    
                <button onClick={handleEditButton}>
                    <img src={editable ? UpdateGoalIcon : EditGoalIcon}/>
                </button>
                <button onClick={handleDeleteGoal}>
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