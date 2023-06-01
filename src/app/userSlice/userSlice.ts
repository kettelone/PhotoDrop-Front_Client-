import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
	selfieUrl: null,
	phone: null,
	email: null,
	name: null,
	newPhone: 'initial'
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
