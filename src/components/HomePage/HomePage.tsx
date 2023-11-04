import '../../css/HomePage/HomePage.css'
import SignUpFollowUp from "./SignUpFollowUp";
import Navbar from "../Common/Navbar"
import HomePageContent from './HomePageContent';
import { useEffect} from 'react';
import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';

import { useRecoilValue, useSetRecoilState } from 'recoil';

function HomePage() {
    const SignUpFollowUpVisibility = useRecoilValue(SignUpFollowUpVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const isBlurred = SignUpFollowUpVisibility;
    
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