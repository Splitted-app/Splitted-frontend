import '../../css/TransactionPage/TransactionPage.css'
import Navbar from "../Common/Navbar"
import TransactionList from '../Common/TransactionList';
import useFetchTransactions from '../../hooks/useFetchTransactions';
import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';
import { useSetRecoilState } from 'recoil';
import TransactionsInsightsPanel from './TransactionsInsightsPanel';

function TransactionPage() {
    const transactions = useFetchTransactions();
    const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);

    return (
      <div className="transaction-page">
        <Navbar></Navbar>
        <div className='transaction-page-content'>
            <div className='header'>
                <div className='insights-panel'>
                    <TransactionsInsightsPanel/>
                </div>
                <div className="add-transactions-button-container">
                    <button className='add-transactions-button'onClick={()=>{setAddTransactionsPanelVisibility(true)}}> Add Transactions</button>
                </div>
                <div className='title'>
                    <div className='main-title'>
                        Transactions
                    </div>
                </div>
            </div>
            <div className='transaction-page-filter-menu'>
                Show filter menu
            </div>
            <div className='transactions-list'>
                <TransactionList transactions={transactions} shadow={false}></TransactionList>
            </div>
        </div>
      </div>
    );
  }
  
  export default TransactionPage;