import '../../css/TransactionPage/TransactionPage.css'

import { useEffect, useRef, useState } from 'react';

import Moment from 'moment';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import LoadingPanel from '../Common/LoadingPanel';
import Navbar from "../Common/Navbar"
import TransactionList from '../Common/TransactionList';
import TransactionsInsightsPanel from './TransactionsInsightsPanel';

import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import { TransactionsToDeleteState } from '../../atoms/TransactionsToDelete';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import { UserTokenState } from '../../atoms/UserToken'

import useFetchTransactions from '../../hooks/useFetchTransactions';
import useFetchUserBudgets from '../../hooks/useFetchUserBudgets';

import DownArrowIcon from '../../assets/images/filter_downarrow.svg';



function TransactionPage() {
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
    const {data, loading, error } = useFetchTransactions(dateRange, category, amountRange);

    const [filterData, setFilterData] = useState<any>({
        startDate: new Date(new Date().setMonth(new Date().getMonth()-6)),
        endDate: new Date(),
        category: "",
        minAmount: "",
        maxAmount: "",
    })



    useEffect(()=>{
        setMenuIconVisibility(false);
    },[])

    const userBudgets = useFetchUserBudgets()
    const [userIsInPartnerBudget, setUserIsInPartnerBudget] = useState<boolean>(false);
    useEffect(()=>{
        setUserIsInPartnerBudget(userBudgets.find((budget: any) => budget.budgetType === 'Partner'));
    }, [userBudgets])
      
    
    const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const [showDeleteTransactionRadioButton, setShowDeleteTransactionRadioButton] = useState(false);
    const [transactionsToDelete, setTransactionsToDelete ]= useRecoilState<any>(TransactionsToDeleteState);
    const token = useRecoilValue(UserTokenState);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);

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

    function handleDeleteTransactions()
    {
        if(showDeleteTransactionRadioButton && transactionsToDelete.length!==0)
        {
            fetch(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionsToDelete.join('/') , {
                method: 'DELETE',
                headers: {
                  'Accept': '*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
          
                }
              })
                .then(res => {
                  if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                  }
                  setUpdater(!updater);
                });
        }
        setShowDeleteTransactionRadioButton(!showDeleteTransactionRadioButton);
        setTransactionsToDelete([]);
    }

    return (
      <div className="transaction-page">
        <Navbar></Navbar>
        <div className='transaction-page-content' style={gridStyle}>
            <div className='header'>
                <div className='insights-panel'>
                    <TransactionsInsightsPanel expenses={data.expenses} income={data.income}/>
                </div>
                <div className='transaction-page-content-buttons'>
                    <div className="add-transactions-button-container">
                        <button className='add-transactions-button' onClick={()=>{setAddTransactionsPanelVisibility(true)}}> Add Transactions</button>
                    </div>
                    <div className="delete-transactions-button-container">
                        <button className={`${showDeleteTransactionRadioButton ? "active-delete-transactions-button": "delete-transactions-button"}`} onClick={handleDeleteTransactions} /*style={(showDeleteTransactionRadioButton)?ConfirmDeleteTransactionsButtonStyle:DeleteTransactionsButtonStyle}*/>Delete Transactions</button>
                    </div>
                </div>
                <div className='title'>
                        Transactions
                </div>
            </div>
            <div className='transaction-page-show-filter-menu'>
                Show filter menu
                <div className='transaction-page-show-filter-menu-icon' onClick={()=>{setFilterMenuVisibility(!filterMenuVisibility)}}>
                    <img src={DownArrowIcon}></img>
                </div>
            </div>
            {filterMenuVisibility && 
            <div className='transaction-page-filter-menu'>
                <div className='transaction-page-date-filter-menu transaction-page-filter-menu-element' style={{gridTemplateColumns:'20% 40% 40%'}}>
                    Dates:
                    <div className='transaction-page-start-date-filter-menu'>
                        <label>From</label>
                        <input type="date"
                            value={Moment(filterData.startDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, startDate: e.target.value})}
                        />
                    </div>
                    <div className='transaction-page-end-date-filter-menu'>
                        <label>To</label>
                        <input type="date"
                            value={Moment(filterData.endDate).format('yyyy-MM-DD')}
                            onChange={(e)=>setFilterData({...filterData, endDate: e.target.value})}
                        />
                    </div>          
                </div>
                <div className='transaction-page-category-filter-menu transaction-page-filter-menu-element' style={{gridTemplateColumns:'20% auto'}}>
                    Categories:
                    <input type="text" style={{marginLeft:'0'}} value={filterData.category}
                            onChange={(e)=>setFilterData({...filterData, category: e.target.value})}></input>
                </div>               
                <div className='transaction-page-amount-filter-menu transaction-page-filter-menu-element' style={{gridTemplateColumns:'20% 40% 40%'}}>
                    Amount:
                    <div className='transaction-page-min-amount-filter-menu'>
                        <label>From</label>
                        <input type="number" step="any" value={filterData.minAmount}
                            onChange={(e)=>setFilterData({...filterData, minAmount: e.target.value})}></input>
                    </div>
                    <div className='transaction-page-max-amount-filter-menu'>
                        <label>To</label>
                        <input type="number" step="any" value={filterData.maxAmount}
                            onChange={(e)=>setFilterData({...filterData, maxAmount: e.target.value})}></input>
                    </div> 
                </div>              
                <div className='transaction-page-filter-menu-button-container'>
                    <button className='transaction-page-filter-menu-button' onClick={handleFilterButton}>
                        Filter
                    </button>
                </div>
            </div>}
            <div className='transactions-list'>
                {!loading &&
                    <TransactionList 
                        transactions={data.transactions} 
                        shadow={false} 
                        showTransactionType={true} 
                        showDate={true} 
                        showDeleteIcon={false} 
                        showDeleteTransactionRadioButton={showDeleteTransactionRadioButton}
                        showEditButton={true}
                        showSplitItIcon={userIsInPartnerBudget}
                        markDuplicates={false}></TransactionList>
                }
                {loading &&
                    <LoadingPanel error={error}/>
                }
                
            </div>
        </div>
      </div>
    );
  }
  
  export default TransactionPage;