import React, { useState } from 'react';
import './index.css';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonIcon from '@material-ui/icons/Person';
import { grey } from '@material-ui/core/colors';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useDispatch } from 'react-redux';
import { Asyncthunklogin, AsyncthunkSignUp } from '../../store/userSlice';
import { useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import {loader} from '../../store/fetchPostSlice';
import ButtonLoader from './buttonLoader';
import Link from '@material-ui/core/Link';
import { useHistory } from 'react-router-dom';


export const Login = () => {
	const load = useSelector(loader);
	const [ username, setUsername ] = useState('');
	const [ password, setPassword ] = useState('');
	const dispatch = useDispatch();
	const history = useHistory();


	const handlelogin = () => {
		const loginData = { username, password };
		dispatch(Asyncthunklogin(loginData))
	};
	return (
		<div className="login">
			<PersonIcon style={{ fontSize: 40, color: grey[700] }} />
			<TextField
				id="login-username-input"
				label="Username"
				type="text"
				onChange={(e) => setUsername(e.target.value)}
			/>
			<TextField
				id="login-password-input"
				label="Password"
				type="password"
				onChange={(e) => setPassword(e.target.value)}
			/>
			<Button disabled={load || username.trim().length === 0 || password.trim().length === 0 } variant="outlined" color="primary" id="login" onClick={handlelogin}>
				Login
			{load && <ButtonLoader top="50%" left="50%" />}
			</Button>
			<Link
				component="button"
				variant="body2"
				onClick={() => {
					history.push('/forgot-password')
				}}
				>
				Forgot Password ?
			</Link>
		</div>
	);
};

export const Signup = () => {
	const load = useSelector(loader);
	const [ name, setName ] = useState('');
	const [ username, setUsername ] = useState('');
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');
	const dispatch = useDispatch();
	const handlesignup = () => {
		// handle signup
		const SignUpData = { name, username, email, password };
		dispatch(AsyncthunkSignUp(SignUpData)).then(unwrapResult).then((r) => {
			console.log('using then ', r);
		});
	};
	return (
		<div className="signupContainer">
			<div className="signup">
				<PersonAddIcon style={{ fontSize: 40, color: grey[700] }} />
				<TextField id="name-input" label="Name" type="text" onChange={(e) => setName(e.target.value)} />
				<TextField
					id="username-input"
					label="Username"
					type="text"
					onChange={(e) => setUsername(e.target.value)}
				/>
				<TextField id="email-input" label="Email" type="email" onChange={(e) => setEmail(e.target.value)} />
				<TextField
					fullWidth
					id="password-input"
					label="Password"
					type="password"
					onChange={(e) => setPassword(e.target.value)}
				/>
				<Button disabled={load || 
					username.trim().length === 0 || 
					name.trim().length === 0 ||
					email.trim().length === 0 ||
					password.trim().length === 0
					
					} onClick={handlesignup} variant="outlined" color="primary" id="signup">
					signup
				{load && <ButtonLoader top="50%" left="50%" />}
				</Button>
			</div>
		</div>
	);
};
