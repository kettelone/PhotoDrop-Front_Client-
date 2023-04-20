import React from 'react'
import Cookies from 'universal-cookie'
import { $host } from '.'
export const cookies = new Cookies()

class Login {
	public async requestOtp(login: string) {
		console.log({ login })
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
			await $host.post('/auth/login', {
				phoneNumber: login,
				otp: otp
			})
			return
		} catch (e) {
			return false
		}
	}
}

export default new Login()
