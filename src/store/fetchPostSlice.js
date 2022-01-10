import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
// https://codepost-backend.herokuapp.com/
export const fetchPost = createAsyncThunk('post/fetchPost', async (arg, thunkAPI) => {
    thunkAPI.dispatch(setLoader(true));
    thunkAPI.dispatch(handleData(''));
	const {postid, password, permission} = arg;
    return fetch(`https://codepost-backend.herokuapp.com/post/${postid}`, {
		method: "POST",
		body: JSON.stringify({password, permission}),
		headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
	})
	.then(r => r.json())
	.then(resp => {
        if(resp[0] !== undefined){
            thunkAPI.dispatch(handlePassword({isPassword:resp[0].isPassword,
                permission: true,
                expire: resp[0].Expiration
            }))
            thunkAPI.dispatch(setLoader(false));
            return resp;
        }else{
            thunkAPI.dispatch(handleData(resp));
            thunkAPI.dispatch(handlePassword({permission: false}));
            thunkAPI.dispatch(setLoader(false));
            return resp;
        }
	})
	.catch(err => {
        thunkAPI.dispatch(setLoader(false));
        console.log("err ", err);
	})
})

export const fetchPostSlice = createSlice({
    name: 'fetchPost',
    initialState: {
        showNotification: '',
        isPassword:'',
        postData: '',
        publicPost:[],
        userPost:[],
        loader: false,
    },
    reducers: {
        handlePassword: (state, action) => {
            const {isPassword, permission, expire} = action.payload;
            state.isPassword = isPassword;
            state.showNotification = permission;
            state.expire = expire;
        },
        handleData: (state, action) => {
            state.postData = action.payload;
        },
        resetHandlePassword: (state, action) => {
            state.isPassword = '';
            state.showNotification = '';
            state.expire = '';
        },
        savePublicPost: (state, action) => {
            state.publicPost = action.payload
        },
        saveUserPost: (state, action) => {
            state.userPost = action.payload
        },
        setLoader: (state, action) => {
            state.loader = action.payload;
        }
    }
})


export const publicPost=()=> dispatch => {
    dispatch(setLoader(true));
    fetch('https://codepost-backend.herokuapp.com/public_post')
    .then(r => r.json())
    .then(resp => {
        dispatch(savePublicPost(resp));
        dispatch(setLoader(false));
    }).catch((err) => {
        dispatch(setLoader(false));
        // console.log("PublicPost error ", err);
    })
}

export const userPost=()=> dispatch => {
    dispatch(setLoader(true));
    fetch('https://codepost-backend.herokuapp.com/user_post', {
        credentials: 'include'
    })
    .then(r => r.json())
    .then(resp => {
        dispatch(saveUserPost(resp));
        dispatch(setLoader(false));
    }).catch((err) => {
        dispatch(setLoader(false));
        // console.log("userPost error ", err);
    })
}

export const {handlePassword, handleData, resetHandlePassword, savePublicPost, saveUserPost, setLoader} = fetchPostSlice.actions;


export default fetchPostSlice.reducer;

export const postData = (state) => state.fetchPost;
export const loader = (state) => state.fetchPost.loader;
