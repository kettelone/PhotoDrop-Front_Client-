import React from 'react'

import Cookies from 'universal-cookie'

import { $host } from '.'
const cookies = new Cookies()

class Selfie {
	public async signSelfie() {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.get('/user/addSelfie', {
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
