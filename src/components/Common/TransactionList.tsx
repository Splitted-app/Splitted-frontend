import '../../css/HomePage/TransactionList.css'

import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[],
  shadow: boolean,
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
  showTransactionType, 
  showDate, 
  showDeleteIcon, 
  showCheckbox: showDeleteTransactionRadioButton, 
  showEditButton,
  showSplitItIcon,
  markDuplicates}:TransactionListInterface) {
    return (
      <div className={`transaction-list ${shadow ? 'transaction-list-shadow' : ''}`}>
          {transactions &&           
          Array.from(transactions).map((transaction:any)=>
            <Transaction key={transaction.id} 
              transaction={transaction} 
              showUser={false} 
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