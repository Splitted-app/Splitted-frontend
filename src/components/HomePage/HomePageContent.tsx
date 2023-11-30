import '../../css/HomePage/HomePageContent.css'

import { useEffect, useState } from 'react';

import Overview from './Overview';
import Reminders from './Reminders';

import useFetchBalance from '../../hooks/useFetchBalance';
import useFetchCurrency from '../../hooks/useFetchCurrency';

import { amountFormatter } from '../../utils';

import leftarrow from '../../assets/images/leftarrow.svg'
import rightarrow from '../../assets/images/rightarrow.svg'


function HomePageContent() {

    const overTypeCount = 2;
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

    useEffect(() => {
        const target: HTMLElement | null = document.getElementById("balance")
        if (target)
        {
            // target.scrollLeft = 0;
            // target.scrollLeft = target.scrollWidth - target.clientWidth;
        }            
    }, [])


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
                <div id="balance" className='bankBalance'>
                    {amountFormatter(bankBalance)}
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