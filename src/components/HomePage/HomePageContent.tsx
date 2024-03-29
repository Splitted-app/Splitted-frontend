import '../../css/HomePage/HomePageContent.css'
import Overview from './Overview';
import Reminders from './Reminders';
import React, { useState } from 'react';
import leftarrow from '../../assets/images/leftarrow.svg'
import rightarrow from '../../assets/images/rightarrow.svg'
import { useRecoilValue } from 'recoil';
import { useSetRecoilState } from 'recoil';
import { CurrencyState } from '../../atoms/Currency';
import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import useFetchBudgetId from '../../hooks/useFetchBudgetId';
import useFetchBalance from '../../hooks/useFetchBalance';

// function getDate() {
//     const today = new Date();
//     let month = today.getMonth() + 1;
//     let longMonth =month + '';
//     if(month<10)
//         longMonth= '' + 0 + month;
//     const year = today.getFullYear();
//     const date = today.getDate();
//     let longDate =date + '';
//     if(date<10)
//         longDate= '' + 0 + date;
//     return `${longDate}.${longMonth}.${year}`;
//   }


  

function HomePageContent() {

    const overTypeCount = 3;
    // const [currentDate, setCurrentDate] = useState(getDate());
    const [overviewTypeId, setOverviewTypeId] = useState(0);
    const bankBalance = useFetchBalance();
    // const budgetId = useFetchBudgetId();
    const currency = useRecoilValue(CurrencyState);
    // const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);

    function handleLeftArrowButton()
    {
        setOverviewTypeId((overviewTypeId - 1) % overTypeCount);
    }

    function handleRightArrowButton()
    {
        setOverviewTypeId((overviewTypeId + 1) % overTypeCount);
    }

    // function handleTransactionButtonClicked()
    // {
    //     setAddTransactionsPanelVisibility(true);
    // }


    return (
      <div className="home-page-content">
        {/* <div className='home-page-content-header'> */}
            <div className='reminders-container'>
                <Reminders></Reminders>
            </div>
            <div className='information-panel'>
                <div className='your-balance'>
                    Your balance:
                </div>
                <div className='amount'>
                    <div className='bankBalance'>
                        {bankBalance}
                    </div>
                    <div className='currency'>
                        {currency}
                    </div>
                </div>
            </div>
        {/* </div> */}
        <div className='left-arrow'>
            <button className='arrow-button' onClick={handleLeftArrowButton}>
                <img src={leftarrow} className='navigation-arrow'/>
            </button>
        </div>
        <div className='scrollable-content'>
            <Overview typeId={overviewTypeId}></Overview>
        </div>
        <div className='right-arrow'>
            <button className='arrow-button' onClick={handleRightArrowButton}>
            <img src={rightarrow} className='navigation-arrow'/>
            </button>
        </div>
      </div>
    );
  }
  
  export default HomePageContent;