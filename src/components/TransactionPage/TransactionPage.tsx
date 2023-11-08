import '../../css/TransactionPage/TransactionPage.css'
import Navbar from "../Common/Navbar"
import TransactionList from '../Common/TransactionList';
import useFetchTransactions from '../../hooks/useFetchTransactions';
import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import { useSetRecoilState , useRecoilValue, useRecoilState} from 'recoil';
import TransactionsInsightsPanel from './TransactionsInsightsPanel';
import DownArrowIcon from '../../assets/images/filter_downarrow.svg';
import { MenuIconVisibilityState } from '../../atoms/MenuIconVisibility';
import {useEffect} from 'react';
import {useState} from 'react';
import { TransactionsToDeleteState } from '../../atoms/TransactionsToDelete';
import { UserTokenState } from '../../atoms/UserToken'
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';

function TransactionPage() {
    const [dateRange, setDateRange] = useState<any>([{
        startDate: new Date(),
        endDate: new Date(),
        key: 'selection'
      }]);
    const [category, setCategory] = useState<string|null>(null);
    const [amountRange, setAmountRange] = useState<any>([{
        minAmount: null,
        maxAmount: null,
    }])
    const transactions = useFetchTransactions(dateRange, category, amountRange);

    const [filterData, setFilterData] = useState<any>({
        startDate: new Date(),
        endDate: new Date(),
        category: null,
        minAmount: null,
        maxAmount: null,
    })
      
    
    const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const [showDeleteTransactionRadioButton, setShowDeleteTransactionRadioButton] = useState(false);
    const [transactionsToDelete, setTransactionsToDelete ]= useRecoilState<any>(TransactionsToDeleteState);
    const token = useRecoilValue(UserTokenState);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
    const [filterMenuVisibility, setFilterMenuVisibility] = useState(false);

    const ConfirmDeleteTransactionsButtonStyle={
        fontSize: "16px",
        backgroundColor: "#FFDADA",
        color: "#CC3C3C",   
        width: "180px",
        height: "50px",
        border: "3px solid #CC3C3C",
        borderRadius: "33px",
        fontFamily: 'Gotham Bold',
        boxShadow: "5px 5px 3px #180A45"
    }

    const DeleteTransactionsButtonStyle={
        fontSize: "16px",
        backgroundColor: "#20F7C5",
        color: "black",
        width: "180px",
        height: "50px",
        border: "none",
        borderRadius: "33px",
        fontFamily: 'Gotham Bold',
        boxShadow: "5px 5px 3px #180A45"
     
    }

    const gridStyle = {
        gridTemplateRows: filterMenuVisibility
        ? '33% 15% 25% auto':
        '33% 15% auto'

    }

    useEffect(()=>
    {
      setMenuIconVisibility(false);
    },[])

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
    }

    function handleDeleteTransactions()
    {
        if(showDeleteTransactionRadioButton && transactionsToDelete.length!==0)
        {
            console.log(transactionsToDelete.join('/'));
            fetch(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionsToDelete.join('/') , {
                method: 'DELETE',
                headers: {
                  'Accept': '*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
          
                }
              })
                .then(res => {
                    console.log(res);
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
                    <TransactionsInsightsPanel/>
                </div>
                <div className='transaction-page-content-buttons'>
                    <div className="add-transactions-button-container">
                        <button className='add-transactions-button' onClick={()=>{setAddTransactionsPanelVisibility(true)}}> Add Transactions</button>
                    </div>
                    <div className="delete-transactions-button-container">
                        <button className='delete-transactions-button' onClick={handleDeleteTransactions} style={(showDeleteTransactionRadioButton)?ConfirmDeleteTransactionsButtonStyle:DeleteTransactionsButtonStyle}>Delete Transactions</button>
                    </div>
                </div>
                <div className='title'>
                    <div className='main-title'>
                        Transactions
                    </div>
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
                        <input type="date" value={filterData.startDate}
                            onChange={(e)=>setFilterData({...filterData, startDate: e.target.value})}></input>
                    </div>
                    <div className='transaction-page-end-date-filter-menu'>
                        <label>To</label>
                        <input type="date" value={filterData.endDate}
                            onChange={(e)=>setFilterData({...filterData, endDate: e.target.value})}></input>
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
                <TransactionList transactions={transactions} shadow={false} showTransactionType={true} showDeleteIcon={false} showDeleteTransactionRadioButton={showDeleteTransactionRadioButton}></TransactionList>
            </div>
        </div>
      </div>
    );
  }
  
  export default TransactionPage;