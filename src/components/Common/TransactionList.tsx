import '../../css/HomePage/TransactionList.css'
import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[];
  shadow: boolean;
}

function TransactionList({transactions, shadow}:TransactionListInterface) {
    return (
      <div className={`transaction-list ${shadow ? 'transaction-list-shadow' : ''}`}>
          {transactions &&           
          Array.from(transactions).map((transaction:any)=>
            <Transaction transaction={transaction} showUser={false} showTransactionType={false}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;