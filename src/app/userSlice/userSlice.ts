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
		updateSelfie: (state, { payload: { selfieUrl } }) => {
			return {
				...state,
				...{
					selfieUrl,
					selfieChanged: state.selfieChanged === false ? true : false
				}
			}
		}
	}
})

export const { update, updateSelfie } = userSlice.actions

export const selectSelfie = (state: RootState) => state.userUpdate

export default userSlice.reducer
