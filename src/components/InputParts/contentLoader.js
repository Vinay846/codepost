import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';


function ContentLoader() {
	return (
		<div className="p-loader" style={{display: "flex", justifyContent: "center"}}>
			<CircularProgress />
		</div> 
	);
}

export default ContentLoader;