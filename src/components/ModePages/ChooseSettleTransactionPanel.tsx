import '../../css/Common/ImportCsvCheck.css'

import { useEffect, useState } from 'react';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import Moment from 'moment';

import TransactionList from '../Common/TransactionList';

import { ChosenSettleTransactionIdState } from '../../atoms/ChosenSettleTransactionId';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';
import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';

import { UserTokenState } from '../../atoms/UserToken'

import useFetchTransactions from '../../hooks/useFetchTransactions';
import LoadingPanel from '../Common/LoadingPanel';
import axios from 'axios';


function ChooseSettleTransactionPanel() {

  const transactions = useFetchTransactions()
  const chosenSettleTransactionId = useRecoilValue(ChosenSettleTransactionIdState);
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
        setTransactionsToSettle([]);
        setChooseSettleTransactionPanelVisibility(false);
    })
    .catch((error)=>{
        console.error(error);
    })
  }


  return (
    <div className="import-csv-check">
      <div className='title'>
        Let's check
      </div>
      <div className='content-container'>
        {(transactions.loading || transactions.error) && <LoadingPanel error={transactions.error}/>}
        {!transactions.loading && !transactions.error &&
          <TransactionList 
            transactions={transactions.data.transactions.sort((t1: any, t2: any)=>
                (new Date(t1.date).getTime() - new Date(t2.date).getTime()))} 
            shadow={false} 
            showTransactionType={true} 
            showDate={true} 
            showDeleteIcon={false} 
            showCheckbox={false}
            showEditButton={false}
            showSplitItIcon = {false}
            markDuplicates={false}></TransactionList>
        }
      </div>
      <div className='button-container'>
        {<button className='cancel-button' onClick={()=>setChooseSettleTransactionPanelVisibility(false)}>
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