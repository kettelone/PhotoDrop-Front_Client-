import { createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const initialState = {
	country: 'US',
	dial_code: '+1'
}

export const countrySlice = createSlice({
	name: 'country',
	initialState,
	reducers: {
		update: (state, { payload: { code, dial } }) => {
			state.country = code
			state.dial_code = dial
		}
	}
})

export const { update } = countrySlice.actions

export const selectCountry = (state: RootState) => state.countryUpdate

export default countrySlice.reducer
