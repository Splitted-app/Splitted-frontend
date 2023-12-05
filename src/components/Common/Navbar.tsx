import '../../css/Common/Navbar.css'

import { useRecoilValue, useSetRecoilState } from 'recoil';

import ModeItem from './ModeItem';
import NavbarItem from './NavbarItem';

import { AddModesPanelVisibilityState } from '../../atoms/AddModesPanelVisibility';
import { LogOutPanelVisibilityState } from '../../atoms/LogOutPanelVisibility';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import { NavbarVisibilityState } from '../../atoms/NavbarVisibility';
import { SettingsNavbarVisibilityState } from '../../atoms/SettingsNavbarVisibility';

import useFetchUserBudgets from '../../hooks/useFetchUserBudgets';

import AddNewModeIcon from '../../assets/images/add_new_mode.png'
import FamilyModeIcon from '../../assets/images/family_mode.png'
import GoalsIcon from '../../assets/images/goals.png'
import HomePageIcon from '../../assets/images/home_page.png'
import InsightsIcon from '../../assets/images/insights.png'
import LogOutIcon from '../../assets/images/log-out.png'
import MenuIcon from '../../assets/images/main-menu.png'
import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'
import SettingsIcon from '../../assets/images/settings.png'
import SplitIcon from '../../assets/images/split.png'
import TransactionsIcon from '../../assets/images/transactions.png'


function Navbar() {
    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const setAddModesPanelVisibility = useSetRecoilState(AddModesPanelVisibilityState);
    const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);
    const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
    const menuIconVisibility= useRecoilValue(MenuIconVisibilityState);
    const userBudgets = useFetchUserBudgets();

    return (
      <div className="navbar">
        <div className="title">
          { menuIconVisibility && <div className='old-menu-icon' onClick={()=>{setNavbarVisibility(false); setSettingsNavbarVisibility(true)}}>
            <img src={MenuIcon}></img>
          </div>}
          <NavbarItem name="Splitted" font="CeraPro bold" fontSize="25px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className='table-of-contents'>
          <div className='side-pages'>
            <NavbarItem name="HomePage" font="CeraPro light" fontSize="17px" link="/home" icon={HomePageIcon}></NavbarItem>
            <NavbarItem name="Transactions" font="CeraPro light" fontSize="17px" link="/transactions" icon={TransactionsIcon}></NavbarItem>
            <NavbarItem name="Insights" font="CeraPro light" fontSize="17px" link="/insights" icon={InsightsIcon}></NavbarItem>
            <NavbarItem name="Goals" font="CeraPro light" fontSize="17px" link="/goals" icon={GoalsIcon}></NavbarItem>
          </div>
          <div className='modes-panel'>
            <div className='modes-panel-title'>
              Your modes
            </div>
            <div className='your-modes-panel'>
              {userBudgets.map((budget:any)=>{
                if(budget.budgetType == "Family")
                {
                  return <ModeItem icon={FamilyModeIcon} title={budget.budgetType}/>

                }else if(budget.budgetType == "Partner")
                {
                  return <ModeItem icon={PartnerModeIcon} title={budget.budgetType}/>

                }else if(budget.budgetType == "Temporary")
                {
                  return <ModeItem icon={PartyModeIcon} title={budget.budgetType}/>

                }else{
                  return <ModeItem icon={PartyModeIcon} title={budget.budgetType}/>
                }
              })}
            </div>
            {/* <button className='add-new-mode-button' onClick={()=>setAddModesPanelVisibility(true)}> */}
              <div className='add-new-mode-button-container' onClick={()=>{setAddModesPanelVisibility(true)}}>
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