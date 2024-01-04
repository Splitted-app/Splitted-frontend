import '../../css/HomePage/TransactionList.css'

import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[],
  shadow: boolean,
  showUser:boolean,
  showTransactionType:boolean,
  showDate:boolean,
  showDeleteIcon:boolean,
  showCheckbox:boolean,
  showEditButton: boolean,
  showSplitItIcon:boolean,
  markDuplicates:boolean,
}

function TransactionList({
  transactions, 
  shadow,
  showUser,
  showTransactionType, 
  showDate, 
  showDeleteIcon, 
  showCheckbox: showDeleteTransactionRadioButton, 
  showEditButton,
  showSplitItIcon,
  markDuplicates}:TransactionListInterface) {
    return (
      <div className={`transaction-list ${shadow ? 'transaction-list-shadow' : ''}`} data-testid="transaction-list">
          {transactions &&           
          Array.from(transactions).map((transaction:any)=>
            <Transaction key={transaction.id} 
              transaction={transaction} 
              showUser={showUser} 
              showTransactionType={showTransactionType} 
              showDate={showDate} 
              showDeleteIcon={showDeleteIcon} 
              showCheckbox={showDeleteTransactionRadioButton}
              showEditButton={showEditButton}
              showSplitItIcon={showSplitItIcon}
              markDuplicate={markDuplicates}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;