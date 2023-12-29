import '../../css/TransactionPage/SplitItPanel.css';

import { useRecoilState } from 'recoil';

import AddModeButton from '../Common/AddModeButton';
import CloseButton from '../Common/CloseButton';

import {SplitItPanelState} from '../../atoms/SplitItPanel';

import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'
import api from '../../services/api';


function SplitItPanel() {

    const [splitItPanel, setSplitItPanel] = useRecoilState(SplitItPanelState);

    function setSplitPanelVisibility(value: boolean)
    {
        setSplitItPanel({...splitItPanel, visible: value})
    }

    function handleSplit(budgetId: string)
    {
        api.post(`/api/budgets/${budgetId}/transactions/${splitItPanel.transactionId}`,null)
        .then((res)=>{
            setSplitPanelVisibility(false);
        })
        .catch((error)=>{
            console.log(error);
        })
    }


    return (
      <div className="split-it-panel">
        <div className='close-button-container'>
          <CloseButton setVisibility={setSplitPanelVisibility}/>
        </div>
        <div className='title'>
          <div className='main-title'>
            Choose budget
          </div>
          <div className='subtitle'>
            Choose the budget you want the transaction to be split into
          </div>
        </div>
        <div className='budgets'>
            {splitItPanel.availableBudgets.map((budget: any, i: number) => (
                <button onClick={()=>handleSplit(budget.id)}>
                    <AddModeButton 
                        key={i} 
                        icon={budget.budgetType === 'Partner' ? PartnerModeIcon : PartyModeIcon} 
                        title={budget.name} 
                        description=""/>
                </button>    
            ))}
        </div>
      </div>
    );
  }
  
  export default SplitItPanel;