import React from 'react'
import { Navigate, useLocation } from 'react-router-dom'

import jwtDecode from 'jwt-decode'
import Cookies from 'universal-cookie'

export const cookies = new Cookies()

import { CODE_CONFIRMATION_ROUTE, LOGIN_ROUTE, MAIN_DASHBOARD_ROUTE, UPLOAD_SELFIE_ROUTE } from './consts'

const ProtectedRoute = ({ children }: any) => {
	const location = useLocation()
	let tokenValid = false
	console.log(!cookies.get('jwt_auth'))
	if (cookies.get('jwt_auth')) {
		const token = cookies.get('jwt_auth')
		try {
			const { exp }: { exp: number } = jwtDecode(token)
			tokenValid = exp * 1000 > Date.now()
			if (!tokenValid) {
				return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
			} else if (
				tokenValid &&
				location.pathname === LOGIN_ROUTE ||
				location.pathname === CODE_CONFIRMATION_ROUTE ||
				location.pathname === UPLOAD_SELFIE_ROUTE
			) {
				return <Navigate to={MAIN_DASHBOARD_ROUTE} state={{ from: location }} replace />
			} else {
				return children
			}
		} catch (e) {
			console.log(e)
		}
	} else if (!cookies.get('jwt_auth')){
		return <Navigate to={LOGIN_ROUTE} state={{ from: location }} replace />
	}
}


export default ProtectedRoute
