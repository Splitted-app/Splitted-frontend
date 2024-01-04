import '../../css/ModePages/SettleYourBillsPanel.css';

import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';

import CloseButton from '../Common/CloseButton';
import FormInfo from '../Common/FormInfo';

import { SettleYourBillsPanelVisibilityState } from '../../atoms/SettleYourBillsPanelVisibility';
import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';

import api from '../../services/api';


function SettleYourBillsPanel() {
    const setSettleYourBillsPanelVisibility= useSetRecoilState(SettleYourBillsPanelVisibilityState);
    const setChooseSettleTransactionPanelVisibility = useSetRecoilState(ChooseSettleTransactionPanelVisibilityState);
    const [transansactionsToSettle, setTransactionsToSettle] = useRecoilState(TransactionsToSettleState)
    const [errors, setErrors] = useState({
      forbidden: false,
    })

    function handleSettleInCash()
    {
        api.put(`/api/transactions/null/payback/${transansactionsToSettle.join('/')}`, null)
        .then((res)=>{
          setTransactionsToSettle([]);
          setSettleYourBillsPanelVisibility(false);
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

    function handleSettleWithTransaction()
    {
      setSettleYourBillsPanelVisibility(false);
      setChooseSettleTransactionPanelVisibility(true);
    }

    return (
      <div className="settle-your-bills-panel" data-testid="settle-your-bills-panel">
        <div className="close-button-container">
          <CloseButton setVisibility={setSettleYourBillsPanelVisibility}/>
        </div>
        <div className='title'>
            <div className='main-title' data-testid="settle-your-bills-panel-main-title">
                Settle Your Bills
            </div>
            <div className='subtitle' data-testid="settle-your-bills-panel-subtitle">
                Choose how you want to settle your bills
            </div>
        </div>
        <div className='buttons-container'>
          <div className='settled-in-cash-container'>
            <div className='settled-in-cash-button'>
              <button className='button' onClick={handleSettleInCash} data-testid="settle-your-bills-panel-settled-in-cash-button">Settled in cash</button>
            </div>
            <div className='description'>
              Choose if you settled your bills in cash.
            </div>
          </div>
          <div className='settled-with-transactions-container'>
            <div className='settled-with-transactions-button'>
              <button className='button' onClick={handleSettleWithTransaction} data-testid="settle-your-bills-panel-settled-with-transactions-button">Settled with transaction</button>
            </div>
            <div className='description'>
                Choose if you settled your bills with transactions existing in your budget.  
            </div>
          </div>
        </div>
        {errors.forbidden &&
          <div className='error'>
            <FormInfo message='Some of the transactions chosen to settle are yours' textColor='black' details=''/>
          </div>
        }
        
      </div>
    );
  }
  
  export default SettleYourBillsPanel;