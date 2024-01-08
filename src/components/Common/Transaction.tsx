import '../../css/Common/Transaction.css';

import { useEffect, useState } from 'react';

import { useMediaQuery } from 'react-responsive'
import Moment from 'moment';
import { useRecoilValue , useRecoilState, useSetRecoilState} from 'recoil';

import { ChooseSettleTransactionPanelVisibilityState } from '../../atoms/ChooseSettleTransactionPanel';
import { TransactionsCheckedState } from '../../atoms/TransactionsChecked';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';
import { NewTransactionsState } from '../../atoms/NewTransactions';
import { SplitItPanelState } from '../../atoms/SplitItPanel';
import { ApproveSettlePanelState } from '../../atoms/ApproveSettlePanel';
import { ChosenSettleTransactionIdState } from '../../atoms/ChosenSettleTransactionId';

import { TransactionTypes } from '../../enums';
import { amountFormatter } from '../../utils';

import DeleteTransactionIcon from '../../assets/images/delete_transaction.png'
import EditTransactionIcon from '../../assets/images/edit_transaction.png'
import SplitItIcon from '../../assets/images/split.png'
import UpdateTransactionIcon from '../../assets/images/update.png'
import api from '../../services/api';

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
    transactionPayBacks:Array<any>
}

interface TransactionPropsInterface
{
    transaction: TransactionInterface,
    showUser: boolean,
    showTransactionType: boolean,
    showDate:boolean
    showDeleteIcon:boolean,
    showCheckbox:boolean,
    showEditButton:boolean,
    showSplitItIcon:boolean,
    markDuplicate:boolean,
    
}


