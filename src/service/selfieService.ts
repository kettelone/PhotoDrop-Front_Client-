import React from 'react'
import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const token = cookies.get('jwt_auth')

class Selfie {
	public async signSelfie() {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.get('/info/addSelfie', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			return data
		} catch (e) {
			return false
		}
	}
}

export default new Selfie()
