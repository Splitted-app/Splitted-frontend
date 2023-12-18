import './App.css';

import { useEffect, useRef } from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Route,Routes, useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from 'recoil';
import {Helmet} from "react-helmet";


import AddModePanel from './components/Common/AddModePanel';
import AddTransactionsPanel from './components/Common/AddTransactionsPanel';
import AddGoalPanel from './components/GoalsPage/AddGoalPanel';
import ConfirmEmailPage from './components/RegisterPages/ConfirmEmailPage';
import FamilyModeAddPanel from './components/Common/FamilyModeAddPanel';
import FamilyModeFollowUp from './components/Common/FamilyModeFollowUp';
import FamilyModePage from './components/ModePages/FamilyModePage';
import GoalsPage from './components/GoalsPage/GoalsPage';
import HomePage from './components/HomePage/HomePage';
import ImportCsvCheck from './components/Common/ImportCsvCheck';
import ImportCsvPanel from './components/Common/ImportCsvPanel';
import InsightsPage from './components/InsightsPage/InsightsPage';
import LogOutConfirmationPanel from './components/Common/LogOutConfirmationPanel';
import ManualAddTransactionPanel from './components/Common/ManualAddTransactionPanel';
import PartnerModeAddPanel from './components/Common/PartnerModeAddPanel';
import PartnerModeFollowUp from './components/Common/PartnerModeFollowUp';
import PartyModeFollowUp from './components/Common/PartyModeFollowUp';
import PartyModeAddPanel from './components/Common/PartyModeAddPanel';
import RegisterPage from './components/RegisterPages/RegisterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import StartPage from './components/StartPage/StartPage';
import SplitItPanel from './components/TransactionPage/SplitItPanel';
import TransactionPage from './components/TransactionPage/TransactionPage';
import PartnerModePage from './components/ModePages/PartnerModePage';
import PartyModePage from './components/ModePages/PartyModePage';

import { AddFamilyModePanelVisibilityState } from './atoms/AddFamilyModePanelVisibility';
import { AddGoalPanelVisibilityState } from './atoms/AddGoalPanelVisibility';
import { AddModesPanelVisibilityState } from './atoms/AddModesPanelVisibility';
import { AddPartnerModePanelVisibilityState } from './atoms/AddPartnerModePanelVisibility';
import { AddPartyModePanelVisibilityState } from './atoms/AddPartyModePanelVisibility';
import { AddTransactionsPanelVisibilityState } from './atoms/AddTransactionsPanelVisbility';
import { FamilyModeFollowUpVisibilityState } from './atoms/FamilyModeFollowUp';
import { FullLoginUpdaterState } from './atoms/FullLoginUpdater';
import { ImportCsvCheckPanelVisibilityState } from './atoms/ImportCsvCheckPanelVisibility';
import { ImportCsvPanelVisibilityState } from './atoms/ImportCsvPanelVisbility';
import { LogOutPanelVisibilityState } from './atoms/LogOutPanelVisibility';
import { ManualAddTransactionsPanelVisibilityState } from './atoms/ManualAddTransactionsPanelVisbility';
import { PartnerModeFollowUpVisibilityState } from './atoms/PartnerModeFollowUp';
import { PartyModeFollowUpVisibilityState } from './atoms/PartyModeFollowUp';
import { SplitItPanelState } from './atoms/SplitItPanel';
import { UserTokenState } from './atoms/UserToken';



