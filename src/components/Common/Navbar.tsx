import '../../css/Common/Navbar.css'
import NavbarItem from './NavbarItem';
import SplitIcon from '../../assets/images/split.png'
import HomePageIcon from '../../assets/images/home_page.png'
import TransactionsIcon from '../../assets/images/transactions.png'
import InsightsIcon from '../../assets/images/insights.png'
import PredictionsIcon from '../../assets/images/predictions.png'
import GoalsIcon from '../../assets/images/goals.png'
import SettingsIcon from '../../assets/images/settings.png'
import LogOutIcon from '../../assets/images/log-out.png'
import AddNewModeIcon from '../../assets/images/add_new_mode.png'

import { useSetRecoilState } from 'recoil';
import { LogOutPanelVisibilityState } from '../../atoms/LogOutPanelVisibility';
import { AddModesPanelVisibilityState } from '../../atoms/AddModesPanelVisibility';

function Navbar() {
    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const setAddModesPanelVisibility = useSetRecoilState(AddModesPanelVisibilityState);

    return (
      <div className="navbar">
        <div className="title">
          <NavbarItem name="Splitted" font="CeraPro bold" fontSize="25px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className='table-of-contents'>
          <div className='side-pages'>
            <NavbarItem name="HomePage" font="CeraPro light" fontSize="17px" link="/home" icon={HomePageIcon}></NavbarItem>
            <NavbarItem name="Transactions" font="CeraPro light" fontSize="17px" link="/home" icon={TransactionsIcon}></NavbarItem>
            <NavbarItem name="Insights" font="CeraPro light" fontSize="17px" link="/home"icon={InsightsIcon}></NavbarItem>
            <NavbarItem name="Predictions" font="CeraPro light" fontSize="17px" link="/home"icon={PredictionsIcon}></NavbarItem>
            <NavbarItem name="Goals" font="CeraPro light" fontSize="17px" link="/home" icon={GoalsIcon}></NavbarItem>
          </div>
          <div className='modes-panel'>
            <div className='modes-panel-title'>
              Your modes
            </div>
            <div className='your-modes-panel'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta quas eveniet id, ducimus debitis ipsa voluptatem et vel, similique officia totam a odio rem. Velit laudantium quam accusamus dolore delectus?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Soluta doloremque dolores quod recusandae natus, quae minima distinctio in placeat. Ut nesciunt voluptate molestiae atque minus fugiat ipsa eveniet eum. Expedita.
            </div>
            {/* <button className='add-new-mode-button' onClick={()=>setAddModesPanelVisibility(true)}> */}
              <div className='add-new-mode-button-container' onClick={()=>{setAddModesPanelVisibility(true); console.log("clicked")}}>
                <div className='add-new-mode-icon'>
                  <img src={AddNewModeIcon}></img>
                </div>
                <div className='add-new-mode-text'>
                  Add new mode
                </div>
              </div>
            {/* </button> */}
          </div>
        </div>
        <div className="navbar-footer">          
          <NavbarItem name="Settings" font="CeraPro medium" fontSize="17px" link="/settings"icon={SettingsIcon}></NavbarItem>
          <div onClick={()=>setLogOutPanelVisibility(true)}>
            <NavbarItem name="Log Out" font="CeraPro medium" fontSize="17px" link="#" icon={LogOutIcon}></NavbarItem>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;