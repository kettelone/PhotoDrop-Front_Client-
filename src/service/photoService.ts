import React from 'react'
import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class PhotoService {
	public async getOriginalPhoto() {
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

export default new PhotoService()
