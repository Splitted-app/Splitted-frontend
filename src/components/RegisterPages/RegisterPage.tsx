import { useState } from 'react';

import '../../css/RegisterPages/RegisterPage.css'
import EmailForm from './EmailForm'
import RegisterFormDataInterface from './RegisterFormDataInterface';
import LogInForm from './LogInForm';
import SignUpForm from './SignUpForm';

function RegisterPage() {

  const [data, setData] = useState<RegisterFormDataInterface>({
    email: "user@example.com",
    password: "",
    nickname: ""
  })

  const [state, setState] = useState<string>("emailCheck")

  return (
    <div className="register-page">
      <div className = "form-panel">
        <div className="panel-header">
            <div className="title">
              Splitted
            </div>
            <div className="subtitle">
              Spend it, Track it, Splitted
            </div>
        </div>
        {state == "emailCheck" && <EmailForm data={data} setData={setData} setState={setState}/>}
        {state == "logIn" && <LogInForm data={data} setData={setData} setState={setState}/>}
        {state == "signUp" && <SignUpForm data={data} setData={setData} setState={setState}/>}
        {/* <div className='back-button-container'>
          {state != "emailCheck" && <button onClick={()=>setState("emailCheck")}>Back</button>}
        </div> */}
      </div>
    </div>
  );
}

export default RegisterPage;