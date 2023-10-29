import '../../css/SettingsPage/ToggleButton.css'
import Switch from '@mui/material/Switch';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';

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