function App() {
  const logOutPanelVisibility = useRecoilValue(LogOutPanelVisibilityState);
  const addModesPanelVisibility = useRecoilValue(AddModesPanelVisibilityState);
  const addFamilyModePanelVisibility = useRecoilValue(AddFamilyModePanelVisibilityState);
  const addGoalPanelVisibility = useRecoilValue(AddGoalPanelVisibilityState);
  const familyModeFollowUpVisibility = useRecoilValue(FamilyModeFollowUpVisibilityState);
  const partnerModeFollowUpVisibility = useRecoilValue(PartnerModeFollowUpVisibilityState);
  const partyModeFollowUpVisibility = useRecoilValue(PartyModeFollowUpVisibilityState);
  const addPartnerModePanelVisibility = useRecoilValue(AddPartnerModePanelVisibilityState);
  const addPartyModePanelVisibility = useRecoilValue(AddPartyModePanelVisibilityState);
  const addTransactionsPanelVisibility = useRecoilValue(AddTransactionsPanelVisibilityState);
  const importCsvPanelVisibility = useRecoilValue(ImportCsvPanelVisibilityState)
  const importCsvCheckPanelVisibility = useRecoilValue(ImportCsvCheckPanelVisibilityState);
  const manualAddTransactionsPanelVisibility = useRecoilValue(ManualAddTransactionsPanelVisibilityState);
  const splitItPanel = useRecoilValue (SplitItPanelState);
  const popupVisible = 
    logOutPanelVisibility || 
    addModesPanelVisibility || 
    addFamilyModePanelVisibility || 
    addPartnerModePanelVisibility || 
    addPartyModePanelVisibility || 
    addTransactionsPanelVisibility || 
    importCsvPanelVisibility || 
    importCsvCheckPanelVisibility || 
    manualAddTransactionsPanelVisibility ||
    familyModeFollowUpVisibility ||
    partnerModeFollowUpVisibility ||
    partyModeFollowUpVisibility ||
    splitItPanel.visible ||
    addGoalPanelVisibility;
  const [token, setToken] = useRecoilState(UserTokenState);
  const [updater, setUpdater] = useRecoilState(FullLoginUpdaterState)

  const tokenUpdatedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (tokenUpdatedRef.current) 
        return;
    tokenUpdatedRef.current = true;
    
    // const refreshAuthLogic = (failedRequest: any) =>
    // {
    //   return axios.post(process.env.REACT_APP_API_URL + `/api/users/refresh`, null , {withCredentials:true})
    //   .then((tokenRefreshResponse) => {
    //     setToken(tokenRefreshResponse.data.token);
    //     failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
    //     return Promise.resolve();
    //   })
    //   .catch((error)=>{
    //     console.error(error);
    //   });
    // }
    const refreshRequest = () => 
    axios.post(process.env.REACT_APP_API_URL + `/api/users/refresh`, null , {withCredentials:true})
      .then((res) => {
        setToken(res.data.token);
        console.log(res.data.token)
        setUpdater(updater + 1);
      })
      .catch((error)=>{
        console.error(error);
        setUpdater(0);
        setToken("");
        navigate('/');
      });
    
    refreshRequest();
    setInterval(() => {
      console.log("Refreshing token...")
      refreshRequest();
    }, 120000);
  },[])

  return (
    <div className="app">
      <Helmet>
        <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
      </Helmet>
      <div className='site-content'>
        <div className={`page ${popupVisible ? "darkened" : ""}`}>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>            
            <Route path="/transactions" element ={<TransactionPage/>}/>
            <Route path="/insights" element ={<InsightsPage/>}/>
            <Route path="/settings" element={<SettingsPage/>}/>
            <Route path="/ConfirmEmail" element={<ConfirmEmailPage/>}/>
            <Route path="/goals" element={<GoalsPage/>}/>
            <Route path="/family/:id" element={<FamilyModePage/>}/>
            <Route path="/partner/:id" element={<PartnerModePage/>}/>
            <Route path="/party/:id" element={<PartyModePage/>}/>
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
          {familyModeFollowUpVisibility && <FamilyModeFollowUp/>}
          {partnerModeFollowUpVisibility && <PartnerModeFollowUp/>}
          {partyModeFollowUpVisibility && <PartyModeFollowUp/>}
          {splitItPanel.visible && <SplitItPanel/>}
          {addGoalPanelVisibility && <AddGoalPanel/>}
        </div>
      </div>
    </div>
  );
}

export default App;
