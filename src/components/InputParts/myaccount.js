import React,{useState} from 'react';
import Box from '@material-ui/core/Box';
import {userData} from '../../store/userSlice';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import {ChangePass, rploader} from '../../store/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import ButtonLoader from './buttonLoader';


function MyAccount() {
	const data = useSelector(userData);
	const [changePass, setChangePass] = useState(false);
	const [oldPass, setOldPass] = useState('');
	const [newPass, setNewPass] = useState('');
	const dispatch = useDispatch();
    const load = useSelector(rploader);
	const [msg, setMsg] = useState('');
	const [msgState, setMsgState] = useState(false);
	const [color, setColor] = useState('');

	const handleChangePass=()=> {
		//dispatch action to change password
		dispatch(ChangePass({oldPass, newPass})).then(unwrapResult)
		.then(resp => {
            if(resp.error){
                setMsg(resp.error);
                setColor('red');
            }
            else if(resp.message){
                setMsg(resp.message);
                setMsgState(true);
				setColor('green');
				setChangePass(false);
            }
        }).catch(err => {
            console.log("Network issue");
        })
	}
	
	return (
		<div style={{ width: '90%' }}>
			<Box style={{ width: '100%' }} display="flex" alignItems="center" m={1} p={1} bgcolor="background.paper" flexDirection="column">
				<Box style={{ width: '100%' }} display="flex" m={1} p={1} bgcolor="background.paper" flexDirection="column">
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>Name:</Box>
						<Box p={1}>{data.name}</Box>
					</Box>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>Username:</Box>
						<Box p={1}>{data.username}</Box>
					</Box>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>Email:</Box>
						<Box p={1}>{data.email}</Box>
					</Box>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>
							<Link
								component="button"
								variant="body2"
								onClick={() => {
									setChangePass(true);
								}}
								>
								Change Password
							</Link>
					</Box>
					</Box>
					{changePass ?
					<>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>Old Password:</Box>
						<Box >
						<TextField
						value={oldPass}
						id="old-password-input"
						label="Old Password"
						type="text"
						autoComplete="current-password"
						onChange={e => setOldPass(e.target.value)}
						/>
						</Box>
					</Box>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}>New Password:</Box>
						<Box >
							<TextField
							value={newPass}
							id="change-password-input"
							label="New Password"
							type="text"
							autoComplete="current-password"
							onChange={e => setNewPass(e.target.value)}
							/>
						</Box>
					</Box>
					<Box display="flex" p={1} flexDirection="row">
						<Box flexGrow={1} p={1}></Box>
						<Box flexGrow={1} p={1}>
							<Button disabled={load} onClick={handleChangePass} variant="outlined">
								Change
								{load && <ButtonLoader left="50%" top="50%" />}
							</Button>
						</Box>
					</Box>
					</>
					:null
				}
				{msgState && <p style={{color: color}}>{msg}</p>}
				</Box>
			</Box>
		</div>
	);
}

export default MyAccount;
