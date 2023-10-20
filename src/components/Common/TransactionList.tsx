import '../../css/HomePage/TransactionList.css'
import Transaction from '../Common/Transaction'

interface TransactionListInterface
{
  transactions:typeof Transaction[];
}

function TransactionList({transactions}:TransactionListInterface) {
    return (
      <div className="transaction-list">

          {transactions &&           
          Array.from(transactions).map((transaction:any)=>
            <Transaction transaction={transaction} showUser={false} showTransactionType={false}/>
          )}

      </div>
    );
  }
  
  export default TransactionList;