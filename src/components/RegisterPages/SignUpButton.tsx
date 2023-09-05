import '../../css/RegisterPages/RegisterButton.css';
import {useNavigate} from 'react-router-dom'

interface SignUpButton{
    email: string;
    password: string;
    nickname:string;
    buttonText:string;
    users:any;
}


function SignUpButton({email, password, nickname , buttonText, users}: SignUpButton) {

    const navigate = useNavigate();


    function handleButtonClicked(){
        
        let user = {email,password,nickname};
        fetch('http://localhost:8000/users',{
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(user)
        }
        )

        navigate('/home');

    }

    return (
    <div className='signup-button'>
        <button className='button' onClick={handleButtonClicked}>{buttonText}</button>
    </div>
    );
  }
  
  export default SignUpButton;