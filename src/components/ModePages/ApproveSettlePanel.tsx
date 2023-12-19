import '../../css/ModePages/ApproveSettlePanel.css';

import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

import CloseButton from '../Common/CloseButton';

import { ApproveSettlePanelState } from '../../atoms/ApproveSettlePanel';

import { UserTokenState } from '../../atoms/UserToken';
import axios from 'axios';


function ApproveSettlePanel() {

    const token = useRecoilValue(UserTokenState);
    const [approveSettlePanel, setApproveSettlePanel] = useRecoilState(ApproveSettlePanelState);

    function setApproveSettlePanelVisibility(value: boolean)
    {
        setApproveSettlePanel({...approveSettlePanel, visible: value})
    }

    function handleAccept()
    {
        axios.put(
            process.env.REACT_APP_API_URL + 
            `/api/transactions/${approveSettlePanel.transactionId}/resolve-payback/${approveSettlePanel.payback?.id}?accept=true`, 
            null,
            {
                headers: {
                    'Accept': '*',
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((res)=>{
                setApproveSettlePanelVisibility(false);
            })
            .catch((error)=>{
                console.error(error);
            })
    }

    function handleDecline()
    {

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
                
            </div>
        </div>
        <div className='payback-transaction'>
            {approveSettlePanel.payback?.inCash &&
                "This transaction was settled in cash"
            }
        </div>
        <div className='buttons-container'>
            <div className='accept-button'>
              <button className='button' onClick={handleAccept}>Accept</button>
            </div>
            <div className='decline-button'>
              <button className='button' onClick={handleDecline}>Decline</button>
            </div>
        </div>
      </div>
    );
  }
  
  export default ApproveSettlePanel;