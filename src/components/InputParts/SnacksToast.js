import React,{useState} from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

function Alert(props) {
	return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function SnacksToast(props) {
	const [ snack, setSnack ] = useState(props.snack);

	const handleCloseSnack = (event, reason) => {
		if (reason === 'clickaway') {
			return;
		}

		setSnack(false);
	};

	return (
		<Snackbar open={snack} autoHideDuration={6000} onClose={handleCloseSnack}>
			<Alert onClose={handleCloseSnack} severity={props.state}>
				{props.message}
			</Alert>
		</Snackbar>
	);
}

export default SnacksToast;
