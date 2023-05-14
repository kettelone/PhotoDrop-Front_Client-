import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Album {
	public async getAlbums() {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.get('/info/albums', {
				headers: {
					Authorization: `Bearer ${token}`
				}
			})
			console.log(data)
			return data
		} catch (e) {
			return false
		}
	}
}

export default new Album()
