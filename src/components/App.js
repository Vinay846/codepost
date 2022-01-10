import React, { useEffect } from 'react';
import Header from './header';
import NotLoggedInHome from './NotLoggedInHome/index.js';
import PostView from '../components/postView/index';
import PostLockedAndBurnd from './postView/post-LockedAndBurnd';
import FullPagePostView from './postView/fullPagePostView';
import UserPost from './postView/userPost';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import ToggleLoginOrSignup from './InputParts/ToggleLoginOrSignup';
import MyAccount from './InputParts/myaccount';
import { AsyncthunkProfile } from '../store/userSlice';
import { useDispatch } from 'react-redux';
import { resetHandlePassword } from '../store/fetchPostSlice';
import { resetAll } from '../store/savePostSlice';
import MessageForLogin from '../components/InputParts/messageForLogin';
import { useSelector } from 'react-redux';
import { loginStates } from '../store/userSlice';
import FullPageLoader from '../components/InputParts/fullPageLoader';
import EditExistingPost from './InputParts/edit/editPost';
import ForgetPassword from './InputParts/forget-password';


function App() {
	const dispatch = useDispatch();
	const Status = useSelector(loginStates);

	useEffect(() => {
		dispatch(AsyncthunkProfile());
	}, [dispatch]);

	useEffect(
		() => {
			dispatch(resetHandlePassword());
			dispatch(resetAll());
		},
		[ dispatch ]
	);

	return (
		<Router>
			<div className="App">
				<Header />
				<Switch>
					<Route exact path="/editpost">
						{Status.login || Status.alreadyLogin ? <EditExistingPost /> : <MessageForLogin />}
					</Route>
					<Route exact path="/forgot-password">
						<ForgetPassword />
					</Route>
					<Route exact path="/loader">
						<FullPageLoader />
					</Route>
					<Route exact path="/login">
						<ToggleLoginOrSignup />
					</Route>
					<Route exact path="/myaccount">
						{Status.login || Status.alreadyLogin ? <MyAccount /> : <MessageForLogin />}
					</Route>
					<Route exact path="/postviewid">
						<PostLockedAndBurnd />
					</Route>
					<Route exact path="/posts">
						<FullPagePostView />
					</Route>
					<Route exact path="/userposts">
						{Status.login || Status.alreadyLogin ? <UserPost /> : <MessageForLogin />}
					</Route>
					<Route exact path="/:postid">
						<PostView />
					</Route>
					<Route exact path="/"><NotLoggedInHome /></Route>
				</Switch>
			</div>
		</Router>
	);
}

export default App;
