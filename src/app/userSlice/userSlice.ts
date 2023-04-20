import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {}

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		update: (state, {}) => {}
	}
})

export const { update } = userSlice.actions

export const selectUser = (state: RootState) => state.userUpdate

export default userSlice.reducer
