import '../../css/HomePage/HomePage.css'
import SignUpFollowUp from "./SignUpFollowUp";
import Navbar from "../Common/Navbar"
import HomePageContent from './HomePageContent';
import { useState } from 'react';
import AddTransactionsPanel from './AddTransactionsPanel';
import ImportCsvPanel from './ImportCsvPanel';
import ManualAddTransactionPanel from './ManualAddTransactionPanel';
import ImportCsvCheck from './ImportCsvCheck';

import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import { useRecoilValue } from 'recoil';
import AddModePanel from '../Common/AddModePanel';
import FamilyModeAddPanel from '../Common/FamilyModeAddPanel';
import PartnerModeAddPanel from '../Common/PartnerModeAddPanel';
import PartyModeAddPanel from '../Common/PartyModeAddPanel';
// import LogOutConfirmationPanel from '../Common/LogOutConfirmationPanel';

function HomePage() {
    const [addTransactionsPanelVisible, setAddTransactionsPanelVisible] = useState(false);
    const [importCsvPanelVisible, setImportCsvPanelVisible] = useState(false);
    const [manualAddTransactionPanelVisible, setManualAddTransactionPanelVisible] = useState(false);
    const [importCsvCheckPanelVisible, setImportCsvCheckPanelVisible] = useState(false);
    // const [addModePanelVisible, setAddModePanelVisible] = useState(true);
    const [logOutConfirmationPanelVisible, setLogOutConfirmationPanelVisible] =  useState(true);

    const SignUpFollowUpVisibility = useRecoilValue(SignUpFollowUpVisibilityState);
    

    const isBlurred = SignUpFollowUpVisibility;
    const isDarkened = addTransactionsPanelVisible || 
                        importCsvPanelVisible ||
                        manualAddTransactionPanelVisible ||
                        importCsvCheckPanelVisible;



    return (
      <div>
        <div className={"home-page" + (isBlurred ? " blurred" : "") + (isDarkened ? " darkened" : "")}>
          <Navbar></Navbar>
          <HomePageContent setAddTransactionsPanelVisible={setAddTransactionsPanelVisible}></HomePageContent>        
        </div>
        <div className="popout-panel" style={{'display': isBlurred || isDarkened ? 'flex' : 'none'}}>
          {SignUpFollowUpVisibility && <SignUpFollowUp />}
          {addTransactionsPanelVisible && <AddTransactionsPanel setAddTransactionsPanelVisible={setAddTransactionsPanelVisible} setImportCsvPanelVisible={setImportCsvPanelVisible} setManualAddTransactionPanelVisible={setManualAddTransactionPanelVisible}/>}
          {importCsvPanelVisible && <ImportCsvPanel setImportCsvPanelVisible={setImportCsvPanelVisible} setImportCsvCheckPanelVisible={setImportCsvCheckPanelVisible}/>}
          {manualAddTransactionPanelVisible && <ManualAddTransactionPanel setManualAddTransactionPanelVisible={setManualAddTransactionPanelVisible}/>}
          {importCsvCheckPanelVisible && <ImportCsvCheck setImportCsvCheckPanelVisible={setImportCsvCheckPanelVisible}/>}
          {/* {addModePanelVisible && <AddModePanel/>} */}
          {/* <FamilyModeAddPanel></FamilyModeAddPanel> */}
          {/* <PartnerModeAddPanel></PartnerModeAddPanel> */}
          {/* {logOutConfirmationPanelVisible && <LogOutConfirmationPanel></LogOutConfirmationPanel>} */}
          <PartyModeAddPanel></PartyModeAddPanel>
        </div>
      </div>
    );
  }
  
  export default HomePage;