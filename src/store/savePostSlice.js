import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


export const AsyncthunkSavePost = createAsyncThunk('post/AsyncthunkSavePost', async (_, thunkAPI) => {
	const postData  = thunkAPI.getState();
	const data = postData.post.createPost;
	return fetch('https://codepost-backend.herokuapp.com/new_post', {
		method:"POST",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(d => d.json())
	.then(r => {
		return r.path;
	})
	.catch(err => {
		// console.log(err);
	})
	
})

export const AsyncthunkUpdatePost = createAsyncThunk('post/AsyncthunkUpdatePost', async (path, thunkAPI) => {
	const postData  = thunkAPI.getState();
	const data = postData.post.editPost;
	// console.log("editPost ", data);
	return fetch(`https://codepost-backend.herokuapp.com/post/${path}`, {
		method:"PUT",
		body: JSON.stringify(data),
		headers: {
			"Content-Type": "application/json"
		},
		credentials: 'include'
	})
	.then(d => d.json())
	.then(r => {
		return r.path;
	})
	.catch(err => {
		// console.log(err);
	})
	
})

export const olderPostData = createAsyncThunk ('post/olderPostData', async (path, thunkAPI) => {
	return fetch(`https://codepost-backend.herokuapp.com/editpost/${path}`, {
		method: "GET",
		headers: {
            "Content-Type": "application/json"
        },
        credentials: "include"
	})
	.then(r => r.json())
	.then(resp => {
		thunkAPI.dispatch(saveolderData(resp[0]));
	})
	.catch(err => {
        console.log("err ", err);
	})
		
})

export const savePostSlice = createSlice({
	name: 'Post',
	initialState: {
		createPost: {
			code: '',
			Syntax_Highlighting: 'None',
			Expiration: 'Never',
			Post_Security: 'public',
			password: '',
			title: '',
		},
		editPost: {
			code: '',
			Syntax_Highlighting: '',
			Expiration: '',
			Post_Security: '',
			password: '',
			title: '',
			isPassword: false,
		},
		loader: false,
	},
	reducers: {
		handlecode: (state, action) => {
			const { code } = action.payload;
			state.createPost.code = code;
		},
		handleSyntax_Highlighting: (state, action) => {
			const { Syntax_Highlighting } = action.payload;
			state.createPost.Syntax_Highlighting = Syntax_Highlighting;
		},
		handleExpiration: (state, action) => {
			const { Expiration } = action.payload;
			state.createPost.Expiration = Expiration;
		},
		handlePost_Security: (state, action) => {
			const { Post_Security } = action.payload;
			state.createPost.Post_Security = Post_Security;
		},
		handlePassword: (state, action) => {
			const { Password } = action.payload;
			state.createPost.password = Password;
		},
		handletitle: (state, action) => {
			const { title } = action.payload;
			state.createPost.title = title;
		},
		resetAll: (state, action) => {
			state.createPost.code= '';
			state.createPost.Syntax_Highlighting= 'None';
			state.createPost.Expiration= 'Never';
			state.createPost.Post_Security= 'public';
			state.createPost.password= '';
			state.createPost.title= '';
		},
		edithandlecode: (state, action) => {
			const { code } = action.payload;
			state.editPost.code = code;
		},
		edithandleSyntax_Highlighting: (state, action) => {
			const { Syntax_Highlighting } = action.payload;
			state.editPost.Syntax_Highlighting = Syntax_Highlighting;
		},
		edithandleExpiration: (state, action) => {
			const { Expiration } = action.payload;
			state.editPost.Expiration = Expiration;
		},
		edithandlePost_Security: (state, action) => {
			const { Post_Security } = action.payload;
			state.editPost.Post_Security = Post_Security;
		},
		edithandlePassword: (state, action) => {
			const { Password } = action.payload;
			state.editPost.password = Password;
		},
		edithandletitle: (state, action) => {
			const { title } = action.payload;
			state.editPost.title = title;
		},
		editresetAll: (state, action) => {
			state.editPost.code= '';
			state.editPost.Syntax_Highlighting= 'None';
			state.editPost.Expiration= 'Never';
			state.editPost.Post_Security= 'public';
			state.editPost.password= '';
			state.editPost.title= '';
		},
		saveolderData: (state, action) => {
			state.editPost = action.payload;
		}
	},
	extraReducers: {
		[AsyncthunkSavePost.fulfilled]: (state, action) => {
			// console.log('rejected ', action);
			state.loader = false;
		},
		[AsyncthunkSavePost.pending]: (state, action) => {
			// console.log('rejected ', action);
			state.loader = true;
		},
		[AsyncthunkUpdatePost.fulfilled]: (state, action) => {
			// console.log('rejected ', action);
			state.loader = false;
		},
		[AsyncthunkUpdatePost.pending]: (state, action) => {
			// console.log('rejected ', action);
			state.loader = true;
		},
		[olderPostData.fulfilled]: (state, action) => {
			// console.log('rejected ', action);
			// const {code, Syntax_Highlighting, Expiration, Post_Security, password, title} = action.payload;
			state.loader = false;
		},
		[olderPostData.pending]: (state, action) => {
			// console.log('rejected ', action);
			state.loader = true;
		},

	}
});



export const DeletePost=(postid)=> getState => {
	getState.loader = true;
    fetch(`https://codepost-backend.herokuapp.com/post/${postid}`, {
		method: "DELETE",
		credentials: "include"
	})			
    .then(r => {
		if(r.ok){
			// console.log("Deleted", r);
			getState.loader = false;
		}else{
			console.log("Failed to delete ");
			getState.loader = false;
		}
	}).catch((err) => {
		console.log("Failed to delete ", err);
		getState.loader = false;
	})
}



export const {
	handlecode,
	handleSyntax_Highlighting,
	handleExpiration,
	handlePost_Security,
	handlePassword,
	handletitle,
	saveFetchedPost,
	resetAll,
	edithandlecode,
	edithandleSyntax_Highlighting,
	edithandleExpiration,
	edithandlePost_Security,
	edithandlePassword,
	edithandletitle,
	editsaveFetchedPost,
	editresetAll,
	saveolderData,
} = savePostSlice.actions;


export default savePostSlice.reducer;


export const CUDloader = (state) => state.post.loader;
export const editData = (state) => state.post.editPost;
export const createPost = (state) => state.post.createPost;


