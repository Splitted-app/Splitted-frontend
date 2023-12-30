import '../../css/SettingsPage/TrainAIPage.css'

import { useRecoilValue } from "recoil";
import axios from 'axios';

import { UserTokenState } from "../../atoms/UserToken";
import { useState } from 'react';
import LoadingPanel from '../Common/LoadingPanel';


function TrainAIPage() {
    const token = useRecoilValue(UserTokenState);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    function handleTrainModelButton()
    {
        setLoading(true);
        axios.post(process.env.REACT_APP_API_URL + '/api/transactions/train-ai', null, {
            headers: {
                'Accept': '*',
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        })
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
        // fetch(process.env.REACT_APP_API_URL + '/api/transactions/train-ai', {
        //     method: 'POST',
        //     credentials: 'include',
        //     headers: {
        //         'Accept': '*',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     }
        // })
        // .then(res => {
        //     if (!res.ok) {

        //         throw Error('could not fetch the data for that resource');
        //     }
        // });
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
                {loading && <LoadingPanel error={error}/>}
                {!loading &&
                    <button className='train-ai-button' onClick={handleTrainModelButton}>Train Model</button>
                }
            </div>
        </div>
      </div>
    );
  }
  
  export default TrainAIPage;