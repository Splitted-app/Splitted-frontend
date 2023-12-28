import '../../css/HomePage/TransactionsOverview.css'

import { useSetRecoilState } from 'recoil';

import LoadingPanel from '../Common/LoadingPanel';
import TransactionList from '../Common/TransactionList';

import { AddTransactionsPanelVisibilityState } from '../../atoms/AddTransactionsPanelVisbility';

import useFetchTransactions from '../../hooks/useFetchTransactions';

interface TransactionsOverviewInterface
{
  dateRange:any;
}

function TransactionsOverview({dateRange}:TransactionsOverviewInterface) {

    const { data, loading, error } = useFetchTransactions(dateRange)
    const setAddTransactionsPanelVisibility = useSetRecoilState(AddTransactionsPanelVisibilityState);


    return (
      <div className="transactions-overview" data-testid="home-page-transactions-overview">
            <div className='panel-title' data-testid="home-page-transactions-overview-title">
              Transactions
            </div>
            <div className='transaction-list-container'>
              {!loading &&
                <TransactionList 
                  transactions={data.transactions} 
                  shadow={true} 
                  showTransactionType={false} 
                  showDate={false} 
                  showDeleteIcon={true} 
                  showCheckbox={false}
                  showEditButton={true}
                  showSplitItIcon={false}
                  markDuplicates={false}></TransactionList>
              }
              {loading &&
                <LoadingPanel error={error} color={"black"}/>
              }
              
            </div>
            <div className='add-transaction-button-container'>
              <button className='add-transaction-button' onClick={()=>{setAddTransactionsPanelVisibility(true)}} data-testid="transactions-overview-add-transaction-button">+</button>
            </div>
          </div>
    );
  }
  
  export default TransactionsOverview;