import '../../css/Common/Navbar.css'

import { useState } from 'react';

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
import GoalsIcon from '../../assets/images/goals.png'
import HomePageIcon from '../../assets/images/home_page.png'
import InsightsIcon from '../../assets/images/insights.png'
import LogOutIcon from '../../assets/images/log-out.png'
import MenuIcon from '../../assets/images/main-menu.png'
import SettingsIcon from '../../assets/images/settings.png'
import SplitIcon from '../../assets/images/split.png'
import TransactionsIcon from '../../assets/images/transactions.png'



function Navbar() {
    const setLogOutPanelVisibility = useSetRecoilState(LogOutPanelVisibilityState);
    const setAddModesPanelVisibility = useSetRecoilState(AddModesPanelVisibilityState);
    const setNavbarVisibility = useSetRecoilState(NavbarVisibilityState);
    const setSettingsNavbarVisibility = useSetRecoilState(SettingsNavbarVisibilityState);
    const menuIconVisibility= useRecoilValue(MenuIconVisibilityState);
    const [navbarExpanded, setNavbarExpanded] = useState<boolean>(false);
    const userBudgets = useFetchUserBudgets();

    function handleExpandHideNavbar()
    {
      setNavbarExpanded(!navbarExpanded);
    }

    return (
      <div className={`navbar ${navbarExpanded ? "navbar-mini-expanded" : ""}`} data-testid="navbar">
        <div className="title">
          { menuIconVisibility && <div className='old-menu-icon' onClick={()=>{setNavbarVisibility(false); setSettingsNavbarVisibility(true)}} data-testid="navbar-change-icon">
            <img src={MenuIcon}></img>
          </div>}
          <a style={{cursor: "pointer"}} onClick={handleExpandHideNavbar}>
            <div className="navbar-item" data-testid="navbar-header">
              <div className='icon'>
                <img src={SplitIcon} data-testid="navbar-header-icon"></img>
              </div>
              <div className='text' style={{fontFamily: 'CeraPro bold', fontSize: "25px"}} data-testid="navbar-header-text">
                  Splitted
              </div>
            </div>
          </a>
          {/* <NavbarItem name="Splitted" font="CeraPro bold" fontSize="25px" link="/home" icon={SplitIcon}></NavbarItem> */}
        </div>
        <div className='navbar-content'>
          <div className='table-of-contents'>
            <div className='side-pages'>
              <div data-testid="navbar-item-home-page">
                <NavbarItem name="HomePage" font="CeraPro light" fontSize="17px" link="/home" icon={HomePageIcon}></NavbarItem>
              </div>
              <div data-testid="navbar-item-transactions-page">
                <NavbarItem name="Transactions" font="CeraPro light" fontSize="17px" link="/transactions" icon={TransactionsIcon}></NavbarItem>
              </div>
              <div data-testid="navbar-item-insights-page">
                <NavbarItem name="Insights" font="CeraPro light" fontSize="17px" link="/insights" icon={InsightsIcon}></NavbarItem>
              </div>
              <div data-testid="navbar-item-goals-page">
                <NavbarItem name="Goals" font="CeraPro light" fontSize="17px" link="/goals" icon={GoalsIcon}></NavbarItem>
              </div>
            </div>
            <div className='modes-panel' data-testid="navbar-modes-panel">
              <div className='modes-panel-title'>
                Your modes
              </div>
              <div className='your-modes-panel'>
                {userBudgets.filter((budget: any)=> budget.budgetType !== 'Personal').map((budget: any, i: number)=>(
                  <ModeItem budget={budget} key={i}/>)
                )}
              </div>
                <div className='add-new-mode-button-container' onClick={()=>{setAddModesPanelVisibility(true)}} data-testid="navbar-add-new-mode-button">
                  <div className='add-new-mode-icon'>
                    <img src={AddNewModeIcon}></img>
                  </div>
                  <div className='add-new-mode-text'>
                    Add new mode
                  </div>
                </div>
            </div>
          </div>
          <div className="navbar-footer">
            <div data-testid="navbar-item-settings-page">
              <NavbarItem name="Settings" font="CeraPro medium" fontSize="17px" link="/settings"icon={SettingsIcon}></NavbarItem>
            </div>          
            <div onClick={()=>setLogOutPanelVisibility(true)} data-testid="navbar-item-log-out-button">
              <NavbarItem name="Log Out" font="CeraPro medium" fontSize="17px" link="#" icon={LogOutIcon}></NavbarItem>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default Navbar;