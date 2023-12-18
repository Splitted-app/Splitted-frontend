import '../../css/Common/PartnerModeAddPanel.css';

import { useState } from 'react';

import { useRecoilState, useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from './CloseButton';

import { AddPartnerModePanelVisibilityState } from '../../atoms/AddPartnerModePanelVisibility';
import { PartnerModeFollowUpVisibilityState } from '../../atoms/PartnerModeFollowUp';
import { PartnerIdState } from '../../atoms/PartnerId';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';

import PartnerModeIcon from '../../assets/images/partner_mode_add.png'
import SearchIcon from '../../assets/images/search.png'


function PartnerModeAddPanel() {
    const setAddPartnerModePanelVisibility = useSetRecoilState(AddPartnerModePanelVisibilityState);
    const setPartnerModeFollowUpVisibility = useSetRecoilState(PartnerModeFollowUpVisibilityState);

    const [query, setQuery] = useState<string>("");
    const searchResult = useFetchSearchUsers(query);
    const [partnerId, setPartnerId] = useRecoilState(PartnerIdState)

    function onSelectChange(option: any) 
    {
      if (!option)
      {
        setPartnerId("")
      }
      else
      {
        setPartnerId(searchResult.users[option.value].id);
      }      
    }

    function handleIntegrateButton()
    {
      if (partnerId == "")
        return;
      setAddPartnerModePanelVisibility(false);
      setPartnerModeFollowUpVisibility(true);
    }

    return (
      <div className="partner-mode-add-panel" data-testid="partner-mode-add-panel">
        <div className='close-button-container'>
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
              disabled={partnerId==""}
              onClick={handleIntegrateButton}>Integrate accounts</button>
        </div>
        <div className='partner-mode-icon'>
            <img src={PartnerModeIcon}></img>
        </div>
      </div>
    );
  }
  
  export default PartnerModeAddPanel;