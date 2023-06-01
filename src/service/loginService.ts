import React from 'react'
import Cookies from 'universal-cookie'
import { $host } from '.'
export const cookies = new Cookies()

class Login {
	public async requestOtp(login: string) {
		try {
			await $host.post('/auth/login', {
				phoneNumber: login
			})
			return
		} catch (e) {
			return false
		}
	}

	public async login(login: string, otp: string) {
		try {
			const response = await $host.post('/auth/login/verify', {
				phoneNumber: login,
				otp: otp
			})

			const { accessToken } = response.data

			// Set cookie
			cookies.set('jwt_auth', accessToken)
			return true
		} catch (e) {
			return false
		}
	}
}

export default new Login()
