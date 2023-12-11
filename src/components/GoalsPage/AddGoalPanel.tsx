import '../../css/GoalsPage/AddGoalPanel.css'

import { useState } from 'react';

import axios from 'axios';
import { useRecoilValue, useRecoilState, useSetRecoilState} from 'recoil';

import CloseButton from '../Common/CloseButton';

import { AddGoalPanelVisibilityState } from '../../atoms/AddGoalPanelVisibility';
import { GoalsUpdaterState } from '../../atoms/GoalsUpdaterState';
import { UserTokenState } from '../../atoms/UserToken'

import { GoalType } from '../../enums';



interface AddGoalPanelInterface {
    amount: number,
    category: string | undefined,
    goalType: string,
    deadline: number,
    isMain: boolean,
}


function AddGoalPanel() {

  const [goalUpdater, setGoalUpdater] = useRecoilState(GoalsUpdaterState)
  const token = useRecoilValue(UserTokenState);
  const setAddGoalPanelVisibility = useSetRecoilState(AddGoalPanelVisibilityState);


  const [data, setData] = useState<AddGoalPanelInterface>({
    amount: 0,
    category: undefined,
    goalType: GoalType.AccountBalance,
    deadline: Date.now(),
    isMain: false,
  });


  function handleSubmit(e: any) {
    e.preventDefault()
    axios.post(process.env.REACT_APP_API_URL + '/api/goals',
    JSON.stringify({
        amount: data.amount,
        category: data.category,
        goalType: data.goalType,
        deadline: data.deadline,
        isMain: data.isMain,
    }),
    {
        headers: {
            'Accept': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
    })
    .then(()=>{
        setAddGoalPanelVisibility(false);
        setGoalUpdater(!goalUpdater)
    })
    .catch((error)=>{
        console.error(error);
    })
    
  };

  return (
    <div className="add-goal-panel">
      <div className='close-button-container'>
        <CloseButton setVisibility={setAddGoalPanelVisibility}/>
      </div>
      
      <div className='title'>
        <div className='main-title'>
          Add Goal
        </div>
        <div className='subtitle'>
          
        </div>
      </div>
      <div className='main-content'>
        <form onSubmit={(e) => handleSubmit(e)}>
          <label>
            select goal type
          </label>
          <select id='goal-type-select' className='field-style' onChange={(e: any) => setData({ ...data, goalType: e.target.value })}>
            <option value={GoalType.AccountBalance}>Account Balance</option>
            <option value={GoalType.AverageExpenses}>Average Expenses</option>
            <option value={GoalType.ExpensesLimit}>Expenses Limit</option>
            <option value={GoalType.AverageExpensesInCategory}>Average Expenses in...</option>
            <option value={GoalType.ExpensesLimitInCategory}>Expenses Limit in...</option>
          </select>
          {data.goalType.endsWith('InCategory') &&
            <>
            <label>
                enter category
            </label>
            <input type="text" className='field-style' value={data.category} onChange={(e: any) => setData({...data, category: e.target.value })}/>
            </>
          }
          <label>
            enter amount:
          </label>
          <input type="number" placeholder='0' className='field-style' onChange={(e: any) => setData({ ...data, amount: e.target.value })} step="0.01"></input>
          <label>
            enter date
          </label>
          <input type="date" className='field-style' value={data.deadline} onChange={(e: any) => setData({ ...data, deadline: e.target.value })}></input>
          <div className='add-button-container'>
            <input type='submit' className='add-button' value="Add"/>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddGoalPanel;