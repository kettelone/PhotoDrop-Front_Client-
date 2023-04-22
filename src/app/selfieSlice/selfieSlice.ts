import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {}

export const selfieSlice = createSlice({
	name: 'selfie',
	initialState,
	reducers: {
		update: (state, { payload: {} }) => {}
	}
})

export const { update } = selfieSlice.actions

export const selectSelfie = (state: RootState) => state.selfieUpdate

export default selfieSlice.reducer
