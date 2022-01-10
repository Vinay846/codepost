import React, { useState, useEffect } from 'react';
import './index.css';
import Grid from '@material-ui/core/Grid';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import PublicIcon from '@material-ui/icons/Public';
import TablePagination from '@material-ui/core/TablePagination';
import { publicPost, postData } from '../../store/fetchPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import { timeConversion } from '../tStamp';

export default function FullPagePostView() {
	const isActive = useMediaQuery('(min-width:900px)');
	const dispatch = useDispatch();
	const publicPostArr = useSelector(postData);
	const history = useHistory();
	const [ page, setPage ] = useState(0);
	const [ rowsPerPage, setRowsPerPage ] = useState(10);

	const handleChangePage = (event, newPage) => {
		setPage(newPage);
	};

	const handleChangeRowsPerPage = (event) => {
		setRowsPerPage(+event.target.value);
		setPage(0);
	};

	useEffect(() => {
		dispatch(publicPost());
	}, [dispatch])

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
					<hr />
					<TableContainer>
						<Table>
							<TableHead>
								<TableRow>
									<TableCell>TITLE</TableCell>
									<TableCell align="right">Posted</TableCell>
									<TableCell align="right">Syntax</TableCell>
								</TableRow>
							</TableHead>
							<TableBody>
								{publicPostArr.publicPost
									.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
									.map((row) => (
										<TableRow
											key={row.path}
											hover
											style={{ cursor: 'pointer' }}
											onClick={() => history.push('/' + row.path)}
										>
											<TableCell component="th" scope="row">
												<div className="title">
													{row.isPassword ? (
														<Tooltip title="Locked Post">
															<VpnLockIcon style={{ verticalAlign: 'middle' }} />
														</Tooltip>
													) : (
														<Tooltip title="Public Post">
															<PublicIcon style={{ verticalAlign: 'middle' }} />
														</Tooltip>
													)}
													&nbsp;
													{row.title}
												</div>
											</TableCell>
											<TableCell align="right">{timeConversion(row.createdAt)}</TableCell>
											<TableCell align="right">{row.Syntax_Highlighting}</TableCell>
										</TableRow>
									))}
							</TableBody>
						</Table>
					</TableContainer>
					<TablePagination
						rowsPerPageOptions={[ 5, 10, 25 ]}
						component="div"
						count={publicPostArr.publicPost.length}
						rowsPerPage={rowsPerPage}
						page={page}
						onChangePage={handleChangePage}
						onChangeRowsPerPage={handleChangeRowsPerPage}
					/>
				</Grid>
			</Grid>
		</div>
	);
}
