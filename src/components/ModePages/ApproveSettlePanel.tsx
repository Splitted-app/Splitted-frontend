import '../../css/ModePages/ApproveSettlePanel.css';

import Moment from 'moment';
import { useRecoilState } from 'recoil';

import CloseButton from '../Common/CloseButton';

import { ApproveSettlePanelState } from '../../atoms/ApproveSettlePanel';
import { TransactionUpdaterState } from '../../atoms/TransactionUpdater';

import { amountFormatter } from '../../utils';
import api from '../../services/api';



function ApproveSettlePanel() {
    const [approveSettlePanel, setApproveSettlePanel] = useRecoilState(ApproveSettlePanelState);
    const paybackTransaction = approveSettlePanel.payback?.payBackTransaction;
    const [transactionUpdater, setTransactionUpdater] = useRecoilState(TransactionUpdaterState);

    function setApproveSettlePanelVisibility(value: boolean)
    {
        setApproveSettlePanel({...approveSettlePanel, visible: value})
    }

    function sendResponse(response: boolean)
    {
        api.put(
        `/api/transactions/${approveSettlePanel.transactionId}/resolve-payback/${approveSettlePanel.payback?.id}?accept=${response}`, 
        null)
        .then((res)=>{
            setApproveSettlePanelVisibility(false);
            setTransactionUpdater(!transactionUpdater);
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
      <div className="approve-settle-panel" data-testid="approve-settle-panel">
        <div className="close-button-container">
          <CloseButton setVisibility={setApproveSettlePanelVisibility}/>
        </div>
        <div className='title'>
            <div className='main-title' data-testid="approve-settle-panel-main-title">
                Accept Payback
            </div>
            <div className='subtitle' data-testid="approve-settle-panel-user">
                From: {approveSettlePanel.payback?.userName}
            </div>
        </div>
        <div className='payback-transaction'>
            {approveSettlePanel.payback?.inCash &&
            <div className='payback-type-cash-text' data-testid="payback-type-text">
                This transaction was settled in cash
            </div>
            }
            {!approveSettlePanel.payback?.inCash &&
            <>
                <div className='payback-type-transaction-text' data-testid="payback-type-text">
                    This transaction was settled with this transaction
                </div>
                <div className="transaction" data-testid="transaction-to-approve">
                    <div className='transaction-content' style={{display: 'grid', gridTemplateColumns: '33% 33% auto'}}>
                        <div className={`transactionType transaction-element element-margin`} data-testid="transaction-to-approve-type">
                            {paybackTransaction.transactionType}
                        </div>
                        <div className='date transaction-element' data-testid="transaction-to-approve-date"> {/*data-testid="date-field"*/}
                                {Moment(paybackTransaction.date).format('DD.MM.yyyy')}
                        </div>
                        <div className='amount transaction-element' style={{color:(paybackTransaction.amount>=0)? "#35B736" : "#CB3939"}}>
                            <div className='transaction-element' data-testid="transaction-to-approve-amount">
                                {amountFormatter(paybackTransaction.amount)}
                            </div>
                            <div className='transaction-element' style={{minWidth: 'fit-content'}}
                                data-testid="transaction-to-approve-currency">
                                {paybackTransaction.currency}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
        <div className='buttons-container'>
            <div className='accept-button' data-testid="approve-settle-panel-accept-button">
              <button className='button' onClick={()=>sendResponse(true)}>Accept</button>
            </div>
            <div className='decline-button' data-testid="approve-settle-panel-decline-button">
              <button className='button' onClick={()=>sendResponse(false)}>Decline</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default ApproveSettlePanel;