import '../../css/Common/PartyModeAddPanel.css';
import PartyModeIcon from '../../assets/images/party_mode_add.png'
import {useState} from 'react';
import SearchIcon from '../../assets/images/search.png'
import CloseButton from './CloseButton';
import { useSetRecoilState } from 'recoil';
import { AddPartyModePanelVisibilityState } from '../../atoms/AddPartyModePanelVisibility';

function PartyModeAddPanel() {
  const [searchInput, setSearchInput] = useState("");
  const setAddPartyModePanelVisibility = useSetRecoilState(AddPartyModePanelVisibilityState);

    return (
      <div className="party-mode-add-panel">
        <div className='party-mode-add-panel-header'>
          <div className='title'>
            <div className='main-title'>
              Party mode
            </div>
            <div className='subtitle'>
              Create a temporary budget to make meeting with your friends easier than it has ever been before             
            </div>
          </div>
          <div className='party-mode-add-icon'>
            <img src={PartyModeIcon}></img>
          </div>
          <div style={{padding: "30px 10px 0 0"}}>
            <CloseButton setVisibility={setAddPartyModePanelVisibility}/>
          </div>
        </div>
        <div className='find-your-friends-panel'>
        <label>
                Let's find your friends:
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