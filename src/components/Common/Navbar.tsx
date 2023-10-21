import '../../css/Common/Navbar.css'
import NavbarItem from './NavbarItem';
import SplitIcon from '../../assets/images/split.png'
import HomePageIcon from '../../assets/images/home_page.png'
import TransactionsIcon from '../../assets/images/transactions.png'
import InsightsIcon from '../../assets/images/insights.png'
import PredictionsIcon from '../../assets/images/predictions.png'
import GoalsIcon from '../../assets/images/goals.png'
import SettingsIcon from '../../assets/images/settings.png'
import LogOutIcon from '../../assets/images/log-out.png'

function Navbar() {
    return (
      <div className="navbar">
        <div className="title">
          <NavbarItem name="Splitted" font="CeraPro bold" fontSize="27px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className='table-of-contents'>
          <NavbarItem name="HomePage" font="CeraPro light" fontSize="19px" link="/home" icon={HomePageIcon}></NavbarItem>
          <NavbarItem name="Transactions" font="CeraPro light" fontSize="19px" link="/home" icon={TransactionsIcon}></NavbarItem>
          <NavbarItem name="Insights" font="CeraPro light" fontSize="19px" link="/home"icon={InsightsIcon}></NavbarItem>
          <NavbarItem name="Predictions" font="CeraPro light" fontSize="19px" link="/home"icon={PredictionsIcon}></NavbarItem>
          <NavbarItem name="Goals" font="CeraPro light" fontSize="19px" link="/home" icon={GoalsIcon}></NavbarItem>
        </div>
        <div className="navbar-footer">          
          <NavbarItem name="Settings" font="CeraPro medium" fontSize="22px" link="/home"icon={SettingsIcon}></NavbarItem>
          <NavbarItem name="Log Out" font="CeraPro medium" fontSize="22px" link="/home" icon={LogOutIcon}></NavbarItem>
        </div>
      </div>
    );
  }
  
  export default Navbar;