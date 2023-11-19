import '../../css/Common/LoadingPanel.css'

import { useEffect, useState } from "react";



function LoadingPanel()
{
    const [longwait, setLongwait] = useState<boolean>(false);

    useEffect(() => {
        setTimeout(() => setLongwait(true), 3000)
    })
    
    return (
        <div className="loading-panel">
            <div className='primary-message'>
                Loading...
            </div>
            <div className='secondary-message'>
                {longwait && "Looks like this might take a while :("}
            </div>
        </div>
    );
}

export default LoadingPanel;