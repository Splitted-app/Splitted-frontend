import '../../css/Common/Transaction.css';
import { CurrencyState } from '../../atoms/Currency';
import { useRecoilValue } from 'recoil';
import EditTransactionIcon from '../../assets/images/three_dots.svg'

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
}


function Transaction({transaction, showUser, showTransactionType}: TransactionPropsInterface) {
    const amount = transaction.amount;
    const category = (transaction.userCategory)? transaction.userCategory : (transaction.bankCategory)? transaction.bankCategory : transaction.autoCategory;
    const currency = useRecoilValue(CurrencyState);

    const gridStyle = {
        gridTemplateColumns: showUser
        ? '[line1] 25% [line2] 10% [line3] auto [line4] 10% [line5]'
        : '[line1] 25% [line2] auto [line4] 10% [line5]'
    }

    return (
      <div className="transaction">
        <div className='transaction-content' style={gridStyle}>
            <div className='category transaction-element'>
                {category}
            </div>
            {showUser &&
            <div className='user transaction-element'>
                User
            </div>
            }
            <div className='description transaction-element'>
                {transaction.description}
            </div>
            <div className='amount transaction-element' style={{color:(amount>=0)? "#35B736" : "#CB3939"}}>
                {transaction.amount}
                <div className='currency transaction-element'>
                    {currency}
                </div>
            </div>
        </div>
        <div className='transaction-edit-button-container'>
            <button>
                <img src={EditTransactionIcon}></img>
            </button>
        </div>
      </div>
    );
  }
  
  export default Transaction;