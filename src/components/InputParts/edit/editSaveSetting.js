import React, { useState, useEffect } from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import EditExpiredropdown from './editExpireDropDown';
import EditLanguageDropdown from './editLanguageDropDown';
import EditPrivacydropdown from './editPrivacyDropDown';
import Grid from '@material-ui/core/Grid';
import FormHelperText from '@material-ui/core/FormHelperText';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import UpdateIcon from '@material-ui/icons/Update';
import { edithandlePassword, edithandletitle, AsyncthunkUpdatePost, CUDloader, createPost } from '../../../store/savePostSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {editData} from '../../../store/savePostSlice';
import ButtonLoader from '../buttonLoader';


const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	}
}));

const passwordGenerator = () => {
	const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let pass = '';
	for (let i = 0; i < 8; i++) {
		pass += charset.charAt(Math.floor(Math.random() * charset.length));
	}
	return pass;
};

export default function EditSaveSetting() {
	const prevData = useSelector(editData);
	const load = useSelector(CUDloader);
	const [ password, setPassword ] = useState('');
	const [ checked, setChecked ] = useState(false);
	const classes = useStyles();
	const dispatch = useDispatch();
	const history = useHistory();
	const currData = useSelector(createPost);



	const handleChange = (event) => {
		setChecked(event.target.checked);
		if (checked === false) {
			const pass = passwordGenerator();
			setPassword(pass);
			dispatch(edithandlePassword({ Password: pass }));
		} else {
			setPassword('');
			dispatch(edithandlePassword({ Password: '' }));
		}
	};
	const handlesetPass = (event) => {
		setPassword(event.target.value);
		dispatch(edithandlePassword({ Password: event.target.value }));
	};

	const handleSavePost=()=> {
		// dispatch a action to save post in db
		console.log("dispatching action");
		dispatch(AsyncthunkUpdatePost(prevData.path))
		.then(unwrapResult)
		.then(r => {
			history.push('/'+r)
			console.log("from component ",r);
		});
	}

	useEffect(() => {
		setPassword(prevData.password);
		setChecked(prevData.isPassword);
	}, [prevData.password, prevData.isPassword])

	return (
		<div>
			<Grid item lg={12} container className={classes.root}>
				<Grid style={{ backgroundColor: 'orange' }} item lg={12} xs={12}>
					<div className="title">Title and setting of post</div>
				</Grid>
				<Grid style={{ backgroundColor: 'white' }} xs={12} item lg={4}>
					<FormHelperText>Syntax Highlighting:</FormHelperText>
					<EditLanguageDropdown />
				</Grid>
				<Grid style={{ backgroundColor: '' }} item xs={12} lg={4}>
					<FormHelperText>Expiration:</FormHelperText>
					<EditExpiredropdown />
				</Grid>
				<Grid style={{ backgroundColor: '' }} item xs={12} lg={4}>
					<FormHelperText>Post Security:</FormHelperText>
					<EditPrivacydropdown />
				</Grid>
				<Grid style={{ backgroundColor: '' }} item xs={12} lg={4}>
					<FormHelperText>Password:</FormHelperText>
					<FormControlLabel
						control={<Checkbox checked={checked} onChange={handleChange} name="checkedB" color="primary" />}
						label={checked ? 'Enabled' : 'Disabled'}
					/>
					<TextField
						onChange={handlesetPass}
						id="post-password"
						type="text"
						value={password}
						disabled={checked ? false : true}
					/>
				</Grid>
				<Grid style={{ backgroundColor: '' }} item xs={12} lg={4}>
					<TextField
						onChange={(e) => dispatch(edithandletitle({title: e.target.value}))}
						id="standard-basic"
						label="Title"
						fullWidth
						value={prevData.title}
					/>
				</Grid>
				<Grid style={{ backgroundColor: '' }} item xs={12} lg={4}>
					<Button disabled={load || currData.code.trim().length === 0 || currData.title.trim().length === 0} onClick={handleSavePost} fullWidth variant="contained" color="primary" startIcon={<UpdateIcon />}>
						Update
					{load && <ButtonLoader top="50%" left="50%" />}
					</Button>
				</Grid>
			</Grid>
		</div>
	);
}
