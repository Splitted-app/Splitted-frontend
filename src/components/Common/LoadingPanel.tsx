import '../../css/Common/LoadingPanel.css'

import { useEffect, useState } from "react";


interface LoadingPanelInterface
{
    error: boolean
    color: string
}

function LoadingPanel({error, color}: LoadingPanelInterface)
{
    const [longwait, setLongwait] = useState<boolean>(false);
    const [showError, setShowError] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLongwait(true), 3000)
        setTimeout(() => setShowError(true), 1000)
    })

    const style = { "--color": color } as React.CSSProperties;
    
    return (
        <div className="loading-panel">
            <div className='primary-message'>
                {!error && 
                <div className='loading'>
                    <div className="sk-circle">
                        <div className="sk-circle1 sk-child" style={style} ></div>
                        <div className="sk-circle2 sk-child" style={style}></div>
                        <div className="sk-circle3 sk-child" style={style}></div>
                        <div className="sk-circle4 sk-child" style={style}></div>
                        <div className="sk-circle5 sk-child" style={style}></div>
                        <div className="sk-circle6 sk-child" style={style}></div>
                        <div className="sk-circle7 sk-child" style={style}></div>
                        <div className="sk-circle8 sk-child" style={style}></div>
                        <div className="sk-circle9 sk-child" style={style}></div>
                        <div className="sk-circle10 sk-child" style={style}></div>
                        <div className="sk-circle11 sk-child"style={style}></div>
                        <div className="sk-circle12 sk-child" style={style}></div>
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