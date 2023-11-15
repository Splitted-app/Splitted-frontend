import '../../css/InsightsPage/InsightsPage.css'

import { useEffect } from 'react';

import { useSetRecoilState } from 'recoil';

import Navbar from "../Common/Navbar"

import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';




function InsightsPage() {

    useEffect(()=>{
        setMenuIconVisibility(false);
    },[])
      
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
   

    return (
      <div className="insights-page">
        <Navbar></Navbar>
        <div className='insights-page-content'>
            <div className='header'>         
                <div className='title'>
                    <div className='main-title'>
                        Insights
                    </div>
                </div>
            </div>
        </div>
      </div>
    );
  }
  
  export default InsightsPage;