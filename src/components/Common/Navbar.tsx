import '../../css/Common/Navbar.css'
import NavbarItem from './NavbarItem';
import SplitIcon from '../../assets/images/split.png'

function Navbar() {
    return (
      <div className="navbar">
        <div className="title">
          <NavbarItem name="Splitted" font="CeraPro bold" fontSize="27px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className='table-of-contents'>
          <NavbarItem name="HomePage" font="CeraPro light" fontSize="19px" link="/home" icon={SplitIcon}></NavbarItem>
          <NavbarItem name="Transactions" font="CeraPro light" fontSize="19px" link="/home" icon={SplitIcon}></NavbarItem>
          <NavbarItem name="Insights" font="CeraPro light" fontSize="19px" link="/home"icon={SplitIcon}></NavbarItem>
          <NavbarItem name="Predictions" font="CeraPro light" fontSize="19px" link="/home"icon={SplitIcon}></NavbarItem>
          <NavbarItem name="Goals" font="CeraPro light" fontSize="19px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
        <div className="navbar-footer">          
          <NavbarItem name="Settings" font="CeraPro medium" fontSize="22px" link="/home"icon={SplitIcon}></NavbarItem>
          <NavbarItem name="Log Out" font="CeraPro medium" fontSize="22px" link="/home" icon={SplitIcon}></NavbarItem>
        </div>
      </div>
    );
  }
  
  export default Navbar;