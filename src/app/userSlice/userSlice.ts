import { createSlice } from '@reduxjs/toolkit'

import { RootState } from '../store'

const initialState = {
	selfieUrl: null,
	localSelfie: null,
	phone: null,
	email: 'youremail@gmail.com',
	name: null,
	newPhone: ''
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		update: (state, { payload }) => {
			return { ...state, ...payload }
		}
	}
})

export const { update } = userSlice.actions

export const selectSelfie = (state: RootState) => state.userUpdate

export default userSlice.reducer
