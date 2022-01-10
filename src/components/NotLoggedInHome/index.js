import React, {useEffect} from 'react';
import './index.css';
import SaveSetting from '../InputParts/SaveSetting';
import PublicPost from './public-post';
import TextareaAutosize from '@material-ui/core/TextareaAutosize';
import Hidden from '@material-ui/core/Hidden';

import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useDispatch } from 'react-redux';
import { handlecode } from '../../store/savePostSlice';

function NotLoggedInHome() {
	const isActive = useMediaQuery('(min-width:900px)');
	const dispatch = useDispatch();

	const handleChange = (e) => {
		dispatch(handlecode({ code: e.target.value }));
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
							<TextareaAutosize id="textbox" onChange={handleChange} />
						</Grid>
						<Grid item lg={12} xs={12}>
							<SaveSetting />
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

export default NotLoggedInHome;
