import './App.css';

import { useEffect, useRef } from 'react';

import axios from 'axios';
import createAuthRefreshInterceptor from 'axios-auth-refresh';
import { Route,Routes, useNavigate } from "react-router-dom"
import { useRecoilState, useRecoilValue } from 'recoil';

import AddModePanel from './components/Common/AddModePanel';
import AddTransactionsPanel from './components/Common/AddTransactionsPanel';
import FamilyModeAddPanel from './components/Common/FamilyModeAddPanel';
import HomePage from './components/HomePage/HomePage';
import ImportCsvCheck from './components/Common/ImportCsvCheck';
import ImportCsvPanel from './components/Common/ImportCsvPanel';
import InsightsPage from './components/InsightsPage/InsightsPage';
import LogOutConfirmationPanel from './components/Common/LogOutConfirmationPanel';
import ManualAddTransactionPanel from './components/Common/ManualAddTransactionPanel';
import PartnerModeAddPanel from './components/Common/PartnerModeAddPanel';
import PartyModeAddPanel from './components/Common/PartyModeAddPanel';
import RegisterPage from './components/RegisterPages/RegisterPage';
import SettingsPage from './components/SettingsPage/SettingsPage';
import StartPage from './components/StartPage/StartPage';
import TransactionPage from './components/TransactionPage/TransactionPage';

import { AddFamilyModePanelVisibilityState } from './atoms/AddFamilyModePanelVisibility';
import { AddModesPanelVisibilityState } from './atoms/AddModesPanelVisibility';
import { AddPartnerModePanelVisibilityState } from './atoms/AddPartnerModePanelVisibility';
import { AddPartyModePanelVisibilityState } from './atoms/AddPartyModePanelVisibility';
import { AddTransactionsPanelVisibilityState } from './atoms/AddTransactionsPanelVisbility';
import { FullLoginUpdaterState } from './atoms/FullLoginUpdater';
import { ImportCsvCheckPanelVisibilityState } from './atoms/ImportCsvCheckPanelVisibility';
import { ImportCsvPanelVisibilityState } from './atoms/ImportCsvPanelVisbility';
import { LogOutPanelVisibilityState } from './atoms/LogOutPanelVisibility';
import { ManualAddTransactionsPanelVisibilityState } from './atoms/ManualAddTransactionsPanelVisbility';
import { UserTokenState } from './atoms/UserToken';



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
  const [token, setToken] = useRecoilState(UserTokenState);
  const [updater, setUpdater] = useRecoilState(FullLoginUpdaterState)

  const tokenUpdatedRef = useRef(false);
  const navigate = useNavigate();

  useEffect(()=>{
    if (tokenUpdatedRef.current) 
        return;
    tokenUpdatedRef.current = true;
    
    const refreshAuthLogic = (failedRequest: any) =>
    {
      return axios.post(process.env.REACT_APP_API_URL + `/api/users/refresh`, null , {withCredentials:true})
      .then((tokenRefreshResponse) => {
        setToken(tokenRefreshResponse.data.token);
        failedRequest.response.config.headers['Authorization'] = 'Bearer ' + tokenRefreshResponse.data.token;
        return Promise.resolve();
      })
      .catch((error)=>{
        console.error(error);
      });
    }
    const refreshRequest = () => 
    axios.post(process.env.REACT_APP_API_URL + `/api/users/refresh`, null , {withCredentials:true})
      .then((tokenRefreshResponse) => {
        setToken(tokenRefreshResponse.data.token);
      })
      .then(() => {
        createAuthRefreshInterceptor(axios, refreshAuthLogic);
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
    }, 600000);
  },[])

  return (
    <div className="app">
      <div className='site-content'>
        <div className={`page ${popupVisible ? "darkened" : ""}`}>
          <Routes>
            <Route path="/" element={<StartPage/>}/>
            <Route path="/register" element={<RegisterPage/>}/>
            <Route path="/home" element={<HomePage/>}/>            
            <Route path="/transactions" element ={<TransactionPage/>}/>
            <Route path="/insights" element ={<InsightsPage/>}/>
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
