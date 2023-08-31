import { Link } from 'react-router-dom';
import '../../css/RegisterPages/Form.css';
import { useState } from 'react';

function Form() {

    const [buttonText, setButtonText] = useState("Continue");

    function handleButton()
    {
      if(buttonText==="Log In" || buttonText==="Sign Up")
      {
        <Link to="/home"></Link>
      }else{
        //sprawdzanie czy email jest w bazie jeśli tak:
        setButtonText("Log In");
        //jeśli nie
          setButtonText("Sign Up");
      }
    }

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
        <div className='form-fields'>
          <form>
            <input type="email" name="email" placeholder='email:'></input>
          </form>
        </div>
        <div className='form-button'>
          <button className='form-continue-button' onClick={handleButton}>
            {buttonText}
          </button>
        </div>
      </div>
    );
  }
  
  export default Form;