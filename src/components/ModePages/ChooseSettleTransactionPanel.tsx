import '../../css/ModePages/ChooseSettleTransactionPanel.css'

import axios from 'axios';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import LoadingPanel from '../Common/LoadingPanel';
import TransactionList from '../Common/TransactionList';

import { ChosenSettleTransactionIdState } from '../../atoms/ChosenSettleTransactionId';
import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';
import { UserTokenState } from '../../atoms/UserToken'

import useFetchTransactions from '../../hooks/useFetchTransactions';



function ChooseSettleTransactionPanel() {

  const transactions = useFetchTransactions()
  const [chosenSettleTransactionId, setChosenSettleTransactionId] = useRecoilState(ChosenSettleTransactionIdState);
  const [transansactionsToSettle, setTransactionsToSettle] = useRecoilState(TransactionsToSettleState)
  const setChooseSettleTransactionPanelVisibility = useSetRecoilState(ChooseSettleTransactionPanelVisibilityState)
  const token = useRecoilValue(UserTokenState);

  function handleButtonClicked()
  {
    axios.put(process.env.REACT_APP_API_URL + `/api/transactions/${chosenSettleTransactionId}/payback/${transansactionsToSettle.join('/')}`, null,
    {
        headers: {
        'Accept': '*',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        }
    })
    .then((res)=>{
        setChosenSettleTransactionId("");
        setTransactionsToSettle([]);
        setChooseSettleTransactionPanelVisibility(false);
    })
    .catch((error)=>{
        console.error(error);
    })
  }

  function handleCancelButton()
  {
    setChosenSettleTransactionId("");
    setChooseSettleTransactionPanelVisibility(false)
  }


  return (
    <div className="choose-settle-transaction-panel">
      <div className='title'>
        <div className='main-title'>
          Settled with transaction
        </div>
        <div className='subtitle'>
          Choose transaction that settles this payment.
        </div>
      </div>
      <div className='content-container'>
        {(transactions.loading || transactions.error) && <LoadingPanel error={transactions.error} color={"black"}/>}
        {!transactions.loading && !transactions.error &&
          <TransactionList 
            transactions={transactions.data.transactions.sort((t1: any, t2: any)=>
                (new Date(t2.date).getTime() - new Date(t1.date).getTime()))} 
            shadow={false} 
            showTransactionType={true} 
            showDate={true} 
            showDeleteIcon={false} 
            showCheckbox={true}
            showEditButton={false}
            showSplitItIcon = {false}
            markDuplicates={false}></TransactionList>
        }
      </div>
      <div className='button-container'>
        {<button className='cancel-button' onClick={handleCancelButton}>
          Cancel
        </button>}
        <button className='interaction-button' onClick={handleButtonClicked} disabled={chosenSettleTransactionId === ""}>
          Finish
        </button>
      </div>
    </div>
  );
}
  
export default ChooseSettleTransactionPanel;