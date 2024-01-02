import '../../css/Common/ManualAddTransactionPanel.css'

import { useState } from 'react';

import { useRecoilState, useSetRecoilState} from 'recoil';

import CloseButton from './CloseButton';

import { ManualAddTransactionsPanelVisibilityState } from '../../atoms/ManualAddTransactionsPanelVisbility';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';

import useFetchBudgetId from '../../hooks/useFetchBudgetId';
import api from '../../services/api';


interface ManualAddTransactionPanelInterface {
  amount: number,
  currency: string,
  date: string,
  description: string,
  transactionType: string,
  userCategory: string
}


function ManualAddTransactionPanel() {

  // const [currentDate, setCurrentDate] = useState(getDate());
  const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);

  const budgetId = useFetchBudgetId();
  const setManualAddTransactionsPanelVisibility = useSetRecoilState(ManualAddTransactionsPanelVisibilityState);


  const [data, setData] = useState<ManualAddTransactionPanelInterface>({
    amount: 0,
    currency: "PLN",
    date: Date(),
    description: "",
    transactionType: "Other",
    userCategory: "Job"
  });


  function handleSubmit() {
    api.post('/api/budgets/' + budgetId + '/transactions',
      JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        date: data.date,
        description: data.description,
        transactionType: data.transactionType,
        userCategory: data.userCategory
      }))
      .then((res) => {
        setUpdater(!updater);
      })
      .catch(error=>{
        console.error(error);
      });
    setManualAddTransactionsPanelVisibility(false);
  };

  return (
    <div className="manual-add-transaction-panel" data-testid="manual-add-transaction-panel">
      <div className='close-button-container'>
        <CloseButton setVisibility={setManualAddTransactionsPanelVisibility}/>
      </div>
      
      <div className='title'>
        <div className='main-title' data-testid="manual-add-transaction-panel-main-title">
          Add transactions
        </div>
        <div className='subtitle' data-testid="manual-add-transaction-panel-subtitle">
          Add manually transactions
        </div>
      </div>
      <div className='main-content'>
        <form onSubmit={() => handleSubmit()} data-testid="manual-add-transaction-panel-form">
          <label>
            enter amount:
          </label>
          <input type="number" placeholder='0' className='field-style' onChange={(e: any) => setData({ ...data, amount: e.target.value })} step="any" data-testid="manual-add-transaction-panel-amount-field"></input>
          <label>
            select category
          </label>
            <input type="text" placeholder='category' className='field-style' onChange={(e: any) => setData({ ...data, userCategory: e.target.value })} data-testid="manual-add-transaction-panel-category-field"></input>
          <label>
            enter date
          </label>
          {/* <input type="text" className='field-style' placeholder={currentDate} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={(e:any)=>setData({...data, date:e.target.value})}></input> */}
          <input type="date" className='field-style' value={data.date} onChange={(e: any) => setData({ ...data, date: e.target.value })} data-testid="manual-add-transaction-panel-date-field"></input>
          <label>
            enter notes:
          </label>
          <input type="text" className='field-style' placeholder='notes' onChange={(e: any) => setData({ ...data, description: e.target.value })} data-testid="manual-add-transaction-panel-notes-field"></input>
          <div className='add-button-container'>
            <input type='submit' className='add-button' value="Add" data-testid="manual-add-transaction-panel-add-button" />
          </div>
        </form>
      </div>
    </div>
  );
}
export default ManualAddTransactionPanel;