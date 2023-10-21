import '../../css/Common/PartyModeAddPanel.css';
import PartyModeIcon from '../../assets/images/party_mode_add.png'
import {useState} from 'react';
import SearchIcon from '../../assets/images/search.png'

function PartyModeAddPanel() {
  const [searchInput, setSearchInput] = useState("");

    return (
      <div className="party-mode-add-panel">
        <div className='party-mode-add-panel-header'>
          <div className='title'>
            <div className='main-title'>
              Partner mode
            </div>
            <div className='subtitle'>
              Integrate your account with your partner to make being in a relationship easier than it has ever been before 
            </div>
          </div>
          <div className='party-mode-add-icon'>
            <img src={PartyModeIcon}></img>
          </div>
        </div>
        <div className='find-your-friends-panel'>
        <label>
                Let's find your partner:
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
      </div>
    );
  }
  
  export default PartyModeAddPanel;