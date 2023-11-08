import '../../css/HomePage/HomePageContent.css'
import Overview from './Overview';
import Reminders from './Reminders';

import useFetchBalance from '../../hooks/useFetchBalance';
import useFetchCurrency from '../../hooks/useFetchCurrency';

import leftarrow from '../../assets/images/leftarrow.svg'
import rightarrow from '../../assets/images/rightarrow.svg'

import { useState } from 'react';

function HomePageContent() {

    const overTypeCount = 3;
    const [overviewTypeId, setOverviewTypeId] = useState(0);
    const bankBalance = useFetchBalance();
    const currency = useFetchCurrency();

    function handleLeftArrowButton()
    {
        setOverviewTypeId((overviewTypeId - 1) % overTypeCount);
    }

    function handleRightArrowButton()
    {
        setOverviewTypeId((overviewTypeId + 1) % overTypeCount);
    }

    return (
      <div className="home-page-content">
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