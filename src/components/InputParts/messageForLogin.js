import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';
import {useSelector} from 'react-redux';
import {UserSliceLoader} from '../../store/userSlice';
import ContentLoader from './contentLoader'

function MessageForLogin() {
	const loader = useSelector(UserSliceLoader);
	return (
		loader ? 
			<ContentLoader />
		:
		<Alert severity="error">
			<AlertTitle>Error</AlertTitle>
			To view This Page — <strong>Login in your account</strong>
		</Alert>
	);
}

export default MessageForLogin;