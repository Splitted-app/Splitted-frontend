import '../../css/Common/AddModePanel.css';
import AddModeButton from './AddModeButton';
import FamilyModeIcon from '../../assets/images/family_mode.png'
import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'




function AddModePanel() {
    return (
      <div className="add-mode-panel">
        <div className='title'>
          <div className='main-title'>
            Add mode
          </div>
          <div className='subtitle'>
            You can integrate your account with other users accounts by one of three modes:
          </div>
        </div>
        <div className='buttons'>
            <button>
                <AddModeButton icon={FamilyModeIcon} title="Family mode" description='description of family mode'></AddModeButton>
            </button>
            <button>
                <AddModeButton icon={PartnerModeIcon} title="Partner mode" description='description of partner mode'></AddModeButton>
            </button>
            <button>
                <AddModeButton icon={PartyModeIcon} title="Party mode" description='description of party mode'></AddModeButton>
            </button>
        </div>
      </div>
    );
  }
  
  export default AddModePanel;