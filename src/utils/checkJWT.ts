import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'
export const cookies = new Cookies()

const checkToken = () => {
	const token = cookies.get('jwt_auth')
	if (token) {
		const { exp }: { exp: number } = jwtDecode(token)
		const valid = exp * 1000 > Date.now()
		return valid
	}
	return false
}

export default checkToken
