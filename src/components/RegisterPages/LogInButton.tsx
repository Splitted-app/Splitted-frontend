import '../../css/RegisterPages/RegisterButton.css';
import {useNavigate} from 'react-router-dom'



interface LogInButton{
    email: string;
    password:string;
    buttonText:string;
    users:any;
}

function LogInButton({email, password , buttonText, users}:LogInButton) {

    const navigate = useNavigate();


    function handleButtonClicked(){
        
        navigate('/home');

    }

    return (
    <div className='login-button-container'>
        <button className='button' onClick={handleButtonClicked}>{buttonText}</button>
    </div>
    );
  }
  
  export default LogInButton;