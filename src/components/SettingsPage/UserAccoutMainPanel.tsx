import '../../css/SettingsPage/UserAccountMainPanel.css'

import LoadingPanel from '../Common/LoadingPanel';

import useFetchMyBudget from '../../hooks/useFetchMyBudget';

import EditIcon from '../../assets/images/edit_icon.png'
import UserAccountIcon from '../../assets/images/user_account.png'


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

    return (
      <div className="user-account-main-panel">
        <div className='user-account-main-panel-title'>
          <div className='user-account-icon'>
            <img src={UserAccountIcon}></img>
          </div>
          <div className='username'>
            {!loading && data.username}
          </div>
        </div>
        {(budget.loading || budget.error) && <LoadingPanel error={budget.error}/>}
        {!budget.loading && !budget.error &&
        <div className='user-account-main-panel-data-container'>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your balance:
            </div>
            <div className='users-value'>
              {budget.data.budgetBalance}
            </div>
          </div>
          <div className='user-account-data-container'>
            <div className='main-text'>
              Your bank:
            </div>
            <div className='users-value'>
              {budget.data.bank}
            </div>
          </div>
          <div className='user-account-data-container'>
          <div className='main-text'>
              Your currency:
            </div>
            <div className='users-value'>
              {budget.data.currency}
            </div>
          </div>
        </div>
        }
        <div className='edit-user-account-main-panel-button-container'>
          <button className='edit-user-account-main-panel-button'>
            <img src={EditIcon}></img>
          </button>
        </div>
      </div>
    );
  }
  
  export default UserAccountMainPanel;