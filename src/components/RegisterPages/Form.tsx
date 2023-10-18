import { Link } from 'react-router-dom';
import '../../css/RegisterPages/Form.css';
import { useState } from 'react';
import EmailButton from './EmailButton';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';
import CurrencyDropdown from '../HomePage/CurrencyDropdown';
import {UserTokenState} from '../../atoms/UserToken';
import {useNavigate} from 'react-router-dom';
import { useRecoilState } from 'recoil';


interface FormDataInterface
{
  email: string
  password: string
  nickname: string
  currency: string
}

function Form() {

    const navigate = useNavigate();
    const [buttonText, setButtonText] = useState("Continue");
    const [initForm, setInitForm] = useState(true);
    const [logIn, setLogIn] = useState(false);
    const [signUp,setSignUp] = useState(false);
    const [error, setError] = useState(null);
    const [token, setToken] = useRecoilState(UserTokenState);



    const [data, setData] = useState<FormDataInterface>({
      email: "",
      password: "",
      nickname: "",
      currency: ""
    })

    const [isDisabled, setIsDisabled] = useState(false);

    function handleSubmit(event : any)
    {
      event.preventDefault();
    }

    function handleEmailCheck()
    {
      
    }

    function handleLogIn()
    {
      
    }

    function handleSignUp()
    {
      
    }

    return (
      <div className="form">
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className='form-fields' >
              <input type="email" name="email" placeholder='email:' value={data.email} disabled={isDisabled} onChange={(e)=>setData({...data, email:e.target.value})}></input>
              {(logIn || signUp) && <input type="password" name="password" placeholder='password:' value={data.password} onChange={(e)=>setData({...data, password:e.target.value})}></input>}
              {signUp && <input type="text" name="nickname" placeholder='nickname:' value={data.nickname} onChange={(e)=>setData({...data, nickname:e.target.value})}></input> }
              {signUp && <CurrencyDropdown currency={data.currency} setCurrency={(e:any)=>setData({...data, currency:e.target.value})}></CurrencyDropdown>}
            </div>
            <div className='form-button' >
              {initForm && <EmailButton email={data.email} buttonText={buttonText} setButtonText={setButtonText} setInitForm={setInitForm} setLogIn={setLogIn} setSignUp={setSignUp} setIsDisabled={setIsDisabled}></EmailButton>} 
              {logIn && <LogInButton email={data.email} password={data.password} buttonText={buttonText}></LogInButton>}
              {signUp && <SignUpButton email={data.email} password={data.password} nickname={data.nickname} currency={data.currency} buttonText={buttonText} ></SignUpButton>}
            </div>
          </form>        
      </div>
    );
  }
  
  export default Form;