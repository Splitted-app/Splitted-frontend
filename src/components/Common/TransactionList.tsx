import '../../css/HomePage/TransactionList.css'

import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[];
  shadow: boolean;
  showTransactionType:boolean;
  showDate:boolean
  showDeleteIcon:boolean;
  showDeleteTransactionRadioButton:boolean;
}

function TransactionList({transactions, shadow, showTransactionType, showDate, showDeleteIcon, showDeleteTransactionRadioButton}:TransactionListInterface) {
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
              showDeleteTransactionRadioButton={showDeleteTransactionRadioButton}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;