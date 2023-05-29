import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './countrySlice/countrySlice'
import albumsReducer from './albumsSlice/albumsSlice'
import userReducer from './userSlice/userSlice'
import photosReducer from './photosSlice/photosSlice'
import originalPhotosReducer from './originalPhotosSlice/originalPhotosSlice'

export const store = configureStore({
	reducer: {
		countryUpdate: countryReducer,
		albumsUpdate: albumsReducer,
		userUpdate: userReducer,
		photosUpdate: photosReducer,
		originalPhotosUpdate: originalPhotosReducer
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
