import '../../css/HomePage/TransactionList.css'

import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[],
  shadow: boolean,
  showTransactionType:boolean,
  showDate:boolean,
  showDeleteIcon:boolean,
  showDeleteTransactionRadioButton:boolean,
  markDuplicates:boolean,
}

function TransactionList({
  transactions, 
  shadow, 
  showTransactionType, 
  showDate, 
  showDeleteIcon, 
  showDeleteTransactionRadioButton, 
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
              showDeleteTransactionRadioButton={showDeleteTransactionRadioButton}
              markDuplicate={markDuplicates}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;