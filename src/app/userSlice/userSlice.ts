import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
	selfieUrl: null,
	phone: null,
	email: null,
	name: null,
	selfieChanged: false
}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		update: (state, { payload: { selfieUrl, phone, email, name } }) => {
			return { ...state, ...{ selfieUrl, phone, email, name } }
		},
		change: (state) => {
			state.selfieChanged = state.selfieChanged === true ? false : true
		}
	}
})

export const { update, change } = userSlice.actions

export const selectSelfie = (state: RootState) => state.userUpdate

export default userSlice.reducer
