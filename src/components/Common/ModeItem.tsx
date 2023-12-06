import '../../css/Common/ModeItem.css';

import FamilyModeIcon from '../../assets/images/family_mode.png'
import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'

interface ModeItemInterface
{
    budget: any
}

function ModeItem({budget}:ModeItemInterface) {

    let icon = null;
    let title = budget.budgetType;
    switch (budget.budgetType)
    {
      case "Family":
        icon=FamilyModeIcon
        break;
      case "Partner":
        icon=PartnerModeIcon
        break;
      case "Temporary":
        icon=PartyModeIcon
        break;
      default:
        icon=PartyModeIcon
        break;
    }

    return (
      <div className="mode-item">
        <div className='mode-item-icon'>
            <img src={icon}></img>
        </div>
        <div className='mode-item-title'>
            {title}
        </div>
      </div>
    );
  }
  
  export default ModeItem;