import '../../css/ModePages/PartyModePage.css';

import { useState } from 'react';

import Moment from 'moment';
import { useParams } from 'react-router';
import { useRecoilState, useSetRecoilState } from 'recoil';

import DebtPanel from './DebtPanel';
import Navbar from "../Common/Navbar";
import LoadingPanel from '../Common/LoadingPanel';
import TransactionList from '../Common/TransactionList';
import SettleYourBillsPanel from './SettleYourBillsPanel';
import LeaveModeButton from '../Common/LeaveModeButton';

import { SettleYourBillsPanelVisibilityState } from '../../atoms/SettleYourBillsPanelVisibility';
import { TransactionsCheckedState } from '../../atoms/TransactionsChecked';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';

import useFetchBudget from '../../hooks/useFetchBudget';
import useFetchTransactions from '../../hooks/useFetchTransactions';

import { getUserListString } from '../../utils';

import DownArrowIcon from '../../assets/images/filter_downarrow.svg';





function PartyModePage() {
    const { id } = useParams();
    const budget = useFetchBudget(id);

    const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);
    const [dateRange, setDateRange] = useState<any>([{
        startDate: new Date(new Date().setMonth(new Date().getMonth()-6)),
        endDate: new Date(),
        key: 'selection'
      }]);
    const [category, setCategory] = useState<string>("");
    const [amountRange, setAmountRange] = useState<any>({
        minAmount: "",
        maxAmount: "",
    })
    const transactions = useFetchTransactions(dateRange, category, amountRange, id);

    const [filterData, setFilterData] = useState<any>({
        startDate: new Date(new Date().setMonth(new Date().getMonth()-6)),
        endDate: new Date(),
        category: "",
        minAmount: "",
        maxAmount: "",
    })
    const gridStyle = {
        gridTemplateRows: filterMenuVisibility
        ? '33% 15% 25% auto':
        '33% 15% auto'
    }

    function handleFilterButton()
    {
        setDateRange([{
            startDate: filterData.startDate,
            endDate: filterData.endDate,
            key: 'selection'
          }]);
        setCategory(filterData.category);
        setAmountRange({
            minAmount: filterData.minAmount,
            maxAmount: filterData.maxAmount,
        });
        setFilterMenuVisibility(false);
    }

    const [showTransactionCheckbox, setShowTransactionCheckbox] = useState(false);
    const [SettleYourBillsPanelVisibility, setSettleYourBillsPanelVisibility] = useRecoilState(SettleYourBillsPanelVisibilityState);
    const [transactionsChecked, setTransactionsChecked] = useRecoilState(TransactionsCheckedState)
    const setTransactionsToSettle = useSetRecoilState(TransactionsToSettleState)

    function handleSettleYourBills()
    {
        if (transactionsChecked.length > 0)
        {
            setSettleYourBillsPanelVisibility(showTransactionCheckbox);
            setTransactionsToSettle(transactionsChecked)
        }
            
        setShowTransactionCheckbox(!showTransactionCheckbox);
        setTransactionsChecked([]);
    }

    return (
      <div className="party-mode-page" data-testid="party-mode-page">
        <Navbar></Navbar>
        {(budget.loading || budget.error) &&<LoadingPanel error={budget.error} color={"white"}/>}
        {!budget.loading &&
        <div className='party-mode-page-content' style={gridStyle}>
            <div className='header'>
                <div className='party-mode-debt-panel'>
                    {(budget.loading || budget.error || transactions.loading || transactions.loading) && 
                        <LoadingPanel error={budget.error || transactions.loading} color={"white"}/>
                    }
                    {!budget.loading && !budget.error && !transactions.loading && !transactions.loading &&
                        <DebtPanel amount={transactions.data.debt}/>
                    }
                </div>
                <div className='party-mode-button-container'>
                    <button className='settle-your-bills-button' onClick={handleSettleYourBills}>Settle your bills</button>
                    <LeaveModeButton budgetId={id}/>
                </div>
                {!budget.loading && !budget.error &&
                <div className='title'>
                    <div className='subtitle'>
                        Party mode with {getUserListString(budget.data.users)}
                    </div>
                    <div className={`maintitle ${budget.data.name.length > 10 ? "maintitle-long" : ""}`}>
                        {budget.data.name.length > 15 ? budget.data.name.substring(0, 12) + "..." : budget.data.name}
                    </div>
                </div>
                }
            </div>
            <div className='party-mode-page-show-filter-menu'>
                Show filter menu
                <div className='party-mode-page-show-filter-menu-icon' onClick={()=>{setFilterMenuVisibility(!filterMenuVisibility)}}>
                    <img src={DownArrowIcon}></img>
                </div>
            </div>
            {filterMenuVisibility && 
            <div className='party-mode-page-filter-menu'>
                <div className='party-mode-page-date-filter-menu party-mode-page-filter-menu-element' style={{gridTemplateColumns:'20% 40% 40%'}}>
                    Dates:
                    <div className='party-mode-page-start-date-filter-menu'>
                        <label>From</label>
                        <input type="date"
                            value={Moment(filterData.startDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, startDate: e.target.value})}
                        />
                    </div>
                    <div className='party-mode-page-end-date-filter-menu'>
                        <label>To</label>
                        <input type="date"
                            value={Moment(filterData.endDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, endDate: e.target.value})}
                        />
                    </div>          
                </div>
                <div className='party-mode-page-category-filter-menu party-mode-page-filter-menu-element' style={{gridTemplateColumns:'20% auto'}}>
                    Categories:
                    <input type="text" style={{marginLeft:'0'}} value={filterData.category}
                            onChange={(e)=>setFilterData({...filterData, category: e.target.value})}></input>
                </div>               
                <div className='party-mode-page-amount-filter-menu party-mode-page-filter-menu-element' style={{gridTemplateColumns:'20% 40% 40%'}}>
                    Amount:
                    <div className='party-mode-page-min-amount-filter-menu'>
                        <label>From</label>
                        <input type="number" step="any" value={filterData.minAmount}
                            onChange={(e)=>setFilterData({...filterData, minAmount: e.target.value})}></input>
                    </div>
                    <div className='party-mode-page-max-amount-filter-menu'>
                        <label>To</label>
                        <input type="number" step="any" value={filterData.maxAmount}
                            onChange={(e)=>setFilterData({...filterData, maxAmount: e.target.value})}></input>
                    </div> 
                </div>              
                <div className='party-mode-page-filter-menu-button-container'>
                    <button className='party-mode-page-filter-menu-button' onClick={handleFilterButton}>
                        Filter
                    </button>
                </div>
            </div>}
            <div className='transactions-list'>
                {!transactions.loading &&
                    <TransactionList 
                        transactions={transactions.data.transactions} 
                        shadow={false} 
                        showUser={true}
                        showTransactionType={true} 
                        showDate={true} 
                        showDeleteIcon={false} 
                        showCheckbox={showTransactionCheckbox}
                        showEditButton={false}
                        showSplitItIcon={false}
                        markDuplicates={false}></TransactionList>
                }
                {transactions.loading &&
                    <LoadingPanel error={transactions.error} color={"white"}/>
                }
            </div>
        </div>
        }
        {SettleYourBillsPanelVisibility &&
        // style={{'display': SettleYourBillsPanelVisibility ? 'flex' : 'none'}}
        <div className='party-mode-pop-up-panel' >
            <SettleYourBillsPanel/>
        </div>
        }
      </div>
    );
  }
  
  export default PartyModePage;