function Transaction({
  transaction, 
  showUser, 
  showTransactionType, 
  showDate, 
  showDeleteIcon, 
  showCheckbox,
  showEditButton,
  showSplitItIcon,
  markDuplicate,}: TransactionPropsInterface) {
    const [amount, setAmount] = useState(transaction.amount);
    const [userCategory, setUserCategory] = useState(transaction.userCategory);
    const [transactionType, setTransactionType] = useState(transaction.transactionType);
    const [description, setDescription] = useState(transaction.description);
    const transactionId: string = transaction.id;
    const [editable, setEditable] = useState(false);
    const [updater, setUpdater] = useRecoilState(TransactionUpdaterState);
    const [transactionsChecked, setTransactionsChecked] = useRecoilState<any>(TransactionsCheckedState);
    const [newTransactions, setNewTransactions] = useRecoilState<any>(NewTransactionsState);
    const setSplitItPanel = useSetRecoilState(SplitItPanelState);
    const setApproveSettlePanel = useSetRecoilState(ApproveSettlePanelState);
    const [recentlySplit, setRecentlySplit] = useState<boolean>(false);
    const waitingForApproval = transaction.transactionPayBacks.find(pb=>pb.transactionPayBackStatus === "WaitingForApproval");
    const chooseSettleTransactionPanelVisibility = useRecoilValue(ChooseSettleTransactionPanelVisibilityState);
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [chosenSettleTransactionId, setChosenSettleTransactionId] = useRecoilState(ChosenSettleTransactionIdState);

    const minified = useMediaQuery({ query: '(max-width: 1300px)'})
    const showAsRows = useMediaQuery({ query: '(max-width: 850px)'})
    let gridTemplateColumns = '';
    gridTemplateColumns += showCheckbox ? '5% ' : ''; // delete checkbox
    gridTemplateColumns += '20% '; // category
    gridTemplateColumns += showTransactionType && !minified ? '10% ' : ''; // transaction type
    gridTemplateColumns += showDate && !minified ? '15% ' : ''; // date
    gridTemplateColumns += showUser && !minified ? '15% ' : ''; // user
    gridTemplateColumns += 'auto '; // description
    gridTemplateColumns += minified ? '100px ' : '150px '; // amount
    gridTemplateColumns += showSplitItIcon ? '5% ' : ''; //split it icon
    const gridStyle = {
      gridTemplateColumns: gridTemplateColumns
    };

    useEffect(()=>{
      if (!showCheckbox)
        setIsChecked(false);
    }, [showCheckbox])

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
        api.delete('/api/transactions/' + transactionId)
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
            api.put('/api/transactions/' + transactionId,
              JSON.stringify({
                amount: amount,
                date: transaction.date,
                description: description,
                transactionType: transactionType,
                userCategory: userCategory
              }))
              .then(res => {
                setUpdater(!updater);
              })
              .catch((error) => {
                console.error(error);
              });
        }

        setEditable(!editable)
    }

    function handleCheckboxChange(checked : boolean)
    {
      if (!chooseSettleTransactionPanelVisibility)
      {
        setIsChecked(checked);
        if (checked)
        {
          const newTransactionsChecked= transactionsChecked.concat([transactionId]);
          setTransactionsChecked(newTransactionsChecked);
        }
        else
        {
          
          const idx = transactionsChecked.indexOf(transactionId);
          if (idx > -1)
          {
            const newTransactionsChecked = [...transactionsChecked]
            newTransactionsChecked.splice(idx, 1);
            setTransactionsChecked(newTransactionsChecked);
          }
        }
      }
      else
      {
        if (checked)
        {
          if (chosenSettleTransactionId === "")
          {
            setIsChecked(true);
            setChosenSettleTransactionId(transaction.id);
          }
        }
        else if (isChecked)
        {
          setIsChecked(false);
          setChosenSettleTransactionId("");
        }
      }
    }

    function handleSplitIt()
    {
      if (recentlySplit)
        return;
      let availableBudgets: any = []
      api.get('/api/users/budgets?budgetType=Partner,Temporary')
      .then((res) => {
          availableBudgets = res.data
          const userIsInPartnerBudget = availableBudgets.find((budget: any) => budget.budgetType === 'Partner');
          const userIsInPartyBudget = availableBudgets.find((budget: any) => budget.budgetType === 'Temporary');

          if (availableBudgets.length === 0)
            return;
          if (userIsInPartnerBudget && !userIsInPartyBudget)
          {
            api.post(`/api/budgets/${availableBudgets[0].id}/transactions/${transaction.id}`,null)
            .then((res)=>{
              setRecentlySplit(true);
              setTimeout(()=>setRecentlySplit(false), 3000);
            })
            .catch((error)=>{
                console.log(error);
            })
            return;
          }
          setSplitItPanel({
            visible: true,
            transactionId: transaction.id,
            availableBudgets: availableBudgets,
          })

      })
      .catch(error => {
          console.error(error);
      })
    }

    function adjustContent(target: any, toLeft: boolean = true)
    {
      if (toLeft)
        target.scrollLeft = 0;
      else
        target.scrollLeft = target.scrollWidth - target.clientWidth;
    }

    function handleClick()
    {
      if (waitingForApproval)
      {
        const idx = transaction.transactionPayBacks.map(pb=>pb.transactionPayBackStatus).indexOf("WaitingForApproval");
        setApproveSettlePanel({
          visible: true,
          payback: transaction.transactionPayBacks[idx],
          transactionId: transaction.id,
        })
        console.log(transaction.transactionPayBacks[idx]);
      }
    }

    return (
      <div 
        className={`transaction ${
          transaction.duplicatedTransaction && markDuplicate ? "duplicate" : 
          waitingForApproval ? "waiting-for-approval" : ""}`}
        onClick={handleClick}
        data-testid="transaction">
        {showCheckbox && showAsRows &&
            <label className='delete-transaction-checkbox-container delete-checkbox-as-rows' data-testid="transaction-checkbox-label">
              <input type="checkbox" 
                      checked={isChecked}
                      className='delete-transaction-checkbox' 
                      onChange={(e)=>handleCheckboxChange(e.target.checked)}
                      data-testid="transaction-checkbox">
              </input>
              <span className="checkmark">
              </span>
            </label >
        }
        <div className='transaction-content' style={gridStyle}>
            {showCheckbox && !showAsRows &&
            <label className='delete-transaction-checkbox-container ' data-testid="transaction-checkbox-label">
              <input type="checkbox" 
                      checked={isChecked}
                      className='delete-transaction-checkbox' 
                      onChange={(e)=>handleCheckboxChange(e.target.checked)}
                      data-testid="transaction-checkbox">
              </input>
              <span className="checkmark">
              </span>
            </label>}
            <div className={`category transaction-element element-margin ${editable ? "editable-content" : ""}`}
                  contentEditable={editable} 
                  onInput={(e:any)=>{setUserCategory(e.currentTarget.textContent)}}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {adjustContent(e.target)}}
                  data-testid="transaction-category-field">
                {(transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory}
            </div>
            {showTransactionType && !minified &&
            <div className={`transactionType transaction-element element-margin ${editable ? "editable-content" : ""}`} data-testid="transaction-type-field">
                {!editable && transaction.transactionType}
                {editable && 
                <select value={transactionType} onChange={(e)=>{setTransactionType(e.target.value)}} data-testid="transaction-edit-type-select-field">
                  <option value={TransactionTypes.Blik}>{TransactionTypes.Blik}</option>
                  <option value={TransactionTypes.Card}>{TransactionTypes.Card}</option>
                  <option value={TransactionTypes.Transfer}>{TransactionTypes.Transfer}</option>
                  <option value={TransactionTypes.Other}>{TransactionTypes.Other}</option>
                </select>}
            </div>
            }
            {showDate && !minified &&
            <div className='date transaction-element' data-testid="transaction-date-field">
              {Moment(transaction.date).format('DD.MM.yyyy')}
            </div>}
            {showUser && !minified &&
            <div className='user transaction-element' data-testid="transaction-user-field">
                User
            </div>
            }

            <div className={`description transaction-element element-margin ${editable ? "editable-content" : ""}`}
                  contentEditable={editable} 
                  onInput={(e:any)=>{setDescription(e.currentTarget.textContent)}}
                  suppressContentEditableWarning={true}
                  onBlur={(e) => {adjustContent(e.target)}}
                  data-testid="transaction-description-field">
                {transaction.description}
            </div>
            <div className='amount transaction-element' style={{color:(amount>=0)? "#35B736" : "#CB3939"}}>
                <div className={`transaction-element ${editable ? "editable-content" : ""}`}
                      contentEditable={editable}  
                      onInput={(e:any)=>{handleAmountChanged(e.currentTarget.textContent)}}
                      suppressContentEditableWarning={true}
                      onBlur={(e) => {adjustContent(e.target)}}
                      data-testid="transaction-amount-field">
                    {editable ? transaction.amount.toFixed(2) : amountFormatter(transaction.amount)}
                </div>
                <div className='transaction-element' style={{minWidth: 'fit-content'}} data-testid="transaction-currency-field">
                    {transaction.currency}
                </div>
            </div>
            {showSplitItIcon && !showAsRows &&
            <div className='split-it transaction-element' onClick={handleSplitIt}>
                <img src={recentlySplit ? UpdateTransactionIcon : SplitItIcon} data-testid="transaction-split-it-button"></img>
            </div>
            }
        </div>
        {showSplitItIcon && showAsRows &&
          <div className='split-it transaction-element' onClick={handleSplitIt}>
              <img src={recentlySplit ? UpdateTransactionIcon : SplitItIcon} data-testid="transaction-split-it-button"></img>
          </div>  
        }
        {showEditButton && <div className='transaction-edit-button-container'>
            <button onClick={handleEditTransactionButton}  data-testid="transaction-edit-button">
                <img src={(editable)?UpdateTransactionIcon:EditTransactionIcon} data-testid={(editable)?"transaction-green-checkmark-icon":"transaction-edit-icon"}/*style={{width:(showDeleteIcon)?"80%" : "50%"}}*/></img>
            </button>
        </div>}
        {showDeleteIcon && <div className='transaction-delete-button-container'>
            <button onClick={handleDeleteTransactionButton} data-testid="transaction-delete-button">
                <img src={DeleteTransactionIcon}></img>
            </button>
        </div>}
      </div>
    );
  }
  
  export default Transaction;