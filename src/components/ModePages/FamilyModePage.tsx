import '../../css/ModePages/FamilyModePage.css';
import Navbar from "../Common/Navbar";
import FamilyModeIcon from '../../assets/images/family_mode.png'




function FamilyModePage() {
    return (
      <div className="family-mode-page">
        <Navbar></Navbar>
        <div className='family-mode-content'>
            <div className='header'>
                <div className='title'>
                    <div className='subtitle'>
                        Family mode with user123
                    </div>
                    <div className='maintitle'>
                        Family mode1
                    </div>
                </div>
            </div>
            <div className='main-content-photo'>
                <img src={FamilyModeIcon}></img>
            </div>
            <div className='main-content-description'>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae nisi dolores earum libero voluptatem quam voluptates architecto doloremque quasi provident molestias numquam voluptatibus deserunt, mollitia quos ut. Impedit, eius. 

              
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores vitae nisi dolores earum libero voluptatem quam voluptates architecto doloremque quasi provident molestias numquam voluptatibus deserunt, mollitia quos ut. Impedit, eius.           
            </div>
        </div>
      </div>
    );
  }
  
  export default FamilyModePage;