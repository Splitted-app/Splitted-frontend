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
    const transactions = useFetchTransactions();
    const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);
    const setMenuIconVisibility = useSetRecoilState(MenuIconVisibilityState);
    const [showDeleteTransactionRadioButton, setShowDeleteTransactionRadioButton] = useState(false);
    const [transactionsToDelete, setTransactionsToDelete ]= useRecoilState<any>(TransactionsToDeleteState);
    const token = useRecoilValue(UserTokenState);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);

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

    useEffect(()=>
    {
      setMenuIconVisibility(false);
    },[])

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
        <div className='transaction-page-content'>
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
            <div className='transaction-page-filter-menu'>
                Show filter menu
                <div className='transaction-page-filter-menu-icon'>
                    <img src={DownArrowIcon}></img>
                </div>
            </div>
            <div className='transactions-list'>
                <TransactionList transactions={transactions} shadow={false} showTransactionType={true} showDeleteIcon={false} showDeleteTransactionRadioButton={showDeleteTransactionRadioButton}></TransactionList>
            </div>
        </div>
      </div>
    );
  }
  
  export default TransactionPage;