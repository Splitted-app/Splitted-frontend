import '../../css/SettingsPage/TrainAIPage.css'

import { useState } from 'react';
import LoadingPanel from '../Common/LoadingPanel';
import api from '../../services/api';


function TrainAIPage() {
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    function handleTrainModelButton()
    {
        setLoading(true);
        api.post('/api/transactions/train-ai', null)
        .then((res)=>{
            setError(false);
        })
        .catch((error)=>{
            setError(true);
            console.error(error);
        })
        .finally(()=>{
            setLoading(false);
        })
    }

    return (
      <div className="train-ai-page" data-testid="train-ai-page">
        <div className='train-ai-page-header'>
            <div className='train-ai-page-title'>
                <div className='train-ai-page-maintitle'>
                    AI Model
                </div>
            </div>
        </div>
        <div className='train-ai-page-content'>
            <div className="train-ai-page-content-description">
                When adding transactions by importing a csv file, our application uses an AI model to improve user's experience. 
                The model uses an artifical inteligence algorithm to predict custom categories for user's transactions. When a user 
                adds transactions by import or changes categories of existing transactions the model learns from the user's data improving 
                its predictions. For users with a verified email we chose to include an additional functionality. When clicking the button 
                located on the right of the screen, user can train the model without having to do any other actions. 
            </div>
            <div className='train-ai-page-content-button-container'>
                {loading && <LoadingPanel error={error} color={"white"}/>}
                {!loading &&
                    <button className='train-ai-button' onClick={handleTrainModelButton}>Train Model</button>
                }
            </div>
        </div>
      </div>
    );
  }
  
  export default TrainAIPage;