import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import {fetchPost, postData} from '../../store/fetchPostSlice';
import { useParams } from 'react-router';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { resetHandlePassword} from '..//../store/fetchPostSlice';
import {resetAll} from '../../store/savePostSlice';

export default function PostLockedAndBurnd() {
	const isActive = useMediaQuery('(min-width:900px)');
	const dispatch = useDispatch();
	let { postid } = useParams();
	const [password, setPassword] = useState('')
	const [burnWarning, setBurnWarning] = useState(false);
	const [passWarning, setPassWarning] = useState(false);
	const postInfo = useSelector(postData); 

	


	const unlockPost=()=> {
		dispatch(fetchPost({postid, password}))
	}

	useEffect(() => {
		if(postInfo.expire === "B"){
			setBurnWarning(true);
		}
		if(postInfo.isPassword === true){
			setPassWarning(true);
		}
		return(()=> {
			dispatch(resetHandlePassword())
			dispatch(resetAll());
		})
	},[dispatch, postInfo.expire, postInfo.isPassword])

	return (
		<div
			style={{
				flexGrow: 1,
				marginLeft: isActive ? '50px' : '10px',
				marginRight: isActive ? '50px' : '10px'
			}}
		>
			<Grid container item lg={12} spacing={1}>
				<Grid item lg={12} xs={12}>
					<h5>Locked Post</h5>
					<hr />
					{burnWarning &&
					<Grid
					style={{
							border: '1px solid #f44336',
							borderWidth: '1px 1px 1px 8px',
							borderRadius: '3px',
							margin: '6px 0',
							padding: '10px 10px 10px 38px'
						}}
						item
						lg={12}
						xs={12}
						>
						🔥Once accessed, you can no longer view this post, it will be <b>permanently removed</b> .If you
						need access to this information again please copy the data to a secure location.
						<br />
						<br />
						You're about to Burn this paste: <b>{postid}</b> after reading it.
					</Grid>}
					{ passWarning &&
					<Grid item lg={12} sm ={12} xs={12} container>
                        <Grid item lg={5} sm={6} xs={12} >
                            <InputLabel style={{marginTop: "5%", marginBottom: "5%"}} htmlFor="post-unlock-password">Enter Password:</InputLabel>
                        </Grid>
						<Grid item lg={5} sm={6} xs={12}>
							<TextField
								value={password}
								onChange={e => setPassword(e.target.value)}
                                fullWidth
                                required
								id="post-unlock-password"
								label="Password"
								type="password"
								autoComplete="current-password"
							/>
						</Grid>
					</Grid>
					}
					<Grid item lg={12} sm ={12} xs={12} container>
                        <Grid item lg={5} sm={6} xs={12} >
                        </Grid>
						<Grid item lg={5} sm={6} xs={12} container direction="column" spacing={2}>
							{passWarning && !burnWarning &&
                            <Grid item lg={12} sm={12} xs={12}>
                                <Button onClick={unlockPost} fullWidth variant="contained" color="primary">Unlock Post</Button>
                            </Grid>
							}
							{burnWarning &&
                            <Grid item lg={12} sm={12} xs={12}>
                                <Button onClick={()=> {
									dispatch(fetchPost({postid, password, permission: 'true'}))
								}} fullWidth variant="contained" color="primary">Open</Button>
                            </Grid>}
						</Grid>
					</Grid>
				</Grid>
			</Grid>
		</div>
	);
}
