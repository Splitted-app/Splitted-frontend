import '../../css/HomePage/HomePageContent.css'

import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';

import Overview from './Overview';
import Reminders from './Reminders';

import { SignUpFollowUpVisibilityState } from '../../atoms/SignUpFollowUpVisibility';

import { amountFormatter } from '../../utils';

import leftarrow from '../../assets/images/leftarrow.svg'
import rightarrow from '../../assets/images/rightarrow.svg'
import useFetchBudgetId from '../../hooks/useFetchBudgetId';
import useFetchMyBudget from '../../hooks/useFetchMyBudget';


function HomePageContent() {

    const overTypeCount = 2;
    const [overviewTypeId, setOverviewTypeId] = useState(0);
    const myBudget = useFetchMyBudget();
    // const budgetId = useFetchBudgetId();
    const setSignUpFollowUpVisibility = useSetRecoilState(SignUpFollowUpVisibilityState);

    function handleLeftArrowButton()
    {
        setOverviewTypeId((overviewTypeId - 1) % overTypeCount);
    }

    function handleRightArrowButton()
    {
        setOverviewTypeId((overviewTypeId + 1) % overTypeCount);
    }

    useEffect(() => {
        const target: HTMLElement | null = document.getElementById("balance")
        if (target)
        {
            target.scrollLeft = 0;
        }

        if (myBudget.error)
            setSignUpFollowUpVisibility(true);
        else
            setSignUpFollowUpVisibility(false);

    }, [myBudget])


    return (
      <div className="home-page-content">
        <div className='reminders-container' data-testid="home-page-reminders-panel">
            <Reminders></Reminders>
        </div>
        <div className='information-panel'>
            <div className='your-balance' data-testid="home-page-your-balance-text">
                Your balance:
            </div>
            <div className='amount'>
                <div id="balance" className='bankBalance' data-testid="home-page-bank-balance-text">
                    {amountFormatter(myBudget.data === undefined ? 0 : myBudget.data.budgetBalance)}
                </div>
                <div className='currency'  data-testid="home-page-currency-text">
                    {myBudget.data === undefined ? "" : myBudget.data.currency}
                </div>
            </div>
        </div>
        <div className='left-arrow'>
            <button className='arrow-button' onClick={handleLeftArrowButton} data-testid="home-page-left-arrow-button">
                <img src={leftarrow} className='navigation-arrow'/>
            </button>
        </div>
        <div className='scrollable-content'>
            <Overview typeId={overviewTypeId}></Overview>
        </div>
        <div className='right-arrow'>
            <button className='arrow-button' onClick={handleRightArrowButton} data-testid="home-page-right-arrow-button">
                <img src={rightarrow} className='navigation-arrow'/>
            </button>
        </div>
      </div>
    );
  }
  
  export default HomePageContent;