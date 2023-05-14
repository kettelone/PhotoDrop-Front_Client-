import React from 'react'
import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class PhotoService {
	public async getOriginalPhoto(id: string) {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.get('/info/getPhoto', {
				headers: {
					Authorization: `Bearer ${token}`
				},
				params: {
					photoID: id
				}
			})
			console.log(data)
			return data
		} catch (e) {
			return false
		}
	}
}

export default new PhotoService()
