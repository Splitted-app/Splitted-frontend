import '../../css/Common/Transaction.css';
import { CurrencyState } from '../../atoms/Currency';
import {useState} from 'react';
import { useRecoilValue , useRecoilState} from 'recoil';
// import EditTransactionIcon from '../../assets/images/three_dots.svg'
import EditTransactionIcon from '../../assets/images/edit_transaction.png'
import DeleteTransactionIcon from '../../assets/images/delete_transaction.png'
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import UpdateTransactionIcon from '../../assets/images/update.png'

import { UserTokenState } from '../../atoms/UserToken'
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
    showDeleteIcon:boolean
}


function Transaction({transaction, showUser, showTransactionType, showDeleteIcon}: TransactionPropsInterface) {
    const [amount, setAmount] = useState(transaction.amount);
    const [category, setCategory] = useState((transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory);
    const [userCategory, setUserCategory] = useState(transaction.userCategory);
    const [currency, setCurrency] = useRecoilState(CurrencyState);
    const [transactionType, setTransactionType] = useState(transaction.transactionType);
    const [description, setDescription] = useState(transaction.description);
    const transactionId = transaction.id;
    const token = useRecoilValue(UserTokenState);
    const [editable, setEditable] = useState(false);

    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);

    const gridStyle = {
        gridTemplateColumns: showUser && showTransactionType
        ? '20% 15% 15% 20% auto'
        : showUser && !showTransactionType
        ? '20% 15% 20% auto'
        : !showUser && showTransactionType
        ? '20% 15% 20% auto'
        : '20% 20% auto '

    }

    function handleDeleteTransactionButton()
    {
        fetch(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionId , {
            method: 'DELETE',
            headers: {
              'Accept': '*',
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
      
            }
          })
            .then(res => {
                console.log(res);
              if (!res.ok) {
                throw Error('could not fetch the data for that resource');
              }
              setUpdater(!updater);
            });
    }

    function handleEditTransactionButton()
    {
        if(editable)
        {
            fetch(process.env.REACT_APP_API_URL + '/api/transactions/' + transactionId , {
                method: 'PUT',
                headers: {
                  'Accept': '*',
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${token}`,
          
                },
                body: JSON.stringify({
                    amount: amount,
                    currency: currency,
                    date: transaction.date,
                    description: description,
                    transactionType: transactionType,
                    userCategory: userCategory
                  })
              })
                .then(res => {
                    console.log(res);
                  if (!res.ok) {
                    throw Error('could not fetch the data for that resource');
                  }
                  setUpdater(!updater);
                });
        }

        setEditable(!editable)
    }

    return (
      <div className="transaction">
        <div className='transaction-content' style={gridStyle}>
            <div className='category transaction-element' contentEditable={editable} onChange={(e:any)=>{setUserCategory(e.target.value)}}>
                {category}
            </div>
            {showUser &&
            <div className='user transaction-element'>
                User
            </div>
            }
            {showTransactionType &&
            <div className='transactionType transaction-element' contentEditable={editable}  onChange={(e:any)=>{setTransactionType(e.target.value)}}>
                {transactionType}
            </div>
            }
            <div className='description transaction-element'contentEditable={editable} onChange={(e:any)=>{setDescription(e.target.value)}}>
                {description}
            </div>
            <div className='amount transaction-element' style={{color:(amount>=0)? "#35B736" : "#CB3939"}} contentEditable={editable}  onChange={(e:any)=>{setAmount(e.target.value)}}>
                {transaction.amount}
                <div className='currency transaction-element' onChange={(e:any)=>{setCurrency(e.target.value)}}>
                    {currency}
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