import '../../css/ModePages/SettleYourBillsPanel.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CloseButton from '../Common/CloseButton';

import { SettleYourBillsPanelVisibilityState } from '../../atoms/SettleYourBillsPanelVisibility';
import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';
import { TransactionsToSettleState } from '../../atoms/TransactionsToSettle';
import { UserTokenState } from '../../atoms/UserToken';
import axios from 'axios';

function SettleYourBillsPanel() {

  const token = useRecoilValue(UserTokenState);
    const setSettleYourBillsPanelVisibility= useSetRecoilState(SettleYourBillsPanelVisibilityState);
    const setChooseSettleTransactionPanelVisibility = useSetRecoilState(ChooseSettleTransactionPanelVisibilityState);
    const [transansactionsToSettle, setTransactionsToSettle] = useRecoilState(TransactionsToSettleState)

    function handleSettleInCash()
    {
        axios.put(process.env.REACT_APP_API_URL + `/api/transactions/null/payback/${transansactionsToSettle.join('/')}`, null,
        {
          headers: {
            'Accept': '*',
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          }
        })
        .then((res)=>{
          setTransactionsToSettle([]);
          setSettleYourBillsPanelVisibility(false);
        })
        .catch((error)=>{
          console.error(error);
        })
    }

    function handleSettleWithTransaction()
    {
      // setTransactionsToSettle([]);
      setSettleYourBillsPanelVisibility(false);
      setChooseSettleTransactionPanelVisibility(true);
    }

    return (
      <div className="settle-your-bills-panel">
        <div className="close-button-container">
          <CloseButton setVisibility={setSettleYourBillsPanelVisibility}/>
        </div>
        <div className='title'>
            <div className='main-title'>
                Settle Your Bills
            </div>
            <div className='subtitle'>
                Choose how you want to settle your bills
            </div>
        </div>
        <div className='buttons-container'>
          <div className='settled-in-cash-container'>
            <div className='settled-in-cash-button'>
              <button className='button' onClick={handleSettleInCash}>Settled in cash</button>
            </div>
            <div className='description'>
              Choose if you settled your bills in cash.
            </div>
          </div>
          <div className='settled-with-transactions-container'>
            <div className='settled-with-transactions-button'>
              <button className='button' onClick={handleSettleWithTransaction}>Settled with transaction</button>
            </div>
            <div className='description'>
                Choose if you settled your bills with transactions existing in your budget.  
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default SettleYourBillsPanel;