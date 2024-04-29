import { configureStore } from '@reduxjs/toolkit';
import { apiService } from '../features/api/apiService';
import authReducer from '../features/auth/authSlice';
import controllerReducer from '../features/controller/controllerSlice';
import modalReducer from '../features/modal/modalSlice';

export const store = configureStore({
	reducer: {
		[apiService.reducerPath]: apiService.reducer,
		auth: authReducer,
		modal: modalReducer,
		controller: controllerReducer,
	},
	devTools: import.meta.env.DEV,
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(apiService.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
