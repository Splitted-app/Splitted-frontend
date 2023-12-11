import '../../css/GoalsPage/GoalsPage.css';

import Goal from './Goal'
import Navbar from "../Common/Navbar"

import { useSetRecoilState } from 'recoil';

import { AddGoalPanelVisibilityState } from '../../atoms/AddGoalPanelVisibility';

import ExpensesIcon from '../../assets/images/expenses (1).png'
import GroceriesIcon from '../../assets/images/grocery.png'
import ShoppingIcon from '../../assets/images/online-shopping.png'
import WalletIcon from '../../assets/images/wallet.png'

import useFetchGoals from '../../hooks/useFetchGoals';



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

    const {data: goals, loading: goalsLoading, error: goalError } : 
        {data: GoalInterface[], loading: boolean, error: boolean} = useFetchGoals();
    const {data: mainGoal, loading: mainGoalLoading, error: mainGoalError } : 
        {data: GoalInterface, loading: boolean, error: boolean} = useFetchGoals(true);

    return (
      <div className="goals-page">
        <Navbar></Navbar>
        <div className='goals-page-content'>
            <div className='header'>
                <div className='main-goal-container'>
                    <div className='main-goal-text'>
                        Your main goal:
                    </div>
                    <div className='main-goal-panel'>
                        {typeof mainGoal !== "string" &&
                            <Goal goal={mainGoal} icon={WalletIcon} goalBackgroundColour='#81A8C7' progressColor='#3C557E' color='white'/>
                        }
                        {/* <Goal title={"Account Balance:"} amount={"100 000 PLN"} deadline={"01.01.2025"} progress={90} icon={WalletIcon} goalBackgroundColour='#81A8C7' progressColor='#3C557E' color='white'></Goal> */}
                    </div>
                </div>
                <div className='add-goal-button-container'>
                    <button className='add-goal-button' onClick={()=>setAddGoalPanelVisibility(true)}> Add new goal</button>
                </div>
                <div className='title'>
                    Goals                
                </div>
            </div>
            <div className='goals-page-current-goals-panel'>
                <div className='goals-page-current-goals-title'>
                    Your current goals
                </div>
                <div className='goals-page-current-goals'>
                    {goals.map((goal, i)=>(
                        <div className='goals-page-goal-item'>
                            <Goal key={i} goal={goal} icon={ExpensesIcon} goalBackgroundColour='#E6B6B6' progressColor='#CC3C3C' color='#474747'/>
                        </div>
                    ))}
                    {/* <div className='goals-page-goal-item'>
                        <Goal title={"Expenses Limit:"} amount={"5 000 PLN"} deadline={"01.01.2025"} progress={20} icon={ExpensesIcon} goalBackgroundColour='#E6B6B6' progressColor='#CC3C3C' color='#474747'></Goal>
                    </div>
                    <div className='goals-page-goal-item'>
                        <Goal title={"Max Expense In Shopping:"} amount={"500 PLN"} deadline={"01.01.2024"} progress={60} icon={ShoppingIcon} goalBackgroundColour='#D59FB6' progressColor='#FF5EA4' color='white'></Goal>
                    </div>
                    <div className='goals-page-goal-item'>
                        <Goal title={"Account Balance:"} amount={"100 000 PLN"} deadline={"01.01.2025"} progress={90} icon={WalletIcon} goalBackgroundColour='#81A8C7' progressColor='#3C557E' color='white'></Goal>
                    </div>
                    <div className='goals-page-goal-item'>
                        <Goal title={"Average Expenses in Groceries:"} amount={"150 PLN"} deadline={"01.01.2025"} progress={100} icon={GroceriesIcon} goalBackgroundColour='#E2CBB0' progressColor='#E7D18F' color='#474747'></Goal>
                    </div> */}
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default GoalsPage;