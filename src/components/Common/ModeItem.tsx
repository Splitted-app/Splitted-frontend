import '../../css/Common/ModeItem.css';


interface ModeItemInterface
{
    icon:string,
    title:string
}

function ModeItem({icon,title}:ModeItemInterface) {
    return (
      <div className="mode-item">
        <div className='mode-item-icon'>
            <img src={icon}></img>
        </div>
        <div className='mode-item-title'>
            {title}
        </div>
      </div>
    );
  }
  
  export default ModeItem;