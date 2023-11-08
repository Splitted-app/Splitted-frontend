import FeaturePanel from "./FeaturePanel";
import Footer from "./Footer";
import WelcomePanel from "./WelcomePanel";

import FamilyModeIcon from '../../assets/images/family_mode.png';
import PartnerModeIcon from '../../assets/images/partner_mode.png';
import PartyModeIcon from '../../assets/images/party_mode.png';
import SplitItIcon from '../../assets/images/split.png';


function StartPage() {
    return (
      <div className="start-page">
        <WelcomePanel></WelcomePanel>
        <FeaturePanel title="Family mode" align="left" icon={FamilyModeIcon}></FeaturePanel>
        <FeaturePanel title="Partner mode" align="right" icon={PartnerModeIcon}></FeaturePanel>
        <FeaturePanel title="Party mode" align="left" icon={PartyModeIcon}></FeaturePanel>
        <FeaturePanel title="Split it" align="right" icon={SplitItIcon}></FeaturePanel>
        <Footer></Footer>
      </div>
    );
  }
  
  export default StartPage;