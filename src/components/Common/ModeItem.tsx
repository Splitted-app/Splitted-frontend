import '../../css/Common/ModeItem.css';

import { Link } from 'react-router-dom'

import FamilyModeIcon from '../../assets/images/family_mode.png'
import PartnerModeIcon from '../../assets/images/partner_mode.png'
import PartyModeIcon from '../../assets/images/party_mode.png'

interface ModeItemInterface
{
    budget: any,
}

function ModeItem({budget}:ModeItemInterface) {

    let icon = null;
    let title = budget.name;
    let link = "";
    switch (budget.budgetType)
    {
      case "Family":
        icon=FamilyModeIcon
        link="/family"
        break;
      case "Partner":
        icon=PartnerModeIcon
        link="/partner"
        break;
      case "Temporary":
        icon=PartyModeIcon
        link="/party"
        break;
      default:
        icon=PartyModeIcon
        link="/home"
        break;
    }

    return (
      <Link to={`${link}/${budget.id}`}>
        <div className="mode-item">
          <div className='mode-item-icon'>
              <img src={icon}></img>
          </div>
          <div className='mode-item-title'>
              {title}
          </div>
        </div>            
      </Link>
    );
  }
  
  export default ModeItem;