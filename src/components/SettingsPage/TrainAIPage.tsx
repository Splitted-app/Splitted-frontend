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
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatem laudantium natus iure consequatur fugit totam libero? Officiis cupiditate quas deleniti ducimus obcaecati perspiciatis nostrum suscipit, aut libero dolor maxime delectus!
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat eos natus voluptatum quam, ipsum dolorem voluptas, maxime cupiditate reprehenderit quas neque autem est omnis ea, ipsa repudiandae iure libero ipsam!


                Lorem ipsum dolor sit amet consectetur adipisicing elit. Exercitationem autem dolores deleniti, accusamus quo odit rerum, ad hic laudantium itaque, reiciendis in praesentium nemo magni minus asperiores repudiandae sint cumque!
                Lorem ipsum dolor, sit amet consectetur adipisicing elit. Reprehenderit cupiditate magni consequatur qui dignissimos! Vero recusandae nisi illo voluptate in totam dolore id architecto nam delectus suscipit, dolorem at odio.
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