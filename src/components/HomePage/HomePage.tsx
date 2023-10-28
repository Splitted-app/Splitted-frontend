import '../../css/HomePage/HomePage.css'
import SignUpFollowUp from "./SignUpFollowUp";
import Navbar from "../Common/Navbar"
import HomePageContent from './HomePageContent';
import { useEffect} from 'react';


import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import { ImportCsvPanelVisibilityState } from '../../atoms/ImportCsvPanelVisbility';
import { ImportCsvCheckPanelVisibilityState } from '../../atoms/ImportCsvCheckPanelVisibility';
import { ManualAddTransactionsPanelVisibilityState } from '../../atoms/ManualAddTransactionsPanelVisbility';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';

import { useRecoilValue, useSetRecoilState } from 'recoil';

function HomePage() {
    const addTransactionsPanelVisibility = useRecoilValue(AddTransactionsPanelVisibilityState);
    const importCsvPanelVisibility = useRecoilValue(ImportCsvPanelVisibilityState)
    const importCsvCheckPanelVisibility = useRecoilValue(ImportCsvCheckPanelVisibilityState);
    const manualAddTransactionsPanelVisibility = useRecoilValue(ManualAddTransactionsPanelVisibilityState);
    // const [logOutConfirmationPanelVisible, setLogOutConfirmationPanelVisible] =  useState(true);

    const SignUpFollowUpVisibility = useRecoilValue(SignUpFollowUpVisibilityState);

    const isBlurred = SignUpFollowUpVisibility;
    // const isDarkened = addTransactionsPanelVisibility || 
    //                     importCsvPanelVisibility ||
    //                     manualAddTransactionsPanelVisibility ||
    //                     importCsvCheckPanelVisibility;

    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);

    useEffect(()=>
    {
      setMenuIconVisibility(false);
    },[])


    return (
      <div>
        <div className={`home-page ${isBlurred ? " blurred" : ""}`}>
          <Navbar></Navbar>
          <HomePageContent></HomePageContent>        
        </div>
        <div className="popup-panel" style={{'display': isBlurred ? 'flex' : 'none'}}>
           {SignUpFollowUpVisibility && <SignUpFollowUp />}
        </div>
      </div>
    );
  }
  
  export default HomePage;