import '../../css/ModePages/ApproveSettlePanel.css';

import Moment from 'moment';
import { useRecoilState } from 'recoil';

import CloseButton from '../Common/CloseButton';

import { ApproveSettlePanelState } from '../../atoms/ApproveSettlePanel';

import { amountFormatter } from '../../utils';
import api from '../../services/api';


function ApproveSettlePanel() {
    const [approveSettlePanel, setApproveSettlePanel] = useRecoilState(ApproveSettlePanelState);
    const paybackTransaction = approveSettlePanel.payback?.payBackTransaction;

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
        })
        .catch((error)=>{
            console.error(error);
        })
    }

    return (
      <div className="approve-settle-panel">
        <div className="close-button-container">
          <CloseButton setVisibility={setApproveSettlePanelVisibility}/>
        </div>
        <div className='title'>
            <div className='main-title'>
                Accept Payback
            </div>
            <div className='subtitle'>
                From: {approveSettlePanel.payback?.userName}
            </div>
        </div>
        <div className='payback-transaction'>
            {approveSettlePanel.payback?.inCash &&
            <div className='payback-type-cash-text'>
                This transaction was settled in cash
            </div>
            }
            {!approveSettlePanel.payback?.inCash &&
            <>
                <div className='payback-type-transaction-text'>
                    This transaction was settled with this transaction
                </div>
                <div className="transaction">
                    <div className='transaction-content' style={{display: 'grid', gridTemplateColumns: '33% 33% auto'}}>
                        <div className={`transactionType transaction-element element-margin`}>
                            {paybackTransaction.transactionType}
                        </div>
                        <div className='date transaction-element' data-testid="date-field">
                        {Moment(paybackTransaction.date).format('DD.MM.yyyy')}
                        </div>
                        <div className='amount transaction-element' style={{color:(paybackTransaction.amount>=0)? "#35B736" : "#CB3939"}}>
                            <div className='transaction-element'>
                                {amountFormatter(paybackTransaction.amount)}
                            </div>
                            <div className='transaction-element' style={{minWidth: 'fit-content'}}>
                                {paybackTransaction.currency}
                            </div>
                        </div>
                    </div>
                </div>
            </>
            }
        </div>
        <div className='buttons-container'>
            <div className='accept-button'>
              <button className='button' onClick={()=>sendResponse(true)}>Accept</button>
            </div>
            <div className='decline-button'>
              <button className='button' onClick={()=>sendResponse(false)}>Decline</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default ApproveSettlePanel;