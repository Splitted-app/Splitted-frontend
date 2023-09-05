import '../../css/RegisterPages/RegisterButton.css';
import {useState} from 'react';

interface EmailButton{
    email: string;
    buttonText:string;
    setButtonText: Function;
    users:any;
    setInitForm : Function;
    setLogIn: Function;
    setSignUp: Function;
    setIsDisabled: Function
}

function EmailButton({email, buttonText, setButtonText, users, setInitForm, setLogIn, setSignUp, setIsDisabled}:EmailButton) {

    function handleButtonClicked()
    {
        if (users.length > 0 && users.find((user:any) => user.email === email)) 
        {
          setButtonText("Log in");
          setLogIn(true);
        } else {
          setButtonText("Sign up");
          setSignUp(true);
        }
        setInitForm(false);
        setIsDisabled('Disable');
    
    }

    return (
    <div className='email-button-container' >
        <button className='button' onClick={handleButtonClicked}>{buttonText}</button>
    </div>
    );
  }
  
  export default EmailButton;