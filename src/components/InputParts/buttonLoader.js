import React from 'react';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';
import { grey } from '@material-ui/core/colors';


const useStyles = makeStyles((theme) => ({
	buttonProgress: {
		color: grey[900],
		position: 'absolute',
		marginTop: -12,
		marginLeft: -12,
	  },
}));



function ButtonLoader(props) {
	const classes = useStyles();
	return (
			<CircularProgress size={24} className={classes.buttonProgress} style={{top: props.top, left: props.left}}/>
	);
}

export default ButtonLoader;