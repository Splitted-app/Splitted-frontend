import '../../css/RegisterPages/RegisterButton.css';
import {useState} from 'react';

interface EmailButton{
    email: string;
    buttonText:string;
    setButtonText: Function;
    // users:any;
    setInitForm : Function;
    setLogIn: Function;
    setSignUp: Function;
    setIsDisabled: Function
}

function EmailButton({email, buttonText, setButtonText, setInitForm, setLogIn, setSignUp, setIsDisabled}:EmailButton) {

    const [error, setError] = useState(null);


    function handleButtonClicked()
    {
        fetch('https://localhost:7012/api/user/email-check?email=' + email)
          .then(res=>{
            if(!res.ok)
            {
              throw Error('could not fetch the data for that resource');
            }
            return res.json();
          })
          .then((data)=>{
            if(data.userExists === true)
            {
              setButtonText("Log in");
              setLogIn(true);
            }else
            {
              setButtonText("Sign up");
              setSignUp(true);
            }
            setInitForm(false);
            setIsDisabled('Disable');
          })
        .catch((err)=>{
          setError(err.message);
        });
    }

    return (
    <div className='email-button-container' >
        <button className='button' onClick={handleButtonClicked}>{buttonText}</button>
    </div>
    );
  }
  
  export default EmailButton;