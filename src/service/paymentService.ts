import React from 'react'
import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'
import { $host } from '.'
import { ALBUMS_DASHBOARD_ROUTE, SUCCESS_ROUTE } from '../utils/consts'

export const cookies = new Cookies()

class Payment {
	public async requestPayment(albumID: string) {
		try {
			const token = cookies.get('jwt_auth')
			const decoded: { phone: string } = jwt_decode(token)
			console.log(decoded.phone)

			const response = await $host.post('/stripe/payment', {
				successLink: `https://www.google.com/`,
				failLink: `https://www.google.com/`,
				albumID: albumID,
				phoneNumber: decoded.phone
			})
			return response.data
		} catch (e) {
			return false
		}
	}
}

export default new Payment()
