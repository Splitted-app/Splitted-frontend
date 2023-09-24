import '../../css/RegisterPages/RegisterButton.css';
import {useNavigate} from 'react-router-dom';
import {useState} from 'react';



interface LogInButton{
    email: string;
    password:string;
    buttonText:string;
}

function LogInButton({email, password , buttonText}:LogInButton) {

    const navigate = useNavigate();
    const [error, setError] = useState();


    function handleButtonClicked(){

        fetch('https://localhost:7012/api/user/login',{
            method: 'POST',
            headers: { 
                'Accept': '*',
                'Content-Type': 'application/json' 
            },
            body: JSON.stringify({
               email: email,
               password: password
              })
        })
        .then(res=>{
          if(!res.ok)
          {
            throw Error('could not fetch the data for that resource');
          }
          if(res.ok)
          {
            navigate('/home');
          }
          return res.json();
        })
        .then((data)=>{
            console.log(data);
        })
      .catch((err)=>{
        setError(err.message);
      });

    }

    return (
    <div className='login-button-container'>
        <button className='button' onClick={handleButtonClicked}>{buttonText}</button>
    </div>
    );
  }
  
  export default LogInButton;