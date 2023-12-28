import '../../css/ModePages/FamilyModePage.css';

import { useParams } from 'react-router';

import Navbar from "../Common/Navbar";
import LoadingPanel from '../Common/LoadingPanel';

import useFetchBudget from '../../hooks/useFetchBudget';

import FamilyModeIcon from '../../assets/images/family_mode_add.png'
import { getUserListString } from '../../utils';



function FamilyModePage() {
    const { id } = useParams();
    const budget = useFetchBudget(id);

    return (
      <div className="family-mode-page">
        <Navbar></Navbar>
        {(budget.loading || budget.error) &&<LoadingPanel error={budget.error} color={"white"}/>}
        {!budget.loading && !budget.error &&
        <div className='family-mode-content'>
            <div className='header'>
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae nisi dolores earum libero voluptatem quam voluptates architecto doloremque quasi provident molestias numquam voluptatibus deserunt, mollitia quos ut. Impedit, eius. 

              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae nisi dolores earum libero voluptatem quam voluptates architecto doloremque quasi provident molestias numquam voluptatibus deserunt, mollitia quos ut. Impedit, eius.           
            </div>
        </div>
        }
      </div>
    );
  }
  
  export default FamilyModePage;