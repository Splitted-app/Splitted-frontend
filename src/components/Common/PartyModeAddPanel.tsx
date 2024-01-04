import '../../css/Common/PartyModeAddPanel.css';

import { useState } from 'react';

import { useSetRecoilState } from 'recoil';
import Select from 'react-select';

import CloseButton from './CloseButton';

import { AddPartyModePanelVisibilityState } from '../../atoms/AddPartyModePanelVisibility';
import { PartyFriendsIdsState } from '../../atoms/PartyFriendsIds';
import { PartyModeFollowUpVisibilityState } from '../../atoms/PartyModeFollowUp';

import useFetchSearchUsers from '../../hooks/useFetchSearchUsers';

import PartyModeIcon from '../../assets/images/party_mode_add.png'
import DeleteTransactionIcon from '../../assets/images/delete_transaction.png'



function PartyFriend({friend, handleRemoveFriend}: any)
{
  return (
    <div className='party-friend' data-testid="party-friend">
      {friend.username}
      <div className='delete-party-friend-button-container'>
        <button onClick={()=>handleRemoveFriend(friend.id)} data-testid="party-friend-delete-button">
          <img src={DeleteTransactionIcon}></img>
        </button>
      </div>
    </div>
  )
}

function PartyFriendsList({friends, handleRemoveFriend}: any)
{
  return (
    <div className='party-friends-list' data-testid="party-friend-list">
      {friends.map((user: any) => (<PartyFriend friend={user} handleRemoveFriend={handleRemoveFriend}/>))}
    </div>
  )
}


function PartyModeAddPanel() {
  const setAddPartyModePanelVisibility = useSetRecoilState(AddPartyModePanelVisibilityState);
  const [query, setQuery] = useState<string>("");
  const searchResult = useFetchSearchUsers(query);

  const setPartyModeFollowUpVisibility = useSetRecoilState(PartyModeFollowUpVisibilityState);

  const [friendsList, setFriendsList] = useState<any[]>([]);
  const setPartyFriendsIds = useSetRecoilState<any>(PartyFriendsIdsState)

  function handleAddFriend(option: any) 
  {
    const idx = friendsList.map((friend)=>(friend.id)).indexOf(searchResult.users[option.value].id);
    if (idx > -1)
      return;
    if (option)
    {
      const newFriendsList = [...friendsList, searchResult.users[option.value]];
      setFriendsList(newFriendsList);
    }
  }

  function handleRemoveFriend(id: string)
  {
    const idx = friendsList.map((friend)=>(friend.id)).indexOf(id);
    if (idx > -1)
    {
      const newFriendsList = [...friendsList]
      newFriendsList.splice(idx, 1);
      setFriendsList(newFriendsList);
    }
  }

  function handleIntegrateButton()
  {
    if (friendsList.length == 0)
      return;
    setPartyFriendsIds(friendsList.map((friend)=>(friend.id)));
    setAddPartyModePanelVisibility(false);
    setPartyModeFollowUpVisibility(true);
  }

    return (
      <div className="party-mode-add-panel" data-testid="party-mode-add-panel">
        <div className='party-mode-add-panel-header'>
          <div className='title'>
            <div className='main-title' data-testid="party-mode-add-panel-main-title">
              Party mode
            </div>
            <div className='subtitle' data-testid="party-mode-add-panel-subtitle">
              Create a temporary budget to make meeting with your friends easier than it has ever been before             
            </div>
          </div>
          <div className='party-mode-add-icon' data-testid="party-mode-add-panel-party-mode-icon">
            <img src={PartyModeIcon}></img>
          </div>
          <div className='close-button-container'>
            <CloseButton setVisibility={setAddPartyModePanelVisibility}/>
          </div>
        </div>
        <div className='find-your-friends-panel' data-testid="party-mode-add-panel-find-your-friends-section">
            <label data-testid="party-mode-add-panel-find-your-friends-section-label">
                Let's find your friends:
            </label>
            <div className="search-container" data-testid="party-mode-add-panel-find-your-friends-section-search-field">
                <Select
                    className="search-select"
                    onChange={handleAddFriend}
                    options={searchResult.selectOptions}
                    isLoading={searchResult.loading}
                    isSearchable
                    onInputChange={setQuery}
                    placeholder="Search users..."
                />
            </div>
        </div>
        <div className='friends-list-container' data-testid="part-mode-add-panel-friends-list-container">
          <div className='list-title'  data-testid="part-mode-add-panel-friends-list-container-title">
            Your Friends:
          </div>
          <PartyFriendsList friends={friendsList} handleRemoveFriend={handleRemoveFriend}/>
        </div>
        <div className='integrate-accounts-button'>
            <button className='button' 
              disabled={friendsList.length==0}
              onClick={handleIntegrateButton} data-testid="party-mode-add-panel-integrate-accounts-button">Integrate accounts</button>
        </div>
      </div>
    );
  }
  
  export default PartyModeAddPanel;