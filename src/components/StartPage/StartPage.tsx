import FeaturePanel from "./FeaturePanel";
import Footer from "./Footer";
import WelcomePanel from "./WelcomePanel";

function StartPage() {
    return (
      <div className="start-page">
        <WelcomePanel></WelcomePanel>
        <FeaturePanel title="Family mode" align="left"></FeaturePanel>
        <FeaturePanel title="Partner mode" align="right"></FeaturePanel>
        <FeaturePanel title="Party mode" align="left"></FeaturePanel>
        <FeaturePanel title="Split it" align="right"></FeaturePanel>
        <Footer></Footer>
      </div>
    );
  }
  
  export default StartPage;