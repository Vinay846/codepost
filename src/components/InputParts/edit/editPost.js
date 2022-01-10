import React, {useEffect} from 'react';
import '../../NotLoggedInHome/index.css';
import EditSaveSetting from './editSaveSetting';
import PublicPost from '../../NotLoggedInHome/public-post';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Hidden from '@material-ui/core/Hidden';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import {editData} from '../../../store/savePostSlice';
import {edithandlecode} from '../../../store/savePostSlice';
import { useSelector, useDispatch } from 'react-redux';



function EditExistingPost() {
	const isActive = useMediaQuery('(min-width:900px)');
	const dispatch = useDispatch();
	const prevData = useSelector(editData);

	const handleChange = (e) => {
		dispatch(edithandlecode({ code: e.target.value }));
	};

	const useTab = (e) => {
		const textbox = document.querySelector("#textbox")
		let { keyCode } = e;
		let { value, selectionStart, selectionEnd } = textbox;
		if (keyCode === 9) {  // TAB = 9
			e.preventDefault();
	  
			textbox.value = value.slice(0, selectionStart) + "\t" + value.slice(selectionEnd);
	  
			textbox.setSelectionRange(selectionStart+1, selectionStart+1)
		}

	}

	useEffect(() => {
		const textbox = document.querySelector("#textbox")
		textbox.addEventListener('keydown', useTab);
		return () => {
			textbox.removeEventListener('keydown', useTab);
		}
	})

	return (
		<div
			style={{
				flexGrow: 1,
				marginLeft: isActive ? '50px' : '10px',
				marginRight: isActive ? '50px' : '10px'
			}}
		>
			<Grid container>
				<Grid item lg={12} spacing={1} container>
					<Grid item lg={10} xs={12} container direction="row">
						<Grid item lg={12} xs={12}>
							<TextareaAutosize value={prevData.code} id="textbox" onChange={handleChange} />
						</Grid>
						<Grid item lg={12} xs={12}>
							<EditSaveSetting />
						</Grid>
					</Grid>
					<Hidden smDown>
						<Grid item lg={2}>
							<PublicPost />
						</Grid>
					</Hidden>
				</Grid>
			</Grid>
		</div>
	);
}

export default EditExistingPost;
