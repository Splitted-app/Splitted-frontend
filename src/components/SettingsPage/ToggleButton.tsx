import '../../css/SettingsPage/ToggleButton.css'

import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import Switch from '@mui/material/Switch';

interface ToggleButtonInterface
{
    text:string;
}

function ToggleButton({text}:ToggleButtonInterface) {
    return (
      <div className="toggle-button">
        <div className='toggle-button-container'>
            <FormGroup>
                <FormControlLabel control={<Switch defaultChecked/>} label={text} />
            </FormGroup>
        </div>
      </div>
    );
  }
  
  export default ToggleButton;