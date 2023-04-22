import { configureStore } from '@reduxjs/toolkit'
import countryReducer from './countrySlice/countrySlice'
import userReducer from './userSlice/userSlice'
import selfieReducer from './selfieSlice/selfieSlice'

export const store = configureStore({
	reducer: {
		countryUpdate: countryReducer,
		userUpdate: userReducer,
		selfieUpdate: selfieReducer
	}
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch
