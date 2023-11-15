import '../../css/Common/Transaction.css';

import { useState } from 'react';

import axios from 'axios';
import Moment from 'moment';
import { useRecoilValue , useRecoilState} from 'recoil';

import { TransactionsToDeleteState } from '../../atoms/TransactionsToDelete';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import { UserTokenState } from '../../atoms/UserToken'

import { TransactionTypes } from '../../enums';

import DeleteTransactionIcon from '../../assets/images/delete_transaction.png'
import EditTransactionIcon from '../../assets/images/edit_transaction.png'
import UpdateTransactionIcon from '../../assets/images/update.png'


interface TransactionInterface
{
    id:string,
    amount:number,
    currency:string,
    date:string,
    description:string,
    transactionType:string,
    bankCategory:string,
    autoCategory:string,
    userCategory:string
    userId:string
}

interface TransactionPropsInterface
{
    transaction: TransactionInterface,
    showUser: boolean,
    showTransactionType: boolean,
    showDate:boolean
    showDeleteIcon:boolean,
    showDeleteTransactionRadioButton:boolean
}


function Transaction({transaction, showUser, showTransactionType, showDate, showDeleteIcon, showDeleteTransactionRadioButton}: TransactionPropsInterface) {
    const [amount, setAmount] = useState(transaction.amount);
    // const [category, setCategory] = useState((transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory);
    const [userCategory, setUserCategory] = useState(transaction.userCategory);
    // const currency = useRecoilValue(CurrencyState);
    const [transactionType, setTransactionType] = useState(transaction.transactionType);
    const [description, setDescription] = useState(transaction.description);
    const transactionId: string = transaction.id;
    const token = useRecoilValue(UserTokenState);
    const [editable, setEditable] = useState(false);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
    const [transactionsToDelete, setTransactionsToDelete] = useRecoilState<any>(TransactionsToDeleteState);

    let gridTemplateColumns = '';
    gridTemplateColumns += showDeleteTransactionRadioButton ? '5% ' : '';
    gridTemplateColumns += '20% ';
    gridTemplateColumns += showTransactionType ? '10% ' : '';
    gridTemplateColumns += showDate ? '15% ' : '';
    gridTemplateColumns += showUser ? '15% ' : '';
    gridTemplateColumns += 'auto ';
    gridTemplateColumns += '10%';

    const gridStyle = {
      gridTemplateColumns: gridTemplateColumns
    };

    function handleDeleteTransactionButton()
    {
        axios.delete(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionId , {
            headers: {
              'Accept': '*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
      
            }
          })
          .then(res => {
            setUpdater(!updater);
          })
          .catch((error) => {
            console.error(error);
          });
    }

    function handleEditTransactionButton()
    {
        if(editable)
        {
            axios.put(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionId,
              JSON.stringify({
                amount: amount,
                date: transaction.date,
                description: description,
                transactionType: transactionType,
                userCategory: userCategory
              }),
              {
                headers: {
                  'Accept': '*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
          
                },
              })
              .then(res => {
                setUpdater(!updater);
              })
              .catch((error) => {
                console.error(error);
              });
        }

        setEditable(!editable)
    }

    function handleDeleteMultipleTransactionsButton(checked : boolean)
    {
        if (checked)
        {
          const newTransactionsToDelete= transactionsToDelete.concat([transactionId]);
          setTransactionsToDelete(newTransactionsToDelete);
        }
        else
        {
          
          const idx = transactionsToDelete.indexOf(transactionId);
          if (idx > -1)
          {
            const newTransactionsToDelete = [...transactionsToDelete]
            newTransactionsToDelete.splice(idx, 1);
            setTransactionsToDelete(newTransactionsToDelete);
          }
        }
    }

    return (
      <div className="transaction">
        <div className='transaction-content' style={gridStyle}>
            {showDeleteTransactionRadioButton && 
            <label className='delete-transaction-checkbox-container '>
              <input type="checkbox" 
                      className='delete-transaction-checkbox' 
                      onChange={(e)=>handleDeleteMultipleTransactionsButton(e.target.checked)}>
              </input>
              <span className="checkmark">
              </span>
            </label>}
            <div className='category transaction-element' contentEditable={editable}  onInput={(e:any)=>{setUserCategory(e.currentTarget.textContent)}}>
                {(transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory}
            </div>
            {showTransactionType &&
            <div className='transactionType transaction-element'>
                {!editable && transaction.transactionType}
                {editable && <select value={transactionType} onChange={(e)=>{setTransactionType(e.target.value)}}>
                <option value={TransactionTypes.Blik}>{TransactionTypes.Blik}</option>
                <option value={TransactionTypes.Card}>{TransactionTypes.Card}</option>
                <option value={TransactionTypes.Transfer}>{TransactionTypes.Transfer}</option>
                <option value={TransactionTypes.Other}>{TransactionTypes.Other}</option>
                </select>}
            </div>
            }
            {showDate &&
            <div className='date transaction-element'>
              {Moment(transaction.date).format('DD.MM.yyyy')}
            </div>}
            {showUser &&
            <div className='user transaction-element'>
                User
            </div>
            }

            <div className='description transaction-element' contentEditable={editable} onInput={(e:any)=>{setDescription(e.currentTarget.textContent)}}>
                {transaction.description}
            </div>
            <div className='amount transaction-element' style={{color:(amount>=0)? "#35B736" : "#CB3939"}} >
                <div className='number transaction-element' contentEditable={editable}  
                  onInput={(e:any)=>{setAmount(e.currentTarget.textContent)}}>
                    {transaction.amount}
                </div>
                <div className='currency transaction-element'>
                    {transaction.currency}
                </div>
            </div>
        </div>
        <div className='transaction-edit-button-container' >
            <button onClick={handleEditTransactionButton}>
                <img src={(editable)?UpdateTransactionIcon:EditTransactionIcon} style={{width:(showDeleteIcon)?"80%" : "50%"}}></img>
            </button>
        </div>
        {showDeleteIcon && <div className='transaction-delete-button-container'>
            <button onClick={handleDeleteTransactionButton}>
                <img src={DeleteTransactionIcon}></img>
            </button>
        </div>}
      </div>
    );
  }
  
  export default Transaction;