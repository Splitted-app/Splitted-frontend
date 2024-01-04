import '../../css/GoalsPage/GoalsPage.css';

import Goal from './Goal'
import Navbar from "../Common/Navbar"

import { useSetRecoilState } from 'recoil';

import { AddGoalPanelVisibilityState } from '../../atoms/AddGoalPanelVisibility';

import useFetchGoals from '../../hooks/useFetchGoals';
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


function GoalsPage() {

    const setAddGoalPanelVisibility = useSetRecoilState(AddGoalPanelVisibilityState)
    const [pinsVisible, setPinsVisible] = useState<boolean>(false);
    let icon:any;
    let backgroundColor:any;
    let progressColor:any;
    let color:any;

    const {data: goals, loading: goalsLoading, error: goalError } : 
        {data: GoalInterface[], loading: boolean, error: boolean} = useFetchGoals();
    const {data: mainGoal, loading: mainGoalLoading, error: mainGoalError } : 
        {data: GoalInterface, loading: boolean, error: boolean} = useFetchGoals(true);

    return (
      <div className="goals-page">
        <Navbar></Navbar>
        <div className='goals-page-content'>
            <div className='header'>
                <div className='main-goal-container' data-testid="goals-page-main-goal-container">
                    <div className='main-goal-text' data-testid="goals-page-main-goal-container-text">
                        Your main goal:
                    </div>
                    <div className='main-goal' data-testid="goals-page-main-goal">
                        {typeof mainGoal !== "string" && !Array.isArray(mainGoal) &&  
                            <Goal 
                                goal={mainGoal} 
                                pinIconVisible={pinsVisible}/>
                        }
                    </div>
                </div>
                <div className='goal-page-buttons-container'>
                    <div className='toggle-goal-pin-container'>
                        <button className='goal-page-button' onClick={()=>setPinsVisible(!pinsVisible)} data-testid="goals-page-select-main-goal-button">{pinsVisible ? "Finish" : "Select Main Goal"}</button>
                    </div>
                    <div className='add-goal-button-container'>
                        <button className='goal-page-button' onClick={()=>setAddGoalPanelVisibility(true)} data-testid="goals-page-add-new-goal-button">Add new goal</button>
                    </div>
                </div>
                <div className='title' data-testid="goals-page-header-title">
                    Goals                
                </div>
            </div>
            <div className='goals-page-current-goals-panel' data-testid="goals-page-current-goals-section">
                <div className='goals-page-current-goals-title' data-testid="goals-page-current-goals-section-title">
                    Your current goals
                </div>
                <div className='goals-page-current-goals' data-testid="goals-page-current-goals">
                    {goals.map((goal, i)=>(
                        <div className='goals-page-goal-item' key={i}>
                        <Goal key={i} 
                            goal={goal} 
                            pinIconVisible={pinsVisible}/>
                        </div>
                    )  )}
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default GoalsPage;