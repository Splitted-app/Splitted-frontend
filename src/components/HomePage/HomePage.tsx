import '../../css/HomePage/HomePage.css'

import HomePageContent from './HomePageContent';
import Navbar from "../Common/Navbar"
import SignUpFollowUp from "./SignUpFollowUp";

import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';

import { useRecoilValue, useSetRecoilState } from 'recoil';
import { useEffect} from 'react';


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