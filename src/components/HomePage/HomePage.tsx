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

function HomePage() {
    const [addTransactionsPanelVisible, setAddTransactionsPanelVisible] = useState(false);
    const [importCsvPanelVisible, setImportCsvPanelVisible] = useState(false);
    const [manualAddTransactionPanelVisible, setManualAddTransactionPanelVisible] = useState(false);
    const [importCsvCheckPanelVisible, setImportCsvCheckPanelVisible] = useState(false);
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
        </div>
      </div>
    );
  }
  
  export default HomePage;