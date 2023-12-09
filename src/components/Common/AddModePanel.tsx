import '../../css/Common/AddModePanel.css';

import { useSetRecoilState } from 'recoil';

import AddModeButton from './AddModeButton';
import CloseButton from './CloseButton';

import { AddFamilyModePanelVisibilityState } from '../../atoms/AddFamilyModePanelVisibility';
import { AddModesPanelVisibilityState } from '../../atoms/AddModesPanelVisibility';
import { AddPartnerModePanelVisibilityState } from '../../atoms/AddPartnerModePanelVisibility';
import { AddPartyModePanelVisibilityState } from '../../atoms/AddPartyModePanelVisibility';

import FamilyModeIcon from '../../assets/images/family_mode.png'
import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'






function AddModePanel() {
  const setAddFamilyModePanelVisbility = useSetRecoilState(AddFamilyModePanelVisibilityState);
  const setAddPartnerModePanelVisibility = useSetRecoilState(AddPartnerModePanelVisibilityState);
  const setAddPartyModePanelVisbility = useSetRecoilState(AddPartyModePanelVisibilityState);
  const setAddModesPanelVisibility = useSetRecoilState(AddModesPanelVisibilityState);
    return (
      <div className="add-mode-panel">
        <div className='close-button-container'>
          <CloseButton setVisibility={setAddModesPanelVisibility}/>
        </div>
        <div className='title'>
          <div className='main-title'>
            Add mode
          </div>
          <div className='subtitle'>
            You can integrate your account with other users accounts by one of three modes:
          </div>
        </div>
        <div className='buttons'>
            <button onClick={()=>{setAddFamilyModePanelVisbility(true) ; setAddModesPanelVisibility(false)}}>
                <AddModeButton icon={FamilyModeIcon} title="Family mode" description='description of family mode'></AddModeButton>
            </button>
            <button onClick={()=> {setAddPartnerModePanelVisibility(true) ; setAddModesPanelVisibility(false)}}>
                <AddModeButton icon={PartnerModeIcon} title="Partner mode" description='description of partner mode'></AddModeButton>
            </button>
            <button onClick={()=>{setAddPartyModePanelVisbility(true);setAddModesPanelVisibility(false)}}>
                <AddModeButton icon={PartyModeIcon} title="Party mode" description='description of party mode'></AddModeButton>
            </button>
        </div>
      </div>
    );
  }
  
  export default AddModePanel;