import '../../css/Common/AddModeButton.css';

interface AddModeButtonInterface
{
    icon:string,
    title:string,
    description:string
}

function AddModeButton({icon, title, description} : AddModeButtonInterface) {
    return (
      <div className="add-mode-button">
        <div className='icon'>
            <img src={icon}></img>
        </div>
        <div className='add-mode-button-title'>
            {title}
        </div>
        <div className='description'>
            {description}
        </div>
      </div>
    );
  }
  
  export default AddModeButton;