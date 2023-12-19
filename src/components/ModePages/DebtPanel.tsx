import '../../css/ModePages/DebtPanel.css';
import useFetchCurrency from '../../hooks/useFetchCurrency';
import { amountFormatter } from '../../utils';


interface DebtPanelInterface
{
  amount: number,
}

function DebtPanel({amount}: DebtPanelInterface) {

    const currency = useFetchCurrency()

    return (
      <div className="debt-panel">
        <div className='debt-panel-title'>
            Debt:
        </div>
        <div className='debt-panel-main-content' style={{color:(amount<0)? '#A30D0D': '#18B470'}}>
            <div className='debt-panel-amount'>
                {amountFormatter(amount)}
            </div>
            <div className='debt-panel-currency'>
                {currency}
            </div>
        </div>
      </div>
    );
  }
  
  export default DebtPanel;