import '../../css/Common/CloseButton.css'
import CloseButtonIcon from '../../assets/images/close_button.svg'

interface CloseButtonInterface
{
    setVisibility: Function
}

function CloseButton({setVisibility} : CloseButtonInterface) {
    return (
        <div className='close-button-container'>
            <button onClick={()=>setVisibility(false)}>
                <img src={CloseButtonIcon}/>
            </button>
        </div>
    );
  }
  
  export default CloseButton;