import './App.css';
import {Route,Routes} from "react-router-dom"
import StartPage from './components/StartPage/StartPage';
import RegisterPage from './components/RegisterPages/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import FamilyModePage from './components/ModePages/FamilyModePage';
import AddModePanel from './components/Common/AddModePanel';

import { useRecoilValue } from 'recoil';
import { LogOutPanelVisibilityState } from './atoms/LogOutPanelVisibility';
import LogOutConfirmationPanel from './components/Common/LogOutConfirmationPanel';



function App() {
  const logOutPanelVisibility = useRecoilValue(LogOutPanelVisibilityState);
  const popupVisible = logOutPanelVisibility;

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
        </div>
      </div>
    </div>
  );
}

export default App;
