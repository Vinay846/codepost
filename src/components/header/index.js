import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MoreIcon from '@material-ui/icons/MoreVert';
import NoteAddIcon from '@material-ui/icons/NoteAdd';
import NoteIcon from '@material-ui/icons/Note';
import ToggleLoginOrSignup from '../InputParts/ToggleLoginOrSignup';
import Button from '@material-ui/core/Button';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {loginStates, Logout} from '../../store/userSlice';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';
import Tooltip from '@material-ui/core/Tooltip';
import LinearProgress from '@material-ui/core/LinearProgress';
import {loader} from '../../store/fetchPostSlice';
import logo from './logo.svg';
import { useLocation } from "react-router-dom";



function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}


const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  logo: {
    marginRight: theme.spacing(2),
    width: "60px",
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  addIcon : {
    marginLeft: theme.spacing(1),
  },
  inputRoot: {
    color: 'inherit',
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Header() {
  const Status = useSelector(loginStates);
  const load = useSelector(loader);
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [login, setLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const [snack, setSnack] = useState(false);
  const [message, setMessage] = useState('');
  const [state, setState] = useState('');
  const history = useHistory();
  const dispatch = useDispatch();
  const [progress, setProgress] = React.useState(0);
	const {pathname}  = useLocation();

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setSnack(false);
  };
  
  useEffect(() => {
    if(pathname === '/forgot-password'){
      handleClose()
    }
  },[pathname]);


  useEffect(() => {
    setLogin(Status.login || Status.alreadyLogin);
    setOpen(false);
    if(Status.alreadyLogin === true){
      return;
    }
    if(Status.signup === true){
      setMessage(Status.message);
      setState("success");
      setSnack(true);
    }else if(Status.signup === false){
      setMessage(Status.message);
      setState("error");
      setSnack(true);
    }
    else if(Status.login === true){
      setMessage(Status.message);
      setState("success");
      setSnack(true);
    }else if(Status.login === false){
      setMessage(Status.message);
      setState("error");
      setSnack(true);
    }
    
  }, [Status.login, Status.message, Status.signup, Status.alreadyLogin])


  useEffect(() => {
    let timer;
    if(load){
        timer = setInterval(() => {
        setProgress((oldProgress) => {
          if (oldProgress === 100) {
            return 0;
          }
          const diff = Math.random() * 10;
          return Math.min(oldProgress + diff, 100);
        });
      }, 500);
    }

    return () => {
      clearInterval(timer);
    };
  }, [load]);



  const handleClose = () => {
    setOpen(false);
  };
  
  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMyAccounClick =() => {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/myaccount')
  }

  const handleUserPost=()=> {
    setAnchorEl(null);
    handleMobileMenuClose();
    history.push('/userposts')
  }

  const handleMyAccountMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };
  const handleLogoutMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    dispatch(Logout());
    // history.push('/')
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMyAccountMenuClose}
    >
      <MenuItem onClick={handleUserPost} >
        <IconButton color="inherit">
            <NoteIcon />
        </IconButton>
        <p>User Posts</p>
      </MenuItem>
      <MenuItem onClick={handleMyAccounClick}>My account</MenuItem>
      <MenuItem onClick={handleLogoutMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleUserPost} >
        <IconButton color="inherit">
            <NoteIcon />
        </IconButton>
        <p>User Posts</p>
      </MenuItem>
      <MenuItem onClick={handleMyAccounClick}>My account</MenuItem>
      <MenuItem onClick={handleLogoutMenuClose}>Logout</MenuItem>
    </Menu>
  );

  const handlelogin = (
      <>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
          >
        <Fade in={open}>
          <div className={classes.paper}>
            <ToggleLoginOrSignup />
          </div>
        </Fade>
      </Modal>
      </>
  )

  return (
    <div className={classes.grow}>
      {load && <LinearProgress color="secondary" variant="determinate" value={progress} />}
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.logo}
            color="inherit"
            onClick={e => history.push('/')}
          >
            <img  src={logo} className={classes.logo} alt="logo" />
          </IconButton>
          <Typography className={classes.title} variant="h6" noWrap>
            CodePost
          </Typography>
          <IconButton onClick={e => history.push('/')} className={classes.addIcon} color="inherit">
          <Tooltip title="Add new Post">
                <NoteAddIcon />              
          </Tooltip>
          </IconButton>
          <Snackbar open={snack} autoHideDuration={6000} onClose={handleCloseSnack}>
            <Alert onClose={handleCloseSnack} severity={state}>
              {message}
            </Alert>
          </Snackbar>
         
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton onClick={e => history.push('/posts')} color="inherit">
            <Tooltip title="Public Post">
                <NoteIcon />              
            </Tooltip>
            </IconButton>
           {login ?
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Tooltip title="User Profile">
                <AccountCircle />
              </Tooltip>
            </IconButton>
            : 
            <Button onClick={()=> setOpen(true)} color="inherit">Login/Signup</Button>}
          </div>
          <div className={classes.sectionMobile}>
          <IconButton onClick={e => history.push('/posts')} color="inherit">
            <Tooltip title="Public Post">
                <NoteIcon />              
            </Tooltip>
            </IconButton>
            {login ?
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
            :
            <Button onClick={()=> setOpen(true)} color="inherit">Login/Signup</Button>}
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {handlelogin}
    </div>
  );
}
