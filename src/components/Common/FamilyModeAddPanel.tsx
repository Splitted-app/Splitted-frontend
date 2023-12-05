import '../../css/Common/FamilyModeAddPanel.css';

import { useEffect, useState } from 'react';

import { useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from './CloseButton';

import { AddFamilyModePanelVisibilityState } from '../../atoms/AddFamilyModePanelVisibility';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';

import FamilyModeIcon from '../../assets/images/family_mode_add.png';
import SearchIcon from '../../assets/images/search.png'


function FamilyModeAddPanel() {
    const setAddFamilyModePanelVisibility = useSetRecoilState(AddFamilyModePanelVisibilityState);
    const [query, setQuery] = useState<string>("");
    const searchResult = useFetchSearchUsers(query);

    return (
      <div className="family-mode-add-panel">
        <div style={{gridColumnStart: 3, padding: '0 30px 0 30px'}}>
          <CloseButton setVisibility={setAddFamilyModePanelVisibility}/>
        </div>
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
        <div className='family-mode-icon'>
            <img src={FamilyModeIcon}></img>
        </div>
      </div>
    );
  }
  
  export default FamilyModeAddPanel;