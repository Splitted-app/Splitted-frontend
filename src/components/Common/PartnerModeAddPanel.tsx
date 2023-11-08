import '../../css/Common/PartnerModeAddPanel.css';
import CloseButton from './CloseButton';

import { AddPartnerModePanelVisibilityState } from '../../atoms/AddPartnerModePanelVisibility';

import PartnerModeIcon from '../../assets/images/partner_mode_add.png'
import SearchIcon from '../../assets/images/search.png'

import {useState} from 'react';
import { useSetRecoilState } from 'recoil';


function PartnerModeAddPanel() {
    const [searchInput, setSearchInput] = useState("");
    const setAddPartnerModePanelVisibility = useSetRecoilState(AddPartnerModePanelVisibilityState)

    return (
      <div className="partner-mode-add-panel">
        <div style={{gridColumnStart: 2, padding: '0 30px 0 30px'}}>
          <CloseButton setVisibility={setAddPartnerModePanelVisibility}/>
        </div>
        <div className='title'>
          <div className='main-title'>
            Partner mode
          </div>
          <div className='subtitle'>
            Integrate your account with your partner to make being in a relationship easier than it has ever been before 
          </div>
        </div>
        <div className='find-your-partner-panel'>
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
        <div className='partner-mode-icon'>
            <img src={PartnerModeIcon}></img>
        </div>
      </div>
    );
  }
  
  export default PartnerModeAddPanel;