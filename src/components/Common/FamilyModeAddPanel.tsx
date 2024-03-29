import '../../css/Common/FamilyModeAddPanel.css';
import FamilyModeIcon from '../../assets/images/family_mode_add.png';
import {useState} from 'react';
import SearchIcon from '../../assets/images/search.png'

function FamilyModeAddPanel() {
    const [searchInput, setSearchInput] = useState("");

    return (
      <div className="family-mode-add-panel">
        <div className='title'>
          <div className='main-title'>
            Family mode
          </div>
          <div className='subtitle'>
            Integrate your account with your family member to make being a family easier than it has ever been before 
          </div>
        </div>
        <div className='find-your-family-panel'>
            <label>
                Let's find your family:
            </label>
            <div className="search-container">
                <form >
                    <input type="text" placeholder="Search.." name="search"/>
                    <button type="submit">
                        <img src={SearchIcon}></img>
                    </button>
                </form>
            </div>
            {/* <input type="text" placeholder="Search.." value={searchInput} /> */}
        </div>
        <div className='integrate-accounts-button'>
            <button className='button'>Integrate accounts</button>
        </div>
        <div className='family-mode-icon'>
            <img src={FamilyModeIcon}></img>
        </div>
      </div>
    );
  }
  
  export default FamilyModeAddPanel;