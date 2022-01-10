import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {setLoader} from './fetchPostSlice';

export const Asyncthunklogin = createAsyncThunk('user/Asyncthunklogin', async (loginData, thunkAPI) => {
	thunkAPI.dispatch(setLoader(true));
	const { username, password } = loginData;
	return fetch('https://codepost-backend.herokuapp.com/login', {
		method: 'POST',
		body: JSON.stringify({ userName: username, password }),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
		.then((r) => {
			if (r.ok) {
				thunkAPI.dispatch(login({ login: true }));
				thunkAPI.dispatch(AsyncthunkProfile());
				thunkAPI.dispatch(setLoader(false));
				return r.json();
			} else {
				thunkAPI.dispatch(login({ login: false }));
				thunkAPI.dispatch(setLoader(false));
				return r.json();
			}
		})
		.catch((e) => {
			thunkAPI.dispatch(setLoader(false));
			// console.log(e);
		});
});

export const AsyncthunkSignUp = createAsyncThunk('user/AsyncthunkSignUp', async (SignUpData, thunkAPI) => {
	thunkAPI.dispatch(setLoader(true));
	const { name, username, email, password } = SignUpData;
	return fetch('https://codepost-backend.herokuapp.com/signup', {
		method: 'POST',
		body: JSON.stringify({ userName: username, password, email, name }),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: 'include'
	})
		.then((r) => {
			if (r.ok) {
				thunkAPI.dispatch(signup({ signup: true }));
				thunkAPI.dispatch(setLoader(false));
				return r.json();
			} else {
				thunkAPI.dispatch(signup({ signup: false }));
				thunkAPI.dispatch(setLoader(false));
				return r.json();
			}
		})
		.catch((e) => {
			thunkAPI.dispatch(setLoader(false));
			// console.log(e);
		});
});

export const AsyncthunkProfile = createAsyncThunk('user/AsyncthunkProfile', async (_, thunkAPI) => {

	return fetch('https://codepost-backend.herokuapp.com/userinfo', {credentials: 'include'})
		.then((r) => {
			if(r.ok){
				const resp = r.json();
				thunkAPI.dispatch(alreadyLogin({ alreadyLogin: true }));
				return resp;
			}else{
				// console.log("error");
				thunkAPI.dispatch(alreadyLogin({ alreadyLogin: false }));
				return r.json();
			}
		}).then(data => {
			// console.log("data ", data);
			return data;
		})
		
});


export const AsyncthunkResetPass = createAsyncThunk('AsyncthunkResetPass', async (data, thunkAPI) => {
	return fetch('https://codepost-backend.herokuapp.com/forget-password', {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(r => r.json())
	.then(resp => {
		return resp;
	}).catch(err => {
		console.log(err);
	})
});

export const AsyncthunkVerifyotp = createAsyncThunk('AsyncthunkVerifyotp', async (data, thunkAPI) => {
	return fetch('https://codepost-backend.herokuapp.com/verifyotp', {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
	})
	.then(r => r.json())
	.then(resp => {
		return resp;
	}).catch(err => {
		console.log(err);
	})
});



export const ChangePass = createAsyncThunk('ChangePass', async (data, thunkAPI) => {
	return fetch('https://codepost-backend.herokuapp.com/changepass', {
		method: 'PUT',
		body: JSON.stringify(data),
		headers: {
			'Content-Type': 'application/json'
		},
		credentials: "include",
	})
	.then(r => r.json())
	.then(resp => {
		return resp;
	}).catch(err => {
		console.log(err);
	})
});




export const userSlice = createSlice({
	name: 'user',
	initialState: {
		resetPassloader: false,
		loader: false,
		login: '',
		alreadyLogin: '',
		signup: '',
		message: '',
		profile: {
			username:'',
			email:'',
			name:'',
		},
	},
	reducers: {
		signup: (state, action) => {
			const { signup } = action.payload;
			state.signup = signup;
		},
		login: (state, action) => {
			const { login, message } = action.payload;
			state.login = login;
			state.message = message;
		},
		alreadyLogin: (state, action) => {
			const { alreadyLogin } = action.payload;
			state.alreadyLogin = alreadyLogin;
		},
		FullLoader: (state, action) => {
			state.loader = action.payload;
		},
		profile: (state, action) => {
			state.profile.username = ''; 
			state.profile.email = ''; 
			state.profile.name = '';
	}
	},
	extraReducers: {
		[Asyncthunklogin.fulfilled]: (state, action) => {
			if (action.payload !== undefined) {
				const { error, success } = action.payload;
				state.message = success || error;
			} else {
				state.message = 'Try after sometime';
			}
			state.loader = false;
		},
		[Asyncthunklogin.pending]: (state, action) => {
			state.loader = true;
			// console.log('rejected ', action);
		},
		[AsyncthunkSignUp.fulfilled]: (state, action) => {
			// console.log('fulfilled ', action);
			if (action.payload !== undefined) {
				const { error, success } = action.payload;
				state.message = error || success;
			} else {
				state.message = 'Try after sometime';
			}
		},
		[AsyncthunkSignUp.rejected]: (state, action) => {
			// console.log('rejected ', action);
		},

		[AsyncthunkProfile.fulfilled]: (state, action) => {
			// console.log('fulfilled ', action.payload.user);
			if(action.payload.user === undefined){
				const {error} = action.payload;
				state.message = error;
			}else{
				const {userName, email, name} = action.payload.user;
				state.profile.username = userName; 
				state.profile.email = email; 
				state.profile.name = name;
			}
			state.loader = false;
		},
		[AsyncthunkProfile.pending]: (state, action) => {
			// console.log('pending ', action);
			state.loader = true;
		},
		[AsyncthunkResetPass.fulfilled]: (state, action) => {
			
			state.resetPassloader = false;
		},
		[AsyncthunkResetPass.pending]: (state, action) => {
			// console.log('pending ', action);
			state.resetPassloader = true;
		},
		[AsyncthunkVerifyotp.fulfilled]: (state, action) => {
			
			state.resetPassloader = false;
		},
		[AsyncthunkVerifyotp.pending]: (state, action) => {
			// console.log('pending ', action);
			state.resetPassloader = true;
		},
		[ChangePass.fulfilled]: (state, action) => {
			
			state.resetPassloader = false;
		},
		[ChangePass.pending]: (state, action) => {
			// console.log('pending ', action);
			state.resetPassloader = true;
		},
	}
});



export const Logout = () => dispatch => {
	dispatch(setLoader(true));
	fetch('https://codepost-backend.herokuapp.com/logout', {credentials: 'include'})
	.then(r => {
		if(r.ok){
			dispatch(alreadyLogin({alreadyLogin: false}))
			dispatch(profile())
			dispatch(login({login: false, message: "Logout..."}))
			dispatch(setLoader(false));
		}
	})
};


export const { login, loader, signup, profile, alreadyLogin } = userSlice.actions;

export const loginStates = (state) => state.user;

export const userData = (state) => state.user.profile;

export const UserSliceLoader = (state) => state.user.loader;
export const rploader = (state) => state.user.resetPassloader;

export default userSlice.reducer;
