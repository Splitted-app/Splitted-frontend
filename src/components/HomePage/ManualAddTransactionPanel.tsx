import '../../css/HomePage/ManualAddTransactionPanel.css'
import { useState } from 'react';
import { BudgetIdState } from '../../atoms/BudgetId';
import { useRecoilValue } from 'recoil';
import {UserTokenState} from '../../atoms/UserToken'

function getDate() {
    const today = new Date();
    let month = today.getMonth() + 1;
    let longMonth =month + '';
    if(month<10)
        longMonth= '' + 0 + month;
    const year = today.getFullYear();
    const date = today.getDate();
    let longDate =date + '';
    if(date<10)
        longDate= '' + 0 + date;
    return `${longDate}.${longMonth}.${year}`;
  }
  
  interface ManualAddTransactionPanel
  {
    setManualAddTransactionPanelVisible:Function;
  }
  interface ManualAddTransactionPanelInterface
{
   amount:number,
   currency:string, 
   date:string,
   description:string,
   transactionType:string,
   userCategory:string
}


function ManualAddTransactionPanel({setManualAddTransactionPanelVisible} : ManualAddTransactionPanel) {

  const [currentDate, setCurrentDate] = useState(getDate());
  const budgetId = useRecoilValue(BudgetIdState);
  const token = useRecoilValue(UserTokenState);
  const [data, setData] = useState<ManualAddTransactionPanelInterface>({
    amount: 0,
    currency: "PLN",
    date:Date(),
    description:"test",
    transactionType:"Other",
    userCategory:"Job"
});


  function handleSubmit()
  {
    console.log(data);
    fetch('https://localhost:7012/api/budgets/' + budgetId + '/transactions',{
      method: 'POST',
      headers: { 
          'Accept': '*',
          'Content-Type': 'application/json',
          'Authorization' : `Bearer ${token}`,

      },
      body: JSON.stringify({
        amount: data.amount,
        currency: data.currency,
        date: data.date,
        description: data.description,
        transactionType: data.transactionType,
        userCategory: data.userCategory
      })
      })
      .then(res=>{
          if(!res.ok)
          {
              throw Error('could not fetch the data for that resource');
          }
          return res.json();
      })
      .then((data)=>{
        console.log(data);
      });
    setManualAddTransactionPanelVisible(false);
  };

    return (
      <div className="manual-add-transaction-panel">
        <div className='title'>
          <div className='main-title'>
            Add transactions
          </div>
          <div className='subtitle'>
            Add manually transactions
          </div>
        </div>
        <div className='main-content'>
          <form onSubmit={()=>handleSubmit()}>
            <label>
              enter amount:
            </label>
            <input type="number" placeholder='0' className='field-style' onChange={(e:any)=>setData({...data, amount:e.target.value})}></input>
            <label>
              select category
            </label>
            <select className='field-style' onChange={(e:any)=>setData({...data, userCategory:e.target.value})}>
              <option value="Job">Job</option>
              <option value="Grocery">Grocery</option>
            </select> 
            <label>
              enter date
            </label>
            {/* <input type="text" className='field-style' placeholder={currentDate} onFocus={(e) => (e.target.type = "date")} onBlur={(e) => (e.target.type = "text")} onChange={(e:any)=>setData({...data, date:e.target.value})}></input> */}
            <input type="date" className='field-style' value={data.date} onChange={(e:any)=>setData({...data, date:e.target.value})}></input>
            <label>
              enter notes:
            </label>
            <input type="text" className='field-style'placeholder='notes' onChange={(e:any)=>setData({...data, description:e.target.value})} ></input>
            <div className='add-button-container'>
              <input type='submit' className='add-button' value="Add"/>
            </div>
          </form>
        </div>
      </div>
    );
  }
  export default ManualAddTransactionPanel;