import '../../css/HomePage/HomePage.css'
import SignUpFollowUp from "./SignUpFollowUp";
import Navbar from "../Common/Navbar"
import HomePageContent from './HomePageContent';

function HomePage() {
    return (
      <div className="home-page">
        <Navbar></Navbar>
        <HomePageContent></HomePageContent>

        {/* <SignUpFollowUp></SignUpFollowUp> */}
      </div>
    );
  }
  
  export default HomePage;