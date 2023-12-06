import '../../css/Common/LoadingPanel.css'

import { useEffect, useState } from "react";


interface LoadingPanelInterface
{
    error: boolean
}

function LoadingPanel({error}: LoadingPanelInterface)
{
    const [longwait, setLongwait] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLongwait(true), 3000)
        setTimeout(() => setShowError(true), 1000)
    })
    
    return (
        <div className="loading-panel">
            <div className='primary-message'>
                {!error && 
                <div className='loading'>
                    <div className="sk-circle">
                        <div className="sk-circle1 sk-child"></div>
                        <div className="sk-circle2 sk-child"></div>
                        <div className="sk-circle3 sk-child"></div>
                        <div className="sk-circle4 sk-child"></div>
                        <div className="sk-circle5 sk-child"></div>
                        <div className="sk-circle6 sk-child"></div>
                        <div className="sk-circle7 sk-child"></div>
                        <div className="sk-circle8 sk-child"></div>
                        <div className="sk-circle9 sk-child"></div>
                        <div className="sk-circle10 sk-child"></div>
                        <div className="sk-circle11 sk-child"></div>
                        <div className="sk-circle12 sk-child"></div>
                    </div>
                </div>}
                {error && showError && "Oops, something went wrong!"}
            </div>
            <div className='secondary-message'>
                {/* {longwait && !error && "Looks like this might take a while :("} */}
            </div>
        </div>
    );
}

export default LoadingPanel;