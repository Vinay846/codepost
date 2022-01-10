import React from 'react'
import CircularProgress from '@material-ui/core/CircularProgress';
import './index.css';


function FullPageLoader() {
    return (
        <div className="loader">
            <CircularProgress />
        </div>
    )
}

export default FullPageLoader
