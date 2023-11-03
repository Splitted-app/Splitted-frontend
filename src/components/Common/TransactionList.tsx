import '../../css/HomePage/TransactionList.css'
import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[];
  shadow: boolean;
  showTransactionType:boolean;
  showDeleteIcon:boolean;
}

function TransactionList({transactions, shadow, showTransactionType, showDeleteIcon}:TransactionListInterface) {
    return (
      <div className={`transaction-list ${shadow ? 'transaction-list-shadow' : ''}`}>
          {transactions &&           
          Array.from(transactions).map((transaction:any)=>
            <Transaction transaction={transaction} showUser={false} showTransactionType={showTransactionType} showDeleteIcon={showDeleteIcon}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;