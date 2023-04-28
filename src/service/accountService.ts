import { $host } from '.'
import Cookies from 'universal-cookie'
const cookies = new Cookies()

class Account {
	public async editName(name: string) {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.post(
				'/user/changeName',
				{},
				{
					params: {
						name: name
					},
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			return data
		} catch (e) {
			return false
		}
	}

	public async editEmail(email: string) {
		try {
			const token = cookies.get('jwt_auth')
			const data = await $host.post(
				'/user/changeEmail',
				{},
				{
					params: {
						email: email
					},
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log(data)
			return data
		} catch (e) {
			return false
		}
	}
}

export default new Account()
