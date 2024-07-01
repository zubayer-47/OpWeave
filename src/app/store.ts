import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../features/api/apiService';
import authSlice from '../features/auth/authSlice';
import communitySlice from '../features/community/communitySlice';
import controllerSlice from '../features/controller/controllerSlice';
import modalSlice from '../features/modal/modalSlice';

export const store = configureStore({
	reducer: {
		[apiService.reducerPath]: apiService.reducer,
		// postApi: postApi.reducer,
		auth: authSlice,
		modal: modalSlice,
		controller: controllerSlice,
		community: communitySlice,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
