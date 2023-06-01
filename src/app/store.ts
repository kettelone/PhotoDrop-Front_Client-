import { configureStore, combineReducers } from '@reduxjs/toolkit'
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from 'redux-persist'
import thunk from 'redux-thunk'

import countryReducer from './countrySlice/countrySlice'
import albumsReducer from './albumsSlice/albumsSlice'
import userReducer from './userSlice/userSlice'
import photosReducer from './photosSlice/photosSlice'
import originalPhotosReducer from './originalPhotosSlice/originalPhotosSlice'
import paidAlbumsReducer from './paidAlbumSlice/PaidAlbumSlice'

const persistConfig = {
	key: 'root',
	storage
}

const rootReducer = combineReducers({
	countryUpdate: countryReducer,
	albumsUpdate: albumsReducer,
	userUpdate: userReducer,
	photosUpdate: photosReducer,
	originalPhotosUpdate: originalPhotosReducer,
	paidAlbumsUpdate: paidAlbumsReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
	reducer: persistedReducer,
	middleware: [ thunk ]
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
