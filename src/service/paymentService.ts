import React from 'react'
import Cookies from 'universal-cookie'
import jwt_decode from 'jwt-decode'
import { $host } from '.'

export const cookies = new Cookies()

class Payment {
	public async requestPayment(albumID: string) {
		try {
			const token = cookies.get('jwt_auth')
			// const decoded: { phone: string } = jwt_decode(token)

			const response = await $host.post(
				'/stripe/payment',
				{
					successLink: `https://photo-drop-front-client.vercel.app/success`,
					failLink: `https://photo-drop-front-client.vercel.app`,
					albumID: albumID
				},
				{
					headers: {
						Authorization: `Bearer ${token}`
					}
				}
			)
			console.log({ response })
			return response.data
		} catch (e) {
			return false
		}
	}
}

export default new Payment()
