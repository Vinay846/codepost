import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { userSlice } from './userSlice';
import { savePostSlice } from './savePostSlice';
import { fetchPostSlice } from './fetchPostSlice';

const rootReducer = combineReducers({
    user: userSlice.reducer,
    post: savePostSlice.reducer,
    fetchPost: fetchPostSlice.reducer
});
export default configureStore({
	reducer: { rootReducer }
});
export const store = configureStore({ reducer: rootReducer });
