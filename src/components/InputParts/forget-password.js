import React,{useState} from 'react';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useDispatch, useSelector } from 'react-redux';
import {AsyncthunkResetPass, rploader, AsyncthunkVerifyotp} from '../../store/userSlice';
import { unwrapResult } from '@reduxjs/toolkit'
import ButtonLoader from './buttonLoader';

export default function ForgetPassword() {
    const [email, setEmail] = useState('');
    const [msg, setMsg] = useState('');
    const dispatch = useDispatch();
    const load = useSelector(rploader);
    const [btnState, setBtnState] = useState('Submit');
    const [resp, setResp] = useState(false);
    const [color, setColor] = useState('');
    const [newPass, setNewPass] = useState('');
    const [resetCode, setResetCode] = useState('')

    
    const sendMail=()=> {
        // dispatch action for verfication
        dispatch(AsyncthunkResetPass({email})).then(unwrapResult)
        .then(resp => {
            if(resp.error){
                setMsg(resp.error);
                setColor('red');
                setBtnState('resend');
            }
            else if(resp.message){
                setMsg(resp.message);
                setBtnState('Submit');
                setResp(true);
                setColor('green');
            }
        }).catch(err => {
            console.log("Network issue");
        })
    }

    const verifyOtp=()=> {
        //dispatch action for OTP verification
        const data = {
            email,
            resetCode,
            newPass: newPass
        }
        dispatch(AsyncthunkVerifyotp(data)).then(unwrapResult)
        .then(resp => {
            if(resp.error){
                setMsg(resp.error);
                setColor('red');
            }
            else if(resp.message){
                setMsg(resp.message);
                setColor('green');
                setResp(false);
            }
        }).catch(err => {
            console.log("Network issue");
        })
    }
	return (
		<div style={{ width: '90%' }}>
			<Box
				style={{ width: '100%' }}
				display="flex"
				alignItems="center"
				m={1}
				p={1}
				flexDirection="column"
                >
                <p style={{color: color}}>{msg}</p>
				<Box display="flex" p={1} flexDirection="row">
					<Box flexGrow={1} p={1}>
						<TextField
                            value={email}
							id="email-input"
							label="Email"
                            type="text"
                            onChange={(e) => setEmail(e.target.value)}
						/>
					</Box>
					<Box>
                        <Button disabled={load} onClick={sendMail} variant="outlined">
							{btnState}
                        {load && <ButtonLoader left="50%" top="50%" />}
						</Button>
					</Box>
				</Box>
                {resp ?
                <>
				<Box display="flex" p={1} flexDirection="column">
					<Box flexGrow={1} p={1}>
						<TextField
                            value={resetCode}
							id="OTP-input"
							label="OTP"
                            type="text"
                            onChange={e => setResetCode(e.target.value)}
                            />
					</Box>
					<Box flexGrow={1} p={1}>
						<TextField
                            value={newPass}
							id="newPass-input"
							label="New Password"
                            type="text"
                            onChange={e => setNewPass(e.target.value)}
                            />
					</Box>
					
				</Box>
				<Box display="flex" p={1} flexDirection="row">
					<Box flexGrow={1} p={1} />
					<Box flexGrow={1} p={1}>
						<Button disabled={load} onClick={verifyOtp} variant="outlined">
							Change
                            {load && <ButtonLoader left="50%" top="50%" />}
						</Button>
					</Box>
				</Box>
                </>
            :
            null
        }
			</Box>
		</div>
	);
}
