import './App.css';
import {Route,Routes} from "react-router-dom"
import StartPage from './components/StartPage/StartPage';
import RegisterPage from './components/RegisterPages/RegisterPage';
import HomePage from './components/HomePage/HomePage';
import AddModePanel from './components/Common/AddModePanel';

import { useRecoilValue } from 'recoil';
import { LogOutPanelVisibilityState } from './atoms/LogOutPanelVisibility';
import { AddModesPanelVisibilityState } from './atoms/AddModesPanelVisibility';
import { AddFamilyModePanelVisibilityState } from './atoms/AddFamilyModePanelVisibility';
import { AddPartnerModePanelVisibilityState } from './atoms/AddPartnerModePanelVisibility';
import { AddPartyModePanelVisibilityState } from './atoms/AddPartyModePanelVisibility';
import { AddTransactionsPanelVisibilityState } from './atoms/AddTransactionsPanelVisbility';
import { ImportCsvPanelVisibilityState } from './atoms/ImportCsvPanelVisbility';
import { ImportCsvCheckPanelVisibilityState } from './atoms/ImportCsvCheckPanelVisibility';
import { ManualAddTransactionsPanelVisibilityState } from './atoms/ManualAddTransactionsPanelVisbility';
import LogOutConfirmationPanel from './components/Common/LogOutConfirmationPanel';
import FamilyModeAddPanel from './components/Common/FamilyModeAddPanel';
import PartnerModeAddPanel from './components/Common/PartnerModeAddPanel';
import PartyModeAddPanel from './components/Common/PartyModeAddPanel';
import TransactionPage from './components/TransactionPage/TransactionPage';
import AddTransactionsPanel from './components/Common/AddTransactionsPanel';
import ImportCsvPanel from './components/Common/ImportCsvPanel';
import ImportCsvCheck from './components/Common/ImportCsvCheck';
import ManualAddTransactionPanel from './components/Common/ManualAddTransactionPanel';
import SettingsPage from './components/SettingsPage/SettingsPage';



function App() {
  const logOutPanelVisibility = useRecoilValue(LogOutPanelVisibilityState);
  const addModesPanelVisibility = useRecoilValue(AddModesPanelVisibilityState);
  const addFamilyModePanelVisibility = useRecoilValue(AddFamilyModePanelVisibilityState);
  const addPartnerModePanelVisibility = useRecoilValue(AddPartnerModePanelVisibilityState);
  const addPartyModePanelVisibility = useRecoilValue(AddPartyModePanelVisibilityState);
  const addTransactionsPanelVisibility = useRecoilValue(AddTransactionsPanelVisibilityState);
  const importCsvPanelVisibility = useRecoilValue(ImportCsvPanelVisibilityState)
  const importCsvCheckPanelVisibility = useRecoilValue(ImportCsvCheckPanelVisibilityState);
  const manualAddTransactionsPanelVisibility = useRecoilValue(ManualAddTransactionsPanelVisibilityState);
  const popupVisible = logOutPanelVisibility || addModesPanelVisibility || addFamilyModePanelVisibility || addPartnerModePanelVisibility || addPartyModePanelVisibility || addTransactionsPanelVisibility || importCsvPanelVisibility ||importCsvCheckPanelVisibility || manualAddTransactionsPanelVisibility ;

  return (
    <div className="app">
      <div className='site-content'>
        <div className={`page ${popupVisible ? "darkened" : ""}`}>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>            
            <Route path="/transactions" element ={<TransactionPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
          </Routes>
        </div>
        <div className='global-popup' style={{'display': popupVisible ? 'flex' : 'none'}}>
          {logOutPanelVisibility && <LogOutConfirmationPanel/>}
          {addModesPanelVisibility && <AddModePanel/>}
          {addFamilyModePanelVisibility && <FamilyModeAddPanel/>}
          {addPartnerModePanelVisibility && <PartnerModeAddPanel/>}
          {addPartyModePanelVisibility && <PartyModeAddPanel/>}
          {addTransactionsPanelVisibility && <AddTransactionsPanel/>}
          {importCsvPanelVisibility && <ImportCsvPanel/>}
          {importCsvCheckPanelVisibility && <ImportCsvCheck/>}
          {manualAddTransactionsPanelVisibility && <ManualAddTransactionPanel/>}
        </div>
      </div>
    </div>
  );
}

export default App;
