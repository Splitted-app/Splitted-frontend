import { Link } from 'react-router-dom';
import '../../css/RegisterPages/Form.css';
import { useState } from 'react';
import EmailButton from './EmailButton';
import LogInButton from './LogInButton';
import SignUpButton from './SignUpButton';

// interface FormProps
// {
//   users: any;
// }


function Form() {

    const [buttonText, setButtonText] = useState("Continue");
    const [email, setEmail] = useState("");
    const [initForm, setInitForm] = useState(true);
    const [logIn, setLogIn] = useState(false);
    const [signUp,setSignUp] = useState(false);
    const [password, setPassword] = useState("");
    const [nickname, setNickname] = useState("");
    const [isDisabled, setIsDisabled] = useState(false);

    return (
      <div className="form">
        <div className="form-title">
          <div className="form-main-title">
            Splitted
          </div>
          <div className="form-subtitle">
            Spend it, Track it, Splitted
          </div>
        </div>
        <div className='form-fields' >
          <form >
            <input type="email" name="email" placeholder='email:' value={email} disabled={isDisabled} onChange={(e)=>setEmail(e.target.value)}></input>
            {(logIn || signUp) && <input type="password" name="password" placeholder='password:' value={password} onChange={(e)=>setPassword(e.target.value)}></input>}
            {signUp && <input type="text" name="nickname" placeholder='nickname:' value={nickname} onChange={(e)=>setNickname(e.target.value)}></input> }
          </form>
        </div>
        <div className='form-button' >
          {initForm && <EmailButton email={email} buttonText={buttonText} setButtonText={setButtonText} setInitForm={setInitForm} setLogIn={setLogIn} setSignUp={setSignUp} setIsDisabled={setIsDisabled}></EmailButton>} 
          {logIn && <LogInButton email={email} password={password} buttonText={buttonText}></LogInButton>}
          {signUp && <SignUpButton email={email} password={password} nickname={nickname} buttonText={buttonText} ></SignUpButton>}
        </div>
      </div>
    );
  }
  
  export default Form;