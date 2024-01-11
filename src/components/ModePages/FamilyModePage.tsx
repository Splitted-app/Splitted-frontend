import '../../css/ModePages/FamilyModePage.css';

import { useParams } from 'react-router';

import Navbar from "../Common/Navbar";
import LoadingPanel from '../Common/LoadingPanel';

import useFetchBudget from '../../hooks/useFetchBudget';

import FamilyModeIcon from '../../assets/images/family_mode_add.png'
import { getUserListString } from '../../utils';
import LeaveModeButton from '../Common/LeaveModeButton';



function FamilyModePage() {
    const { id } = useParams();
    const budget = useFetchBudget(id);

    return (
      <div className="family-mode-page" data-testid="family-mode-page">
        <Navbar></Navbar>
        {(budget.loading || budget.error) &&<LoadingPanel error={budget.error} color={"white"}/>}
        {!budget.loading && !budget.error &&
        <div className='family-mode-content'>
            <div className='header'>
                <div className='family-mode-button-container'>
                  <LeaveModeButton budgetId={id}/>
                </div>
                <div className='title'>
                    <div className='subtitle'>
                        Family mode with {getUserListString(budget.data.users)}
                    </div>
                    <div className={`maintitle ${budget.data.name.length > 15 ? "maintitle-long" : ""}`}>
                      {budget.data.name.length > 20 ? budget.data.name.substring(0, 17) + "..." : budget.data.name}
                    </div>
                </div>
            </div>
            <div className='main-content-photo'>
                <img src={FamilyModeIcon}></img>
            </div>
            <div className='main-content-description'>
              You and {getUserListString(budget.data.users)} are now in family mode. Your seperate accounts integrated creating one, common budget, {budget.data.name}.
              Now both of you have access to full functionality of your integrated budget. You and {getUserListString(budget.data.users)} can both 
              add transactions from your accounts to this budget, that will be available to the other user. 

            </div>
        </div>
        }
      </div>
    );
  }
  
  export default FamilyModePage;