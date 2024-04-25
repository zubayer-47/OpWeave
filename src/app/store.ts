import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../features/api/apiService';
import authReducer from '../features/auth/authSlice';
import userReducer from '../features/user/userSlice';

export const store = configureStore({
	reducer: {
		[apiService.reducerPath]: apiService.reducer,
		auth: authReducer,
		user: userReducer,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
