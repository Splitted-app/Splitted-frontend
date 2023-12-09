import '../../css/Common/PartyModeAddPanel.css';

import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from './CloseButton';

import { AddPartyModePanelVisibilityState } from '../../atoms/AddPartyModePanelVisibility';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';

import PartyModeIcon from '../../assets/images/party_mode_add.png'
import SearchIcon from '../../assets/images/search.png'




function PartyModeAddPanel() {
  const setAddPartyModePanelVisibility = useSetRecoilState(AddPartyModePanelVisibilityState);
  const [query, setQuery] = useState<string>("");
  const searchResult = useFetchSearchUsers(query);

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
          <div className='close-button-container'>
            <CloseButton setVisibility={setAddPartyModePanelVisibility}/>
          </div>
        </div>
        <div className='find-your-friends-panel'>
        <label>
                Let's find your friends:
            </label>
            <div className="search-container">
                <Select
                    className="search-select"
                    options={searchResult.users}
                    isLoading={searchResult.loading}
                    isSearchable
                    onInputChange={setQuery}
                    placeholder="Search users..."
                />
            </div>
        </div>
        <div className='integrate-accounts-button'>
            <button className='button'>Integrate accounts</button>
        </div>
      </div>
    );
  }
  
  export default PartyModeAddPanel;