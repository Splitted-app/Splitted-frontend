import '../../css/Common/LoadingPanel.css'

import { useEffect, useState } from "react";


interface LoadingPanelInterface
{
    error: boolean
}

function LoadingPanel({error}: LoadingPanelInterface)
{
    const [longwait, setLongwait] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLongwait(true), 3000)
        console.log(error);
    })

    
    
    return (
        <div className="loading-panel">
            <div className='primary-message'>
                {!error && "Loading..."}
                {error && "Oops, something went wrong!"}
            </div>
            <div className='secondary-message'>
                {longwait && !error && "Looks like this might take a while :("}
            </div>
        </div>
    );
}

export default LoadingPanel;