import '../../css/Common/Transaction.css';

import { useState } from 'react';

import { useMediaQuery } from 'react-responsive'
import axios from 'axios';
import Moment from 'moment';
import { useRecoilValue , useRecoilState} from 'recoil';

import { TransactionsToDeleteState } from '../../atoms/TransactionsToDelete';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import { UserTokenState } from '../../atoms/UserToken'
import { NewTransactionsState } from '../../atoms/NewTransactions';

import { TransactionTypes } from '../../enums';
import { amountFormatter } from '../../utils';

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
    duplicatedTransaction: any|null
}

interface TransactionPropsInterface
{
    transaction: TransactionInterface,
    showUser: boolean,
    showTransactionType: boolean,
    showDate:boolean
    showDeleteIcon:boolean,
    showDeleteTransactionRadioButton:boolean,
    markDuplicate:boolean,
}


function Transaction({
  transaction, 
  showUser, 
  showTransactionType, 
  showDate, 
  showDeleteIcon, 
  showDeleteTransactionRadioButton, 
  markDuplicate}: TransactionPropsInterface) {
    const [amount, setAmount] = useState(transaction.amount);
    const [userCategory, setUserCategory] = useState(transaction.userCategory);
    const [transactionType, setTransactionType] = useState(transaction.transactionType);
    const [description, setDescription] = useState(transaction.description);
    const transactionId: string = transaction.id;
    const token = useRecoilValue(UserTokenState);
    const [editable, setEditable] = useState(false);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
    const [transactionsToDelete, setTransactionsToDelete] = useRecoilState<any>(TransactionsToDeleteState);
    const [newTransactions, setNewTransactions] = useRecoilState<any>(NewTransactionsState);

    const minified = useMediaQuery({ query: '(max-width: 1300px)' })
    let gridTemplateColumns = '';
    gridTemplateColumns += showDeleteTransactionRadioButton ? '5% ' : ''; // delete checkbox
    gridTemplateColumns += '20% '; // category
    gridTemplateColumns += showTransactionType && !minified ? '10% ' : ''; // transaction type
    gridTemplateColumns += showDate && !minified ? '15% ' : ''; // date
    gridTemplateColumns += showUser && !minified ? '15% ' : ''; // user
    gridTemplateColumns += 'auto '; // description
    gridTemplateColumns += minified ? '100px' : '150px'; // amount

    const gridStyle = {
      gridTemplateColumns: gridTemplateColumns
    };

    function handleAmountChanged(value: string)
    {
      try
      {
        const parsedValue: string = value
          .replace(',', '.')            // change ',' to '.'
          .replace(/[.](?=.*[.])/g, "") // remove all '.' but the last one
          .replace(/[^0-9.-]/g, "")      // remove all characters that are not a digit, '.' or '-'
          .replace(/(?!^)-/, "");
        let numValue = Number(parsedValue);
        numValue = Math.round((numValue + Number.EPSILON) * 100) / 100; 
        setAmount(numValue);
      }
      catch 
      {
        console.log(`Could not parse ${value} into a number`)
      }
    }

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
            const idx = newTransactions.indexOf(transaction);
            if (idx > -1)
            {
              const newNewTransactions = [...newTransactions]
              newNewTransactions.splice(idx, 1);
              setNewTransactions(newNewTransactions);
            }
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

    function adjustContent(target: any, toLeft: boolean = true)
    {
      if (toLeft)
        target.scrollLeft = 0;
      else
        target.scrollLeft = target.scrollWidth - target.clientWidth;
    }

    return (
      <div className={`transaction ${transaction.duplicatedTransaction && markDuplicate ? "duplicate" : ""}`}>
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
            <div className={`category transaction-element element-margin ${editable ? "editable-content" : ""}`}
                  contentEditable={editable} 
                  onInput={(e:any)=>{setUserCategory(e.currentTarget.textContent)}}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {adjustContent(e.target)}}>
                {(transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory}
            </div>
            {showTransactionType && !minified &&
            <div className={`transactionType transaction-element element-margin ${editable ? "editable-content" : ""}`}>
                {!editable && transaction.transactionType}
                {editable && 
                <select value={transactionType} onChange={(e)=>{setTransactionType(e.target.value)}}>
                  <option value={TransactionTypes.Blik}>{TransactionTypes.Blik}</option>
                  <option value={TransactionTypes.Card}>{TransactionTypes.Card}</option>
                  <option value={TransactionTypes.Transfer}>{TransactionTypes.Transfer}</option>
                  <option value={TransactionTypes.Other}>{TransactionTypes.Other}</option>
                </select>}
            </div>
            }
            {showDate && !minified &&
            <div className='date transaction-element'>
              {Moment(transaction.date).format('DD.MM.yyyy')}
            </div>}
            {showUser && !minified &&
            <div className='user transaction-element'>
                User
            </div>
            }

            <div className={`description transaction-element element-margin ${editable ? "editable-content" : ""}`}
                  contentEditable={editable} 
                  onInput={(e:any)=>{setDescription(e.currentTarget.textContent)}}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {adjustContent(e.target)}}>
                {transaction.description}
            </div>
            <div className='amount transaction-element' style={{color:(amount>=0)? "#35B736" : "#CB3939"}} >
                <div className={`transaction-element ${editable ? "editable-content" : ""}`}
                      contentEditable={editable}  
                      onInput={(e:any)=>{handleAmountChanged(e.currentTarget.textContent)}}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {adjustContent(e.target)}}>
                    {editable ? transaction.amount.toFixed(2) : amountFormatter(transaction.amount)}
                </div>
                <div className='transaction-element' style={{minWidth: 'fit-content'}}>
                    {transaction.currency}
                </div>
            </div>
        </div>
        <div className='transaction-edit-button-container' >
            <button onClick={handleEditTransactionButton}>
                <img src={(editable)?UpdateTransactionIcon:EditTransactionIcon} /*style={{width:(showDeleteIcon)?"80%" : "50%"}}*/></img>
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