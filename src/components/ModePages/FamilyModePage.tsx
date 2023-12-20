import '../../css/ModePages/FamilyModePage.css';

import { useParams } from 'react-router';

import Navbar from "../Common/Navbar";
import LoadingPanel from '../Common/LoadingPanel';

import useFetchBudget from '../../hooks/useFetchBudget';

import FamilyModeIcon from '../../assets/images/family_mode_add.png'



function FamilyModePage() {
    const { id } = useParams();
    const budget = useFetchBudget(id);

    return (
      <div className="family-mode-page">
        <Navbar></Navbar>
        {(budget.loading || budget.error) &&<LoadingPanel error={budget.error}/>}
        {!budget.loading && !budget.error &&
        <div className='family-mode-content'>
            <div className='header'>
                <div className='title'>
                    <div className='subtitle'>
                        Family mode with {budget.data.users[0].username}
                    </div>
                    <div className='maintitle'>
                        {budget.data.name}
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