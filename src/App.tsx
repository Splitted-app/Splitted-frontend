import './App.css';
import {Route,Routes} from "react-router-dom"
import StartPage from './components/StartPage/StartPage';
import RegisterPage from './components/RegisterPages/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import FamilyModePage from './components/ModePages/FamilyModePage';
import AddModePanel from './components/Common/AddModePanel';

import { useRecoilValue } from 'recoil';
import { LogOutPanelVisibilityState } from './atoms/LogOutPanelVisibility';
import { AddModesPanelVisibilityState } from './atoms/AddModesPanelVisibility';
import { AddFamilyModePanelVisibilityState } from './atoms/AddFamilyModePanelVisibility';
import { AddPartnerModePanelVisibilityState } from './atoms/AddPartnerModePanelVisibility';
import { AddPartyModePanelVisibilityState } from './atoms/AddPartyModePanelVisibility';
import LogOutConfirmationPanel from './components/Common/LogOutConfirmationPanel';
import FamilyModeAddPanel from './components/Common/FamilyModeAddPanel';
import PartnerModeAddPanel from './components/Common/PartnerModeAddPanel';
import PartyModeAddPanel from './components/Common/PartyModeAddPanel';



function App() {
  const logOutPanelVisibility = useRecoilValue(LogOutPanelVisibilityState);
  const addModesPanelVisibility = useRecoilValue(AddModesPanelVisibilityState);
  const addFamilyModePanelVisibility = useRecoilValue(AddFamilyModePanelVisibilityState);
  const addPartnerModePanelVisibility = useRecoilValue(AddPartnerModePanelVisibilityState);
  const addPartyModePanelVisibility = useRecoilValue(AddPartyModePanelVisibilityState);

  const popupVisible = logOutPanelVisibility || addModesPanelVisibility || addFamilyModePanelVisibility || addPartnerModePanelVisibility || addPartyModePanelVisibility;

  return (
    <div className="app">
      <div className='site-content'>
        <div className={`page ${popupVisible ? "darkened" : ""}`}>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>            
            <Route path="/family" element={<FamilyModePage/>}/>
          </Routes>
        </div>
        <div className='global-popup' style={{'display': popupVisible ? 'flex' : 'none'}}>
          {logOutPanelVisibility && <LogOutConfirmationPanel/>}
          {addModesPanelVisibility && <AddModePanel/>}
          {addFamilyModePanelVisibility && <FamilyModeAddPanel/>}
          {addPartnerModePanelVisibility && <PartnerModeAddPanel/>}
          {addPartyModePanelVisibility && <PartyModeAddPanel/>}

        </div>
      </div>
    </div>
  );
}

export default App;
