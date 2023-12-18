import '../../css/Common/CloseButton.css'

import CloseButtonIcon from '../../assets/images/close_button.svg'

interface CloseButtonInterface
{
    setVisibility: Function
}

function CloseButton({setVisibility} : CloseButtonInterface) {
    return (
        <div className='close-button'>
            <button onClick={()=>setVisibility(false)} data-testid="close-button">
                <img src={CloseButtonIcon}/>
            </button>
        </div>
    );
  }
  
  export default CloseButton;