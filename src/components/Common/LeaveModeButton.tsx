import '../../css/Common/LeaveModeButton.css';

import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';

import { UserBudgetsUpdaterState } from '../../atoms/UserBudgetsUpdater';

import api from "../../services/api";

interface LeaveModeButtonInterface
{
  budgetId: string | undefined
}

function LeaveModeButton({budgetId} : LeaveModeButtonInterface) {

    const navigate = useNavigate();
    const [userBudgetsUpdater, setUserBudgetsUpdater] = useRecoilState(UserBudgetsUpdaterState)

    function handleLeaveMode()
    {
      api.delete(`/api/users/budgets/${budgetId}`)
        .then((res)=>{
          navigate('/home');
          setUserBudgetsUpdater(!userBudgetsUpdater);
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    return (
        <button className="leave-mode-button" onClick={handleLeaveMode}>
          Leave Mode
        </button>
    );
  }
  
  export default LeaveModeButton;