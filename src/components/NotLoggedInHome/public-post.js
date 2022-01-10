import React,{useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import {publicPost, postData} from '../../store/fetchPostSlice';
import { useSelector, useDispatch } from 'react-redux';
import { timeConversion } from '../tStamp';
import { useHistory } from 'react-router-dom';
import Tooltip from '@material-ui/core/Tooltip';
import VpnLockIcon from '@material-ui/icons/VpnLock';
import PublicIcon from '@material-ui/icons/Public';
import './index.css';
import ListItem from '@material-ui/core/ListItem';


const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    padding: 0,
    backgroundColor: theme.palette.background.paper,
  },
  fix: {
      padding: '0px',
  }
}));


export default function PublicPost() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const publicPostArr = useSelector(postData);
  const history = useHistory();

  
  useEffect(() => {
    dispatch(publicPost());
  }, [dispatch])


  return (
    <div className={classes.root}>
        <div className="public-list-Sidebar">
        {publicPostArr.publicPost.map((post, postId) => (
                postId < 80?
                <div key={post.path}>
                    <List dense className={classes.fix} style={{cursor: "pointer"}} onClick={() => history.push('/'+post.path)}>
                    <ListItem button>
                    {post.isPassword ? (
                      <Tooltip title="Locked Post">
															<VpnLockIcon style={{ verticalAlign: 'middle', fontSize: 15 }} />
														</Tooltip>
                              
                              ) : (
														<Tooltip title="Public Post">
															<PublicIcon style={{ verticalAlign: 'middle', fontSize: 15 }} />
														</Tooltip>
													)}
                          &nbsp;
                          <ListItemText primary={post.title.slice(0, 20)+"..."} secondary={timeConversion(post.createdAt)} />
                          </ListItem>
                    </List>
                    <Divider />
                </div>
                :null
        ))}
        </div>
    </div>
  );
}

