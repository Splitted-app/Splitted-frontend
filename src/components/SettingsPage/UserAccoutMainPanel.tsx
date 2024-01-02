import '../../css/SettingsPage/UserAccountMainPanel.css'

import { useEffect, useState } from 'react';

import LoadingPanel from '../Common/LoadingPanel';
import CurrencyDropdown from '../HomePage/CurrencyDropdown';

import useFetchMyBudget from '../../hooks/useFetchMyBudget';

import EditIcon from '../../assets/images/edit_icon.png'
import CheckmarkIcon from '../../assets/images/black_checkmark.png'

import { BankNames } from '../../enums';
import AvatarImage from './AvatarImage';
import api from '../../services/api';






interface UserInterface 
{
  id: string,
  email: string,
  username: string,
  avatarImage: string
}

interface UserAccountDataInterface
{
  data: UserInterface,
  loading: boolean,
  error: boolean
}

function UserAccountMainPanel({data, loading, error}: UserAccountDataInterface) {

    const budget = useFetchMyBudget();
    const [editable, setEditable] = useState<boolean>(false);
    const [editableData, setEditableData] = useState({
      bank: budget.data.bank,
      currency: budget.data.currency
    })

    useEffect(()=>{
      setEditableData({
        bank: budget.data.bank,
        currency: budget.data.currency
      })
    }, [budget.data])

    function handleEditButton()
    {
      setEditable(!editable)
      if (!editable) // before set
      {
        return;
      }
      // else
      api.put(`/api/budgets/${budget.data.id}`,
      {
        bank: editableData.bank,
        name: budget.data.name,
        currency: editableData.currency,
        budgetBalance: budget.data.budgetBalance
      })
      .then(()=>{

      })
      .catch((error)=>{
        console.error(error);
      })
      

    }

    return (
      <div className="user-account-main-panel" data-testid="user-account-main-panel">
        <div className='user-account-main-panel-title'>
          <div className='user-account-icon' data-testid="user-account-main-panel-avatar-image">
            <AvatarImage editable={editable} avatarImage={data.avatarImage}/>
          </div>
          <div className='username' data-testid="user-account-main-panel-username">
            {!loading && data.username}
          </div>
        </div>
        {(budget.loading || budget.error) && <LoadingPanel error={budget.error} color={"black"}/>}
        {!budget.loading && !budget.error &&
        <div className='user-account-main-panel-data-container'>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your balance:
            </div>
            <div className='users-value' data-testid="user-account-main-panel-budget-balance">
              {budget.data.budgetBalance}
            </div>
          </div>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your bank:
            </div>
            <div className='users-value' data-testid="user-account-main-panel-default-bank">
              {!editable && editableData.bank}
              {editable && 
                <select className='' 
                    value={editableData.bank} 
                    onChange={(e: any) => setEditableData({...editableData, bank: e.target.value })}
                    data-testid="user-account-main-panel-bank-select-field">
                  <option value={BankNames.Pko}>PKO BP</option>
                  <option value={BankNames.Pekao}>Pekao</option>
                  <option value={BankNames.Santander}>Santander Bank</option>
                  <option value={BankNames.Ing}>ING Bank</option>
                  <option value={BankNames.Mbank}>mBank</option>
                  <option value={BankNames.Other}>Other</option>
                </select>
              }
            </div>
          </div>
          <div className='user-account-data-container'>
          <div className='main-text'>
              Your currency:
            </div>
            <div className='users-value'  data-testid="user-account-main-panel-default-currency">
              {!editable && editableData.currency}
              {editable && 
                <CurrencyDropdown 
                  currency={editableData.currency}
                  setCurrency={(e: any)=>setEditableData({...editableData, currency: e.target.value})}/>
              }
            </div>
          </div>
        </div>
        }
        <div className='edit-user-account-main-panel-button-container'>
          <button className='edit-user-account-main-panel-button' onClick={handleEditButton} data-testid="user-account-main-panel-edit-button">
            <img src={editable ? CheckmarkIcon : EditIcon} data-testid="user-account-main-panel-edit-button-icon"></img>
          </button>
        </div>
      </div>
    );
  }
  
  export default UserAccountMainPanel;