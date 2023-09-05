import '../../css/HomePage/SignUpFollowUp.css';
import {useState} from 'react';
import CurrencyDropdown from './CurrencyDropdown';


function SignUpFollowUp() {

    const [buttonText, setButtonText] = useState("Finish");
    const [filePath, setFilePath] = useState("no file chosen");

    function handleButtonClicked(){
        

    }

    function handleFileChange(path : string)
    {
        let pathElements = path.split('\\')
        let newPath = pathElements[pathElements.length - 1]
        newPath = newPath === "" ? "no file chosen" : newPath
        setFilePath(newPath);
    }

    return (
      <div className="signup-followup">
        <div className='title'>
            Before you begin
        </div>
        <div className='information-fields'>
            <form>
                <label>
                    Choose curency:
                </label>
                <CurrencyDropdown></CurrencyDropdown>

                <label>
                    Pick your bank:
                </label>
                <select className='field-style'>
                    <option value="PKO BP">PKO BP</option>
                    <option value="Pekao">Pekao</option>
                    <option value="Santander Bank">Santander Bank</option>
                    <option value="ING Bank">ING Bank</option>
                    <option value="mBank">mBank</option>
                    <option value="Other">Other</option>
                </select>
                <label>
                    Put your bank balance:
                </label>
                <input type="text" placeholder='0' className='field-style'></input>
 
                <label>
                    Choose your avatar:
                </label>
                <div className='avatar-input-container'>
                    <div className='avatar-input-button'>
                        <input  type="file" className='file-input' id='avatar-input' style={{display: 'none'}} 
                        onChange={(e)=>{handleFileChange(e.target.value)}}></input>
                        <label htmlFor='avatar-input'>
                            <div>
                                Choose File
                            </div>
                        </label>
                    </div>
                    <span>
                        {filePath}
                    </span>
                </div>
                
                
            </form>
        </div>
        <div className='button-container'>
            <button onClick={handleButtonClicked}>{buttonText}</button>
        </div>
      </div>
    );
  }
  
  export default SignUpFollowUp;