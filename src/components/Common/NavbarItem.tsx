import '../../css/Common/NavbarItem.css'

import { Link } from 'react-router-dom'


interface NavbarItemInterface{
    name: string;
    font: string;
    fontSize: string;
    link:string;
    icon:string;
}


function NavbarItem({name, font, fontSize, link, icon} : NavbarItemInterface) {
    return (
    <Link to={link}>
      <div className="navbar-item">
        <div className='icon'>
          <img src={icon}></img>
        </div>
        <div className='text' style={{fontFamily: font, fontSize: fontSize}}>
            {name}
        </div>
      </div>
      </Link>
    );
  }
  
export default NavbarItem;