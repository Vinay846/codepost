import React, { useEffect, useState } from 'react';
import Code from '../code';
import './index.css';
import PublicPost from '../NotLoggedInHome/public-post';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { fetchPost, postData } from '../../store/fetchPostSlice';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import PostLockedAndBurnd from '../postView/post-LockedAndBurnd';
import { useSelector } from 'react-redux';
import Hidden from '@material-ui/core/Hidden';
import Box from '@material-ui/core/Box';
import UpdateIcon from '@material-ui/icons/Update';
import Tooltip from '@material-ui/core/Tooltip';

export default function PostView() {
	const isActive = useMediaQuery('(min-width:900px)');
	const dispatch = useDispatch();
	const postInfo = useSelector(postData);
	let { postid } = useParams();
	const [ code, setCode ] = useState('');
	const [ Syntax_Highlighting, setSyntax_Highlighting ] = useState('None');
	const [ password, setPassword ] = useState(postInfo.showNotification);


	useEffect(
		() => {
			setPassword(postInfo.showNotification);
			setCode(postInfo.postData.code);
			setSyntax_Highlighting(postInfo.postData.setSyntax_Highlighting);
		},
		[ dispatch, postInfo.showNotification, postInfo.postData.code, postInfo.postData.setSyntax_Highlighting ]
	);

	useEffect(
		() => {
			dispatch(fetchPost({ postid }));
		},
		[ postid, dispatch ]
	);

	return (
		<div
			style={{
				flexGrow: 1,
				marginLeft: isActive ? '50px' : '10px',
				marginRight: isActive ? '50px' : '10px'
			}}
		>
			<Grid container item lg={12} spacing={1}>
				<Grid item lg={10} xs={12}>
					<div style={{ width: '100%' }}>
					<Box display="flex" p={1} bgcolor="background.paper">
						<Box p={1} flexGrow={1}>
							Title: {postInfo.postData.title}
						</Box>
						<Box p={1}>
							{postInfo.postData.Syntax_Highlighting}
						</Box>
						<Box p={1}>
						<Tooltip title={`Expire ${postInfo.postData.Expiration}`}>
							<UpdateIcon />
						</Tooltip>
						</Box>
					</Box>
					</div>
					<hr/>
					{password ? <PostLockedAndBurnd /> : <Code code={code} language={Syntax_Highlighting}/>}
				</Grid>
				<Hidden mdDown>
					<Grid item lg={2} xs={12}>
						<PublicPost />
					</Grid>
				</Hidden>
			</Grid>
		</div>
	);
}
