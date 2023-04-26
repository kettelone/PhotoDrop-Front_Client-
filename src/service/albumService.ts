import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()
const token = cookies.get('jwt_auth')

class Album {
	public async getAlbums() {
		try {
			const data = await $host.get('/info/albums', {
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

export default new Album()
