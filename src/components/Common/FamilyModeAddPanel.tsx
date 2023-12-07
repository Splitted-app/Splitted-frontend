import '../../css/Common/FamilyModeAddPanel.css';

import { useEffect, useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from './CloseButton';

import { AddFamilyModePanelVisibilityState } from '../../atoms/AddFamilyModePanelVisibility';
import { FamilyMemberIdState } from '../../atoms/FamilyMemberId';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';

import FamilyModeIcon from '../../assets/images/family_mode_add.png';
import SearchIcon from '../../assets/images/search.png'
import { FamilyModeFollowUpVisibilityState } from '../../atoms/FamilyModeFollowUp';



function FamilyModeAddPanel() {
    const setAddFamilyModePanelVisibility = useSetRecoilState(AddFamilyModePanelVisibilityState);
    const setFamilyModeFollowUpVisibility = useSetRecoilState(FamilyModeFollowUpVisibilityState);

    const [query, setQuery] = useState<string>("");
    const searchResult = useFetchSearchUsers(query);
    const [familyMemberId, setFamilyMemberId] = useRecoilState(FamilyMemberIdState)

    function onSelectChange(option: any) 
    {
      if (!option)
      {
        setFamilyMemberId("")
      }
      else
      {
        setFamilyMemberId(searchResult.users[option.value].id);
      }
      
    }

    function handleIntegrateButton()
    {
      if (familyMemberId == "")
        return;
      setAddFamilyModePanelVisibility(false);
      setFamilyModeFollowUpVisibility(true);
    }

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
                  onChange={onSelectChange}
                  options={searchResult.selectOptions}
                  isLoading={searchResult.loading}
                  isSearchable
                  onInputChange={setQuery}
                  placeholder="Search users..."
                />
            </div>
        </div>
        <div className='integrate-accounts-button'>
            <button className='button'
              disabled={familyMemberId==""}
              onClick={handleIntegrateButton}>Integrate accounts</button>
        </div>
        <div className='family-mode-icon'>
            <img src={FamilyModeIcon}></img>
        </div>
      </div>
    );
  }
  
  export default FamilyModeAddPanel;