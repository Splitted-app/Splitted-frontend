import '../../css/ModePages/ChooseSettleTransactionPanel.css'

import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import LoadingPanel from '../Common/LoadingPanel';
import TransactionList from '../Common/TransactionList';
import FormInfo from '../Common/FormInfo';

import { ChosenSettleTransactionIdState } from '../../atoms/ChosenSettleTransactionId';
import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';

import useFetchTransactions from '../../hooks/useFetchTransactions';
import api from '../../services/api';


function ChooseSettleTransactionPanel() {

  const transactions = useFetchTransactions()
  const [chosenSettleTransactionId, setChosenSettleTransactionId] = useRecoilState(ChosenSettleTransactionIdState);
  const [transansactionsToSettle, setTransactionsToSettle] = useRecoilState(TransactionsToSettleState)
  const setChooseSettleTransactionPanelVisibility = useSetRecoilState(ChooseSettleTransactionPanelVisibilityState)
  const [errors, setErrors] = useState({
    forbidden: false,
  })

  function handleButtonClicked()
  {
    api.put(`/api/transactions/${chosenSettleTransactionId}/payback/${transansactionsToSettle.join('/')}`, null)
    .then((res)=>{
        setChosenSettleTransactionId("");
        setTransactionsToSettle([]);
        setChooseSettleTransactionPanelVisibility(false);
    })
    .catch((error)=>{
        if (error.response.status === 403)
        {
          setErrors({
            forbidden: true,
          })
        }
        console.error(error);
    })
  }

  function handleCancelButton()
  {
    setChosenSettleTransactionId("");
    setChooseSettleTransactionPanelVisibility(false)
  }


  return (
    <div className="choose-settle-transaction-panel" data-testid="choose-settle-transaction-panel">
      <div className='title'>
        <div className='main-title' data-testid="choose-settle-transaction-panel-main-title">
          Settled with transaction
        </div>
        <div className='subtitle' data-testid="choose-settle-transaction-panel-subtitle">
          Choose transaction that settles this payment.
        </div>
      </div>
      <div className='content-container' data-testid="choose-settle-transaction-panel-transaction-selection-section">
        {(transactions.loading || transactions.error) && <LoadingPanel error={transactions.error} color={"black"}/>}
        {!transactions.loading && !transactions.error &&
          <TransactionList 
            transactions={transactions.data.transactions.sort((t1: any, t2: any)=>
                (new Date(t2.date).getTime() - new Date(t1.date).getTime()))} 
            shadow={false} 
            showUser={false}
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
        {<button className='cancel-button' onClick={handleCancelButton} data-testid="choose-settle-transaction-panel-cancel-button">
          Cancel
        </button>}
        <button className='interaction-button' onClick={handleButtonClicked} disabled={chosenSettleTransactionId === ""} data-testid="choose-settle-transaction-panel-finish-button">
          Finish
        </button>
      </div>
      {errors.forbidden &&
        <div className='error'>
          <FormInfo message='Some of the transactions chosen to settle are yours' textColor='black' details=''/>
        </div>
      }
      
    </div>
  );
}
  
export default ChooseSettleTransactionPanel;